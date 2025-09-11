import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { LeftSidebar, Topbar } from "./TemplateComponenent";


export default function Template({page, children}) 
{
 
  return (
    <div className="bg-light min-vh-100">
      {/* Header's section */}
      <Header page={4} />

      {/* Service's section */}
      <div className="container py-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-11">
            <div className="row d-flex justify-content-between flex-lg-row">

              {/* Sidebar: on lg it’s right, but on md it goes first */}                
              <LeftSidebar />

              {/* Main content: on lg it’s left, on md it goes after */}
              <div className="col-lg-7 rounded-3"> 

                <div className="row sticky-top">
                  <div className="col-lg-12">   
                    <div className="border bg-white text-secondary rounded-3 mb-4">
                      <div className="d-flex align-items-center border-bottom px-4 py-3 text-secondary">
                        <i className="bi bi-speedometer2 me-2"></i> Panel de gestion  
                      </div>  
                      <div className="d-flex flex-column p-3">
                        <Topbar page={page} /> 
                      </div> 
                    </div>
                  </div>
                </div>

                <div className="row">
                  { children }
                </div>

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
