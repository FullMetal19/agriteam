import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { NewsCard, ProfileCard } from "../components/Card";
import { NewsApi } from "../api-services/news.api";
import { useQuery } from "@tanstack/react-query";
import { NewsLikerListModal } from "../components/Modal";


export default function News() 
{
  
  const news = NewsApi();
  const fetchData = async () => {
    try {
      const res = await news.findAll();
      // console.log(res.data);
      return res.data.data || [];
    } catch (err) {
      console.log("Erreur lors de la récupération des produits : " + err.message);
      return [];
    }
  };
  const { isLoading, data, error, refetch } = useQuery({  queryKey: ["allNews"], queryFn: fetchData });


  const [curItem, setCurItem] = useState();
  const [isLikerModalVisible, setIsLikerModalVisible] = useState(false);
  
  const likerListHandler = (item) => {
    setCurItem(item)
    setIsLikerModalVisible(true)
  } 
  

  return (
    <div className="bg-light min-vh-100">
      {
        isLikerModalVisible && (  <NewsLikerListModal meta={curItem} close={ ()=> setIsLikerModalVisible(false) }  /> )
      }
      {/* Header's section */}
      <Header page={1} />

      {/* Service's section */}
      <div className="container py-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-11">
            <div className="row d-flex justify-content-between flex-lg-row">

              {/* Sidebar: on lg it’s right, but on md it goes first */}
              <div className="col-lg-4 order-md-1 order-lg-2"> 
                <div className="row sticky-top">
                  <div className="col-lg-12 mb-5">
                    <ProfileCard color={"bg-green-light border-bottom rounded-top-3"} />
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
                      <NewsCard likerListHandler={likerListHandler} data={item} key={index} refetch={refetch} />
                    ))
                  ) : (
                    <div className="d-flex px-4 mt-3 w-100 py-3 border shadow-sm bg-white text-muted">
                      La liste de nouvelles est vide.
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
