import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { UserApi } from "../api-services/user.api";
import { useQuery } from "@tanstack/react-query";
import { TextReducer } from "./Card";


export function LeftSidebar() 
{
  const user = UserApi();

  const fetchData = async () => {
    try {
      const res = await user.findOne();
      return res.data.data || [];
    } catch (err) {
      console.log("Erreur : " + err.message);
      return [];
    }
  };
  const { data, refetch } = useQuery({  queryKey: ["user"], queryFn: fetchData });



 
  const [inputs, setInputs] = useState();
  const [status, setStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));     
  };
  
  const handleForm = async (event) => {
    
    event.preventDefault();
    setStatus(0);
    setIsLoading(true);

    try {
      const res = await user.updateOne(inputs);
      setIsLoading(false);
      setStatus( res.data.success ? 1 : -1 );
      refetch();

    } catch (err) {
        setStatus(-1);
        setIsLoading(false);
    }
  }; 
  

  return (

    <div className="col-lg-4"> 
      <div className="row sticky-top">
        {/* ************************************* */}
        <div className="col-lg-12">
          <div className="border bg-white text-secondary rounded-top-3">
            <div className="d-flex align-items-center p-3">
              <div className="me-2">
                <div className="border bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold small" style={{ width:40, height:40}}>
                  { data?.fname ? data.fname.charAt(0).toUpperCase() : ""}{data?.lname ? data.lname.charAt(0).toUpperCase() : ""}
                </div>
              </div>
              <div>
                <div className="fw-bold text-secondary small" title={ data?.fname + ' ' + data?.lname }> <TextReducer text={data?.fname + ' ' + data?.lname} maxsize={24} /> </div>
                <div className="text-secondary small" title={ data?.occupation }> <TextReducer text={ data?.occupation} maxsize={24} /> </div>
              </div>
            </div>
          </div>
        </div>
        {/* ************************************* */}
        <div className="col-lg-12 mb-4">
          <div className="border bg-white text-secondary rounded-bottom-3">
            <div className="d-flex align-items-center border-bottom p-3 bg-green-light text-secondary">
              <i className="bi bi-info-circle me-2"></i> Plus d'information
            </div>
            <div className="d-flex align-items-center border-bottom px-3 py-2">
              <span className="text-secondary small me-2"> Sexe : </span>
              <span className="text-muted"> { data?.sex } </span>
            </div>  
             <div className="d-flex align-items-center border-bottom px-3 py-2">
              <span className="text-secondary small me-2"> Numéro tel : </span>
              <span className="text-muted"> { data?.phone }  </span>
            </div>
            <div className="d-flex align-items-center border-bottom px-3 py-2">
              <span className="text-secondary small me-2"> Email : </span>
              <span className="text-muted"> { data?.email } </span>
            </div> 
            <div className="d-flex align-items-center border-bottom p-3">
              <a href="/commande" className="bg-green-light link text-muted d-flex justify-content-center align-items-center py-2 px-3 "> 
                Mes commandes <i class="bi bi-arrow-right ms-2"></i> 
              </a> 
            </div> 
          </div>
        </div>
        {/* ************************************** */}
        <div className="col-lg-12 mb-4">
          <div className="border bg-white text-secondary rounded-3">
            <div className="d-flex align-items-center border-bottom px-3 py-2">
              <i className="bi bi-pencil-square text-secondary"></i>
            </div>  
            <div className="d-flex align-items-center border-bottom px-3 py-2">
              <span className="text-secondary"> Modifier ma profession </span>
            </div>  
            <form className="d-flex flex-column p-3" onSubmit={ handleForm } >
              {
                isLoading && (
                  <div className="d-flex justify-content-center align-items-center"> 
                    <div className="spinner-border text-success" role="status" aria-label="Chargement"></div>
                  </div>
                )
              }
              {
                status === -1 && (
                  <div className="col-md-12">
                    <div className="alert alert-danger py-2 px-4 small">
                       Erreur !! Veuillez rééssayer s'il vous plaît.
                    </div>
                   </div>
                )
              }
              {
                status === 1 && (
                  <div className="col-md-12">
                    <div className="alert alert-success py-2 px-4 small">
                       Profession mis à jour avec succes.
                    </div>
                  </div>
                )
              } 
              <input type="text" name="occupation" placeholder="Ma profession" className="w-100 border input py-2 px-3 text-muted rounded-2 mb-3" onChange={ handleInput } />
              <button type="submit" className="btn btn-outline-secondary d-flex justify-content-center align-items-center py-2 px-3 "> 
                Enregistrer <i className="bi bi-arrow-right ms-2"></i> 
              </button> 
            </form> 
          </div>
        </div>
        {/* ************************************** */}
      </div>

    </div>

  );
}




export function Topbar({page}) 
{
 
  return (

    <nav className="navbar navbar-expand-sm">
      <div className="container-fluid">
        <button className="navbar-toggler small" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav2" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon small"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav2">
          <ul className="navbar-nav mt-3">
            <li className= {`nav-item px-2 ${(page===1) && 'border bg-green-light '}`} >
              <a className="nav-link text-muted" aria-current="page" href="/mon-compte"> Mon profile </a>
            </li>
            <li className={`nav-item px-2 ${(page===2) && 'border bg-green-light '}`}>
              <a className="nav-link text-muted" href="/panel-produit"> Mes produits </a>
            </li>
            <li className={`nav-item px-2 ${(page===3) && 'border bg-green-light '}`}>
              <a className="nav-link text-muted" href="/panel-session"> Mes sessions </a>
            </li>
            <li className={`nav-item px-2 ${(page===4) && 'border bg-green-light '}`}>
              <a className="nav-link text-muted" aria-current="page" href="/panel-nouvelle"> Mes nouvelles </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  );
}
