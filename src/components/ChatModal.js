import React, { useState } from "react";
import { DiscussionApi } from "../api-services/discussion.api";

export function ChatDeleteModal({ close, data, refetch })
{
  
    const [status, setStatus] =  useState(0);
    const [isLoading, setIsLoading] =  useState(false);
    
    const discussion = DiscussionApi();   

    const removeDiscussion = async ()=> {

      setStatus(0);
      setIsLoading(true);
      try {
          const res = await discussion.remove( data?.id );
          setIsLoading(false);
          (res.data.success) ? setStatus(1) : setStatus(-1);
          refetch();

      } catch (err) {
          setStatus(-1);
          setIsLoading(false);
      }

    }

    return (

      <div className="modal-container z-index-lg">
        <div className="container">
          <div className="row vh-100 d-flex align-items-center justify-content-center px-2">
            <div className="col-md-9 col-lg-6 d-flex flex-column rounded-3">
              <button className="btn-close btn-close-white position-absolute end-0 me-3" style={{ top: "10px" }} aria-label="Close" onClick={ close } ></button>
             
              <form className="border bg-white text-secondary rounded-3">
                <div className="d-flex justify-content-between align-items-center border-bottom p-3 bg-green-light text-secondary rounded-top-3">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-trash me-2"></i>
                    <span className=""> Suppresion d'un message { data?.id } </span>
                  </div>
                </div>  
                {/* *************************************** */}
                <div className="d-flex flex-column border-bottom p-3">
                  <p className="text-secondary"> Etes vous vraiment sure de vouloir supprimer ce message </p>
                </div> 
                {
                  isLoading && (
                    <div className="d-flex justify-content-center align-items-center"> 
                      <div className="spinner-border text-success" role="status" aria-label="Chargement"></div>
                    </div>
                  )
                }
                { status === -1 && (
                    <div className="col-md-12">
                      <div className="alert alert-danger py-2 px-4 small">
                         Une erreur est survenue durant le traitement. Veuillez rééssayer s'il vous plaît.
                      </div>
                     </div>
                  )
                }
                {
                  status === 1 && (
                    <div className="col-md-12">
                      <div className="alert alert-success py-2 px-4 small">
                        Message supprimé avec succes.
                      </div>
                    </div>
                  )
                } 
                {/* ************************************** */}
                <div className="d-flex gap-3 p-3">
                  <button className="btn btn-sm btn-outline-danger px-3" onClick={close} > Non </button> 
                  <button className="btn btn-sm btn-outline-success px-3" onClick={ removeDiscussion } > Oui </button> 
                </div> 
              </form>

            </div>
          </div>
        </div>
      </div>
      
    )
  }

