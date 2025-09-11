import React from "react";


export function Error() 
{

  return (

    <div className="container-fluid bg-green-light">
      <div className="row vh-100 d-flex flex-column align-items-center justify-content-center px-4">
        <div className="col-md-5 pt-4 d-flex justify-content-center lead text-secondary">
            <img src="../favicon.png" alt="icon-agrospace" width="80" className=""/> 
        </div>
        <div className="col-md-5 pt-2 mb-4 d-flex justify-content-center lead text-secondary">
            Agrospace - AgriTeam
        </div>
        <div className="col-md-5 p-5 d-flex justify-content-center border shadow-sm rounded-2">
          <div className="d-flex gap-3 flex-column align-items-center">
            <h1 className="lead display-4 fw-bold" > PAGE </h1>
            <p className="display-1" > 404 </p>
          </div>
        </div> 
        
      </div>
    </div>  

  );
}

