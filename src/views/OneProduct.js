import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { ProductCard, ProfileCard } from "../components/Card";
import { OrderModal } from "../components/Modal";
import { ProductApi } from "../api-services/product.api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";


export default function OneProduct() 
{
 
  const product = ProductApi();
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const res = await product.findOne(id);
      console.log(res.data)
      return res.data.data || [];
    } catch (err) {
      console.log("Erreur lors de la récupération des produits : " + err.message);
      return [];
    }
  };
  const { isLoading, data, error } = useQuery({  queryKey: ["product"], queryFn: fetchData });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [curItem, setCurItem] = useState();

  const orderHandler = (item) => {
    setCurItem(item)
    setIsModalVisible(true)
  } 
  

  return (
    <div className="bg-light min-vh-100">
      {
        isModalVisible && (  <OrderModal data={curItem} method={ ()=> setIsModalVisible(false) }  /> )
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
              </div>

              {/* Main content: on lg it’s left, on md it goes after */}
              <div className="col-lg-7 rounded-3 order-md-2 order-lg-1"> 
              {
                isLoading ? (
                  <div className="col-md-12 d-flex justify-content-center mt-3"> <div className="spinner-border text-success fs-1" role="status" aria-label="Chargement"></div> </div>
                ) : ( data && ( <ProductCard orderHandler={orderHandler} data={data} /> ))
                }
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
