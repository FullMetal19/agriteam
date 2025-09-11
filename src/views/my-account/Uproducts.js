import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Template from "../../components/Template";
import { UproductCard } from "../../components/PanelCard";
import { UproductForm } from "../../components/PanelForm";
import { UproductDeleteModal, UproductUpdateModal } from "../../components/PanelModal";
import { useQuery } from "@tanstack/react-query";
import { ProductApi } from "../../api-services/product.api";
import { LikerListModal } from "../../components/Modal";

export default function Uproduct() 
{
 
  const [showForm, setShowForm] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // ***********************************************************

  const product = ProductApi();
  
  const fetchData = async () => {
    try {
        const res = await product.findAllOfUser();
        return res.data.data || []; 
    } catch (err) { 
        console.log('Erreur lors de la récupération des utilisateurs : ' + err.message);
    }
  }
  const { isLoading, data, error, refetch } = useQuery({  queryKey: ["products"], queryFn: fetchData });


  const [curItem, setCurItem] = useState({});

  const setUpdate = (data)=> {
    setCurItem(data)
    setShowUpdateModal(true)
  }
  const setRemove = (data)=> {
    setCurItem(data)
    setShowDeleteModal(true)
  }


  const [isLikerModalVisible, setIsLikerModalVisible] = useState(false);
  
  const likerListHandler = (item) => {
    setCurItem(item)
    setIsLikerModalVisible(true)
  } 
  


  return (
    <Template page={2} >
        {/* ************************************* */}
        <div className="col-lg-12 mb-4">
          {
            showUpdateModal &&  <UproductUpdateModal close={ ()=> setShowUpdateModal(false) } data={curItem} refetch={refetch} />
          }
          {
            showDeleteModal &&  <UproductDeleteModal close={ ()=> setShowDeleteModal(false) } data={curItem} refetch={refetch} />
          }
          {
            isLikerModalVisible && (  <LikerListModal meta={curItem} close={ ()=> setIsLikerModalVisible(false) }  /> )
          }
          <div className="border bg-white text-secondary rounded-3">
            <div className="d-flex justify-content-between align-items-center border-bottom p-3">
              <span className="text-secondary"> Nombre de produit posté </span>
              <div className="d-flex align-items-center">
                <i className="bi bi bi-box-seam-fill text-success me-2"></i>
                <small className="text-secondary fw-bold">{ data?.length }</small>
              </div>
            </div>  
            <div className="d-flex align-items-center border-bottom p-3">
              <span className="text-secondary"> Vos produits seront disponibles sur le marché virtuel. Ils peuvent être des récoltes, des intrants, des produits phytosanitaires, des équipements agricoles, des services ou encore de l’expertise agricole. </span>
            </div>  
            <div className="d-flex justify-content-end p-3">
              <button className="bg-green-light text-secondary d-flex justify-content-center align-items-center border py-2 px-4" onClick={ ()=> setShowForm(true) } > 
                <i className="bi bi-plus-circle me-2"></i> Ajouter une nouvelle 
              </button> 
            </div> 
          </div>
        </div>
        {/* ************************************* */}
        { showForm && <UproductForm close={ ()=> setShowForm(false) } refetch={refetch}  /> }
        {/* ************************************** */}
        <div className="col-lg-12">
          { 
              isLoading ? (  <div className="col-md-12 d-flex justify-content-center mt-3"> <div className="spinner-border text-success fs-1" role="status" aria-label="Chargement"></div> </div>  ) : (
              data?.map(( item , index ) => { return (
                  <UproductCard update={ ()=> setUpdate(item) } remove={ ()=> setRemove(item) } data={item} likerListHandler={likerListHandler}  key={index} refetch={refetch} />    
                  )
              }))      
          }  
          {
              error ? ( <div className="col-md-12 mt-3"> <div className="border alert alert-danger text-muted px-4 py-3" > Une erreur est survenue lors du traitement. Veuillez verifier votre connexion </div> </div> ) : null
          }
          {
              ( Array.isArray(data) && data.length === 0 ) ? ( <div className="d-flex px-4 mt-3 w-100 py-3 border bg-white text-muted"> Aucune propriété n'a été enregistrée. </div> ) : null
          }  
        </div>

    </Template>
  );
}



