import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import { WithdrawApi } from "../api-services/withdraw.api";


export default function WithdrawHistoric({page}) 
{
    const withdraw = WithdrawApi();

    const fetchData = async () => {
    try {
      const res = await withdraw.findAll();
      // console.log(res.data)
      return res.data.data || [];
    } catch (err) {
      console.log("Erreur : " + err.message);
      return [];
    }
  };
  const { isLoading, data, error } = useQuery({  queryKey: ["balance"], queryFn: fetchData });
 
  return (
    <div className="bg-light min-vh-100">
      {/* Header's section */}
      <Header page={4} />

      {/* Service's section */}
      <div className="container pb-5 pt-4 px-4">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-10">

            <div className="row sticky-top pt-4">
              <div className="col-lg-12 border bg-green-light text-secondary rounded-top-3 mb-2">
                <div className="d-flex align-items-center border-bottom px-4 py-3 text-secondary">
                  <i className="bi bi-clock-history me-2"></i> Historique des retraits  
                </div>  
                <div className="row py-2">
                  <div className="col-md-3 px-3 py-2 text-secondary fw-bold border-end"> Date </div>
                  <div className="col-md-3 px-3 py-2 text-secondary fw-bold border-end"> Nom </div>
                  <div className="col-md-2 px-3 py-2 text-secondary fw-bold border-end"> Phone </div>
                  <div className="col-md-2 px-3 py-2 text-secondary fw-bold border-end"> operator </div>
                  <div className="col-md-2 px-3 py-2 text-secondary fw-bold"> Montant (Fcfa) </div>
                </div> 
              </div>
            </div>

            {
            isLoading ? (
              <div className="col-md-12 d-flex justify-content-center mt-3"> <div className="spinner-border text-success fs-1" role="status" aria-label="Chargement"></div> </div>
            ) : (
                data?.length > 0 ? (
                data?.map((item, index) => (
                  <div className="row bg-white border mb-2 py-2" key={index}>
                    <div className="col-md-3 px-3 py-2  text-secondary border-end"> { item?.createdAt } </div>
                    <div className="col-md-3 px-3 py-2  text-secondary border-end"> { item?.fname + ' ' + item?.lname } </div>
                    <div className="col-md-2 px-3 py-2  text-secondary border-end"> { item?.phone } </div>
                    <div className="col-md-2 px-3 py-2  text-secondary border-end"> { item?.operator } </div>
                    <div className="col-md-2 px-3 py-2 "> { item?.amount } </div>
                  </div>      
                ))
              ) : (
                <div className="row p-4 mt-3 border shadow-sm bg-white text-muted">
                  L'historique de retrait est vide
                </div>
              )
            )}
            { error && (
              <div className="row mt-3">
                <div className="border alert alert-danger text-muted p-4"> Une erreur est survenue lors du traitement. Veuillez vérifier votre connexion </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Footer's section */}
      <Footer />
      
  </div>
  );
}
