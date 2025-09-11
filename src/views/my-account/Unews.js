import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Template from "../../components/Template";
import { UnewsCard } from "../../components/PanelCard";
import { UnewsForm } from "../../components/PanelForm";
import { UnewsDeleteModal, UnewsUpdateModal } from "../../components/PanelModal";
import { NewsApi } from "../../api-services/news.api";
import { useQuery } from "@tanstack/react-query";
import { NewsLikerListModal } from "../../components/Modal";


export default function Unews() 
{
 
  const [showForm, setShowForm] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  const news = NewsApi();
  
  const fetchData = async () => {
    try {
        const res = await news.findAllOfUser();
        return res.data.data || []; 
    } catch (err) { 
        console.log('Erreur lors de la récupération des utilisateurs : ' + err.message);
    }
  }
  const { isLoading, data, error, refetch } = useQuery({  queryKey: ["newss"], queryFn: fetchData });


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
    <Template page={4} >
        {/* ************************************* */}
        <div className="col-lg-12 mb-4">
          {
            showUpdateModal &&  <UnewsUpdateModal close={ ()=> setShowUpdateModal(false) }  data={curItem} refetch={refetch} />
          }
          {
            showDeleteModal &&  <UnewsDeleteModal close={ ()=> setShowDeleteModal(false) }  data={curItem} refetch={refetch} />
          }
          {
            isLikerModalVisible && (  <NewsLikerListModal meta={curItem} close={ ()=> setIsLikerModalVisible(false) }  /> )
          }
          <div className="border bg-white text-secondary rounded-3">
            <div className="d-flex justify-content-between align-items-center border-bottom p-3">
              <span className="text-secondary"> Nombre de nouvelle postée </span>
              <div className="d-flex align-items-center">
                <i className="bi bi-megaphone-fill text-success me-2"></i>
                <small className="text-secondary">{ data?.length }</small>
              </div>
            </div>  
            <div className="d-flex align-items-center border-bottom p-3">
              <span className="text-secondary"> Restez informé grâce aux nouvelles ! Retrouvez des alertes, des opportunités de marché, des communiqués et bien d’autres informations essentielles pour les acteurs du secteur agricole. </span>
            </div>  
            <div className="d-flex justify-content-end p-3">
              <button className="bg-green-light text-secondary d-flex justify-content-center align-items-center border py-2 px-4" onClick={ ()=> setShowForm(true) } > 
                <i className="bi bi-plus-circle me-2"></i> Ajouter une nouvelle 
              </button> 
            </div> 
          </div>
        </div>
        {/* ************************************* */}
        { showForm && <UnewsForm close={ ()=> setShowForm(false) } refetch={refetch} /> }
        {/* ************************************** */}
        <div className="col-lg-12">
          { 
              isLoading ? (  <div className="col-md-12 d-flex justify-content-center mt-3"> <div className="spinner-border text-success fs-1" role="status" aria-label="Chargement"></div> </div>  ) : (
              data?.map(( item , index ) => { return (  
                  <UnewsCard update={ ()=> setUpdate(item) } remove={ ()=> setRemove(item) } data={item} likerListHandler={likerListHandler}  key={index} refetch={refetch} />    
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
