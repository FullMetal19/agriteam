import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { OrderTemplate } from "./OrderTemplate";
import { CurrentUserOrderCard } from "../../components/Card";
import { PaymentModal } from "./PaymentModal";
import { ProductOrderApi } from "../../api-services/productOrder.api";
import { useQuery } from "@tanstack/react-query";
import { CanceledOrderModal } from "./CanceledOrderModal";


export default function MyOrder() 
{

  const [ isVisible, setIsVisible ] = useState();

  const productOrder = ProductOrderApi();
  const [filteredData, setFilteredData] = useState([]);
  
  const categories = [
    { id: "paid", label: "Commandes payées" },
    { id: "pending", label: "Commandes non payées" },
  ];

  const [selectedCategories, setSelectedCategories] = useState( categories.map((c) => c.id) );

  const fetchData = async () => {
    try {
      const res = await productOrder.findAllOfUser();
      // console.log(res.data)
      return res.data.data || [];
    } catch (err) {
      console.log("Erreur lors de la récupération des commandes : " + err.message);
      return [];
    }
  };
  const { isLoading, data, error, refetch } = useQuery({  queryKey: ["orders"], queryFn: fetchData });

  // filtre des données
  useEffect(() => {
    if (!data) return;

    if (selectedCategories.length === 0) {
      setFilteredData([]);
    } else {
      const filtered = data.filter((item) =>
        selectedCategories.includes(item.status.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [data, selectedCategories]);

  // gérer le changement d'une catégorie
  const handleCheckboxChange = (id) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  // gérer le "Tous"
  const allSelected = selectedCategories.length === categories.length;
  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(categories.map((c) => c.id));
    }
  };  


  const [curItem, setCurItem] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const orderHandler = (item) => {
    setCurItem(item);
    setIsVisible(true);
  }

  const setRemove = (data)=> {
    setCurItem(data)
    setShowDeleteModal(true)
  }

  return (

    <OrderTemplate page={1} >

      {
        isVisible && ( <PaymentModal close={ ()=> setIsVisible(false) } data={ curItem } refetch={refetch} /> )
      }
      {
        showDeleteModal &&  <CanceledOrderModal close={ ()=> setShowDeleteModal(false) } data={curItem} refetch={refetch} />
      }

      <div className="col-lg-12 mb-4">
        <div className="card border rounded-3 px-3">
          {/* Header background */}
          <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-funnel text-muted"></i>
              <span className="text-secondary"> Filtrer les commandes </span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <input type="checkbox" name="checker" className="border text-muted checkbox" required id="id0" onChange={handleSelectAll} checked={allSelected} />
              <label className="text-secondary" htmlFor="id0"> Tous </label> 
            </div>
          </div>
          {/* ******************************** */}
          <div className="row">
          {
            categories.map((cat, index) => (
              <div key={cat.id} className="col-md-6 d-flex align-items-center p-3 border-end">
                <div className="d-flex align-items-center gap-2">
                  <input type="checkbox" className="border text-muted checkbox" id={`id${index + 1}`}
                    onChange={() => handleCheckboxChange(cat.id)}
                    checked={selectedCategories.includes(cat.id)}
                  />
                  <label className="text-secondary" htmlFor={`id${index + 1}`}>
                    {cat.label}
                  </label>
                </div>
              </div>
            ))
          }
          </div>
        </div>
      </div>

      <div className="col-lg-12">
      {
        isLoading ? (
          <div className="col-md-12 d-flex justify-content-center mt-3"> <div className="spinner-border text-success fs-1" role="status" aria-label="Chargement"></div> </div>
        ) : (
          filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <CurrentUserOrderCard onClick={ ()=> orderHandler(item) }  cancel={ ()=> setRemove(item) }  data={item} key={index} />
            ))
          ) : (
            <div className="d-flex px-4 mt-3 w-100 py-3 border shadow-sm bg-white text-muted">
              Aucune commande ne corresponde à votre filtre.
            </div>
          )
        )}
        { error && (
          <div className="col-md-12 mt-3">
            <div className="border alert alert-danger text-muted px-4 py-3"> Une erreur est survenue lors du traitement. Veuillez vérifier votre connexion </div>
          </div>
        )}
      </div>

    </OrderTemplate>
  );
}
