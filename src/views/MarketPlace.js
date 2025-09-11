import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ProductCard, ProfileCard } from "../components/Card";
import { LikerListModal, OrderModal } from "../components/Modal";
import { ProductApi } from "../api-services/product.api";
import { useQuery } from "@tanstack/react-query";


export default function MarketPlace() 
{
 
  const product = ProductApi();
  const [filteredData, setFilteredData] = useState([]);
  
  const categories = [
    { id: "equipement", label: "Equipements agricole" },
    { id: "produit", label: "Produits agricole" },
    { id: "intrant", label: "Intrants agricole" },
    { id: "expertise", label: "Expertise agricole" },
    { id: "autres", label: "Autres" },
  ];

  const [selectedCategories, setSelectedCategories] = useState( categories.map((c) => c.id) );

  const fetchData = async () => {
    try {
      const res = await product.findAll();
      // console.log(res.data);
      return res.data.data || [];
    } catch (err) {
      console.log("Erreur lors de la récupération des produits : " + err.message);
      return [];
    }
  };
  const { isLoading, data, error, refetch } = useQuery({  queryKey: ["products"], queryFn: fetchData });

  // filtre des données
  useEffect(() => {
    if (!data) return;

    if (selectedCategories.length === 0) {
      setFilteredData([]);
    } else {
      const filtered = data.filter((item) =>
        selectedCategories.includes(item.category.toLowerCase())
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


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [curItem, setCurItem] = useState();

  const orderHandler = (item) => {
    setCurItem(item)
    setIsModalVisible(true)
  } 

  const [isLikerModalVisible, setIsLikerModalVisible] = useState(false);

  const likerListHandler = (item) => {
    setCurItem(item)
    setIsLikerModalVisible(true)
  } 

    
  

  return (
    <div className="bg-light min-vh-100">
      {
        isModalVisible && (  <OrderModal data={curItem} method={ ()=> setIsModalVisible(false) }  /> )
      }
      {
        isLikerModalVisible && (  <LikerListModal meta={curItem} close={ ()=> setIsLikerModalVisible(false) }  /> )
      }
      {/* Header's section */}
      <Header page={2} />

      {/* Service's section */}
      <div className="container py-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-11">
            <div className="row d-flex justify-content-between flex-lg-row">

              {/* Sidebar: on lg it’s right, but on md it goes first */}
              <div className="col-lg-4 order-md-1 order-lg-2"> 
                <div className="row">
                  <div className="col-lg-12">
                    <ProfileCard color={"bg-green-light border-bottom rounded-top-3"}  />
                  </div>
                </div>
                <div className="row mb-4 sticky-top pt-5">
                  <div className="col-lg-12">
                    <div className="border bg-green-light text-secondary rounded-3 p-3 mb-3">  
                      Filtrer les produits du marché virtuel
                    </div>
                    <div className="card border rounded-3">
                      {/* Header background */}
                      <div className="d-flex justify-content-between align-items-center p-3 pt-4 border-bottom bg-green-light">
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-funnel text-muted"></i>
                          <span className="text-secondary"> Filtrer </span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <input type="checkbox" name="checker" className="border text-muted checkbox" required id="id0" onChange={handleSelectAll} checked={allSelected} />
                          <label className="text-muted" htmlFor="id0"> Tous </label> 
                        </div>
                      </div>
                      {/* ******************************** */}
                      {/* Liste des catégories */}
                      {categories.map((cat, index) => (
                        <div
                          key={cat.id} className="d-flex align-items-center p-3 border-bottom">
                          <div className="d-flex align-items-center gap-2">
                            <input
                              type="checkbox"
                              className="border text-muted checkbox"
                              id={`id${index + 1}`}
                              onChange={() => handleCheckboxChange(cat.id)}
                              checked={selectedCategories.includes(cat.id)}
                            />
                            <label className="text-muted" htmlFor={`id${index + 1}`}>
                              {cat.label}
                            </label>
                          </div>
                        </div>
                      ))}
                      {/* ******************************************* */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Main content: on lg it’s left, on md it goes after */}
              <div className="col-lg-7 rounded-3 order-md-2 order-lg-1"> 
               {isLoading ? (
                  <div className="col-md-12 d-flex justify-content-center mt-3"> <div className="spinner-border text-success fs-1" role="status" aria-label="Chargement"></div> </div>
                ) : (
                  filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <ProductCard orderHandler={orderHandler} likerListHandler={likerListHandler} data={item} key={index} refetch={refetch} />
                    ))
                  ) : (
                    <div className="d-flex px-4 mt-3 w-100 py-3 border shadow-sm bg-white text-muted">
                      Aucun produit ne correspond à votre filtre.
                    </div>
                  )
                )}
                {error && (
                  <div className="col-md-12 mt-3">
                    <div className="border alert alert-danger text-muted px-4 py-3"> Une erreur est survenue lors du traitement. Veuillez vérifier votre connexion </div>
                  </div>
                )}
              </div>
            </div>

        </div>
        </div>
      </div>

      {/* Footer's section */}
      <Footer />
      
  </div>
  );
}
