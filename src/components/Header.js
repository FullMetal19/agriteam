import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { UserApi } from "../api-services/user.api";
import { useQuery } from "@tanstack/react-query";



export default function Header({ page=1 }) 
{
  const signout = ()=> {
      localStorage.clear();
      window.open(process.env.REACT_APP_AGROSPACE_URL, "_self", "noopener", "noreferrer");
  }


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
  const { data } = useQuery({  queryKey: ["user"], queryFn: fetchData });


  return (
    <>

      <div className="text-white text-center position-relative border-grays z-index-md py-1" style={{background:"linear-gradient(90deg, #1e1f1eff 30%, #347944ff 100%)"}}>  </div>
      
      {/* Navbar principale */}
      <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top z-index-md">
        <div className="container py-2">
          {/* Logo */}
          <div className="navbar-brand d-flex align-items-center">
            <img src="../favicon.png" alt="icon-agrospace" width="30" className="me-2"/>
            <span className="text-muted fs-5">  AgriTeam </span>
          </div>
          {/* Burger menu pour mobile */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Liens */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item ms-2 me-4">
                <a className={`nav-link gap-2 ${(page===1) && 'text-success'}`} href="/"> <i className="bi bi-megaphone me-1"></i>   Nouvelles </a>
              </li>
              <li className="nav-item ms-2 me-4">
                <a className={`nav-link gap-2 ${(page===2) && 'text-success'}`} href="/marche-virtuel"> <i className="bi bi-cart me-1"></i> Marché virtuel </a>
              </li>
              <li className="nav-item ms-2 me-4">
                <a className={`nav-link gap-2 ${(page===3) && 'text-success'}`} href="/discussion"> <i className="bi bi-chat-dots me-1"></i> Discussions </a>
              </li>
            </ul>
            {/* Actions à droite */}
            <div className="d-flex align-items-center">
              <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item dropdown mx-2">
                <a className={`nav-link dropdown-toggle gap-2 ${(page===4) && 'text-success'}`} href="/mon-compte" id="productsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" >
                  <i className="bi bi-person-circle"></i> Mon compte
                </a>
                <ul className="dropdown-menu" aria-labelledby="productsDropdown">
                  <li>
                    <div className="d-flex flex-column p-3 w-100">
                      <p className="small fw-bold text-muted mb-1"> { data?.fname + ' ' + data?.lname } </p>
                      <p className="small mb-1 text-muted"> { data?.occupation} </p>
                      <p className="text-secondary small"> { data?.sex } </p>
                    </div>
                  </li>
                  <li><a className="dropdown-item bg-light border-top py-2 small text-muted" href="/mon-compte"> Mon compte </a></li>
                  <li><a className="dropdown-item bg-light border-top py-2 small text-muted" href="/commande"> Mes commandes </a></li>
                  <li><button className="dropdown-item bg-light border-top py-2 small text-muted" onClick={ signout }>
                    Agrospace <i className="bi bi-arrow-left ms-2"></i> 
                  </button></li>
                </ul>
              </li>
              </ul>
            </div>
            {/* ******************************* */}
          </div>
        </div>
      </nav>
    </>
  );
}
