import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { DiscussionCard,  ProfileCard } from "../components/Card";
import { useQuery } from "@tanstack/react-query";
import { SessionApi } from "../api-services/session.api";
import { SessionLikerListModal } from "../components/Modal";


export default function Discussions() 
{

  const session = SessionApi();
  const fetchData = async () => {
    try {
      const res = await session.findAll();
      // console.log(res.data);
      return res.data.data || [];
    } catch (err) {
      console.log("Erreur lors de la récupération des produits : " + err.message);
      return [];
    }
  };
  const { isLoading, data, error, refetch } = useQuery({  queryKey: ["allSessions"], queryFn: fetchData });
  
  const [curItem, setCurItem] = useState();
  const [isLikerModalVisible, setIsLikerModalVisible] = useState(false);
    
  const likerListHandler = (item) => {
    setCurItem(item)
    setIsLikerModalVisible(true)
  } 
 
  return (
    <div className="bg-light min-vh-100">
      {/* Header's section */}
      <Header page={3} />
      {
        isLikerModalVisible && (  <SessionLikerListModal meta={curItem} close={ ()=> setIsLikerModalVisible(false) }  /> )
      }
      {/* Service's section */}
      <div className="container py-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-11">
            <div className="row d-flex justify-content-between flex-lg-row">

              {/* Sidebar: on lg it’s right, but on md it goes first */}
              <div className="col-lg-4 order-md-1 order-lg-2"> 
                <div className="row sticky-top">
                  <div className="col-lg-12 mb-4">
                    <ProfileCard color={"bg-white border-bottom rounded-top-3"} />
                  </div>
                  <div className="col-lg-12 mb-4">
                    <div className="border bg-white text-secondary rounded-3">
                      <div className="d-flex align-items-center border-bottom px-3 py-2">
                        <i className="bi bi-clock-history text-secondary me-2"></i> Historique
                      </div>  
                      <div className="d-flex align-items-center border-bottom px-3 py-3">
                        <span className="text-secondary"> Consulter les sessions auxquelles vous avez pris part ou que avez aimé. </span>
                      </div>  
                      <div className="d-flex align-items-center p-3">
                        <a href="/historique-session" className="btn-sm btn btn-outline-secondary d-flex justify-content-center align-items-center px-3"> 
                          <i className="bi bi-eye me-2"></i> consulter 
                        </a> 
                      </div> 
                    </div>
                  </div>
                </div>
              
              </div>

              {/* Main content: on lg it’s left, on md it goes after */}
              <div className="col-lg-7 rounded-3 order-md-2 order-lg-1"> 
                { isLoading ? (
                    <div className="col-md-12 d-flex justify-content-center mt-3"> <div className="spinner-border text-success fs-1" role="status" aria-label="Chargement"></div> </div>
                  ) : (
                    data.length > 0 ? (
                      data.map((item, index) => (
                        <DiscussionCard likerListHandler={likerListHandler} data={item} key={index} refetch={refetch} />
                      ))
                    ) : (
                      <div className="d-flex px-4 mt-3 w-100 py-3 border shadow-sm bg-white text-muted">
                        La liste de nouvelles est vide.
                      </div>
                    )
                  )}
                { error && (
                    <div className="col-md-12 mt-3">
                      <div className="border alert alert-danger text-muted px-4 py-3"> Une erreur est survenue lors du traitement. Veuillez vérifier votre connexion </div>
                    </div>
                  )
                }
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
