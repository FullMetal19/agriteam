import { useState } from "react";
import { ProductOrderApi } from "../api-services/productOrder.api";
import { ProductApi } from "../api-services/product.api";
import { useQuery } from "@tanstack/react-query";
import { NewsApi } from "../api-services/news.api";
import { SessionApi } from "../api-services/session.api";



export function OrderModal({ method, data })
{

  const [inputs, setInputs] = useState({ quantity : 0, totalPrice : 0 });
  const [status, setStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const productOrder = ProductOrderApi();
  
  const handleInputs = (event) => {
    const { name, value } = event.target;
    setStatus(0);
    if (name === "quantity"){
      const newQuantity = parseFloat(value);
      const unitPrice = parseFloat(data?.unitPrice);
      setInputs((prev) => ({
        ...prev,
        [name]: newQuantity,
        totalPrice: newQuantity * unitPrice,
        productId: data?.id 
      }));
    } 
  };
  
  const handleForm = async (event) => {
    
    event.preventDefault();
    setStatus(0);
    setIsLoading(true);

    try {
      const res = await productOrder.insert( inputs);
      setIsLoading(false);
      (res.data.success) ? setStatus(1) : setStatus(-1);
      event.target.reset();

    } catch (err) {
        setStatus(-1);
        setIsLoading(false);
    }
  }; 

  
  return (

        <div className="modal-container z-index-lg">
            <div className="container">
                <div className="row vh-100 d-flex align-items-center justify-content-center px-2">
                    <div className="col-lg-6 col-md-9 bg-green-light p-2 d-flex flex-column rounded-3">
                        <button className="btn-close btn-close-white position-absolute end-0 me-3" style={{ top: "10px" }} aria-label="Close" onClick={ ()=>{ method ( false ) } } ></button>
                        
                        <div className="border bg-white text-secondary rounded-3 p-4 bg-white">
                          <div className="d-flex align-items-center justify-content-between border-bottom px-3 py-2 mb-3 bg-light">
                            <i className="bi bi-pencil-square text-secondary"></i>
                            <span className="text-secondary"> Faire la commande </span>
                          </div>  
                          <form className="d-flex flex-column p-3" onSubmit={handleForm}>
                            <div className="d-flex flex-column gap-1 mb-2" >
                              <span className="d-flex align-items-center small ps-3"> Nom du produit  </span>
                              <input type="text" name="productName" value={ data?.name }  placeholder="" className="w-100 border input py-3 px-3 text-muted rounded-2" /> 
                            </div>
                            <div className="d-flex flex-column gap-1 mb-2" >
                              <span className="d-flex align-items-center small ps-3"> Unité de vente  </span>
                              <input type="text" name="unit" placeholder="" value={ data?.unit }  className="w-100 border input py-3 px-3 text-muted rounded-2" /> 
                            </div>
                            <div className="d-flex flex-column gap-1 mb-2" >
                              <span className="d-flex align-items-center small ps-3"> Prix unitaire  </span>
                              <div className="d-flex gap-2" >
                                <input type="text" name="unitPrice" placeholder="" value={ data?.unitPrice }  className="w-100 border input py-3 px-3 text-muted rounded-2" />
                                <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-secondary"> Fcfa </span> 
                              </div> 
                            </div>
                            <div className="d-flex flex-column gap-1 mb-2" >
                              <span className="d-flex align-items-center small ps-3"> Quantité </span>
                              <div className="d-flex gap-2" >
                                <input type="number" name="quantity" placeholder="" value={ inputs?.quantity } className="w-100 border input py-3 px-3 text-muted rounded-2" onChange={ handleInputs } />
                                 <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                              </div> 
                            </div>
                            <div className="d-flex flex-column gap-1 mb-4" >
                              <span className="d-flex align-items-center small ps-3"> Prix total  </span>
                              <div className="d-flex gap-2" >
                                <input type="number" name="totalPrice" placeholder="" value={ inputs?.totalPrice } className="w-100 border input py-3 px-3 text-muted rounded-2" onChange={ handleInputs } />
                                <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-secondary"> Fcfa </span> 
                              </div> 
                            </div>
                            {
                              isLoading && (
                                <div className="d-flex justify-content-center align-items-center mb-3"> 
                                  <div className="spinner-border text-success" role="status" aria-label="Chargement"></div>
                                </div>
                              )
                            }
                            {
                              status === -1 && (
                                <div className="col-md-12 mb-3">
                                  <div className="alert alert-danger py-2 px-4 small">
                                     Une erreur est survenue durant le traitement. Veuillez rééssayer s'il vous plaît.
                                  </div>
                                 </div>
                              )
                            }
                            {
                              status === 1 && (
                                <div className="col-md-12 mb-3">
                                  <div className="alert alert-success py-2 px-4 small">
                                    Commande transmit avec succes.
                                  </div>
                                </div>
                              )
                            } 
                            <button className="bg-green-light text-secondary d-flex justify-content-center align-items-center border py-2 px-3 mb-2"> 
                              Commander <i class="bi bi-arrow-right ms-2"></i> 
                            </button> 
                          </form> 
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}



// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// It's for product
export function LikerListModal({ close, meta })
{

  const product = ProductApi();

  const fetchData = async () => {
    try {
      const res = await product.findLiker( meta?.id );
      return res.data.data || [];
    } catch (err) {
      console.log("Erreur lors de la récupération des produits : " + err.message);
      return [];
    }
  };
  const { isLoading, data, error } = useQuery({  queryKey: ["productLikers"], queryFn: fetchData });

    return (

      <div className="modal-container z-index-lg">
        <div className="container">
          <div className="row vh-100 d-flex align-items-center justify-content-center">
            <div className="col-md-8 d-flex flex-column rounded-3">
              <button className="btn-close btn-close-white position-absolute end-0 me-3" style={{ top: "10px" }} aria-label="Close" onClick={ close } ></button>
             
              <div className="border bg-white text-secondary rounded-3" >
                <div className="d-flex justify-content-between align-items-center border-bottom p-4 bg-green-light text-secondary rounded-top-3">
                  <div className="d-flex align-items-center">
                    <i class="bi bi-user me-2"></i>
                    <span className=""> Liste des likers </span>
                  </div>
                </div>  
                {/* *************************************** */}
                <div className="d-flex flex-column border-bottom p-4 gap-2 scroll-60">  
                {
                  isLoading ? (
                      <div className="col-md-12 d-flex justify-content-center mt-3"> <div className="spinner-border text-success fs-1" role="status" aria-label="Chargement"></div> </div>
                    ) : (
                        data?.length > 0 ? (
                          data?.map((item, index) => (
                            
                            <div className="border bg-white d-flex align-items-center p-3 rounded-3" key={index}>
                              <div className="me-2">
                                  <div className="border bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold small" style={{ width:40, height:40}}>
                                    { item?.owner.fname.charAt(0).toUpperCase() }{ item?.owner.lname.charAt(0).toUpperCase() }
                                  </div>
                              </div>
                              <div>
                                  <div className="fw-bold text-secondary small"> { item?.owner.fname + ' ' + item?.owner.lname } </div>
                                  <div className="text-secondary small"> { item?.owner.occupation } </div>
                              </div>    
                              <span className="d-flex align-items-center justify-content-center ms-auto border bg-green-light rounded-circle" style={{ width:30, height:30}}>
                                <i className="bi bi-plus-circle text-success small"></i>
                              </span>
                            </div>
                        ))
                      ) : (
                        <div className="d-flex px-4 mt-3 w-100 py-3 border shadow-sm bg-white text-muted">
                          La liste des likers de ce produit est vide
                        </div>
                      )
                     )
                }
                {  
                  error && (
                      <div className="col-md-12 mt-3">
                        <div className="border alert alert-danger text-muted px-4 py-3"> Une erreur est survenue lors du traitement. Veuillez vérifier votre connexion </div>
                      </div>
                    )
                }
                </div>
                {/* *************************************** */}
                <div className="d-flex justify-content-between align-items-center border-bottom p-3 bg-green-light text-secondary rounded-bottom-3"></div>  
              
              </div>
            </div>
          </div>
        </div>
      </div>
      
    )
}




// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

export function NewsLikerListModal({ close, meta })
{

  const news = NewsApi();

  const fetchData = async () => {
    try {
      const res = await news.findLiker( meta?.id );
      return res.data.data || [];
    } catch (err) {
      console.log("Erreur lors de la récupération des produits : " + err.message);
      return [];
    }
  };
  const { isLoading, data, error } = useQuery({  queryKey: ["newsLikers"], queryFn: fetchData });

    return (

      <div className="modal-container z-index-lg">
        <div className="container">
          <div className="row vh-100 d-flex align-items-center justify-content-center">
            <div className="col-md-8 d-flex flex-column rounded-3">
              <button className="btn-close btn-close-white position-absolute end-0 me-3" style={{ top: "10px" }} aria-label="Close" onClick={ close } ></button>
             
              <div className="border bg-white text-secondary rounded-3" >
                <div className="d-flex justify-content-between align-items-center border-bottom p-4 bg-green-light text-secondary rounded-top-3">
                  <div className="d-flex align-items-center">
                    <i class="bi bi-user me-2"></i>
                    <span className=""> Liste des likers </span>
                  </div>
                </div>  
                {/* *************************************** */}
                <div className="d-flex flex-column border-bottom p-4 gap-2 scroll-60">  
                {
                  isLoading ? (
                      <div className="col-md-12 d-flex justify-content-center mt-3"> <div className="spinner-border text-success fs-1" role="status" aria-label="Chargement"></div> </div>
                    ) : (
                        data?.length > 0 ? (
                          data?.map((item, index) => (
                            
                            <div className="border bg-white d-flex align-items-center p-3 rounded-3" key={index}>
                              <div className="me-2">
                                  <div className="border bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold small" style={{ width:40, height:40}}>
                                    { item?.owner.fname.charAt(0).toUpperCase() }{ item?.owner.lname.charAt(0).toUpperCase() }
                                  </div>
                              </div>
                              <div>
                                  <div className="fw-bold text-secondary small"> { item?.owner.fname + ' ' + item?.owner.lname } </div>
                                  <div className="text-secondary small"> { item?.owner.occupation } </div>
                              </div>    
                              <span className="d-flex align-items-center justify-content-center ms-auto border bg-green-light rounded-circle" style={{ width:30, height:30}}>
                                <i className="bi bi-plus-circle text-success small"></i>
                              </span>
                            </div>
                        ))
                      ) : (
                        <div className="d-flex px-4 mt-3 w-100 py-3 border shadow-sm bg-white text-muted">
                          La liste des likers de cette nouvelle est vide
                        </div>
                      )
                     )
                }
                {  
                  error && (
                      <div className="col-md-12 mt-3">
                        <div className="border alert alert-danger text-muted px-4 py-3"> Une erreur est survenue lors du traitement. Veuillez vérifier votre connexion </div>
                      </div>
                    )
                }
                </div>
                {/* *************************************** */}
                <div className="d-flex justify-content-between align-items-center border-bottom p-3 bg-green-light text-secondary rounded-bottom-3"></div>  
              
              </div>
            </div>
          </div>
        </div>
      </div>
      
    )
}



// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

export function SessionLikerListModal({ close, meta })
{

  const session = SessionApi();

  const fetchData = async () => {
    try {
      const res = await session.findLiker( meta?.id );
      return res.data.data || [];
    } catch (err) {
      console.log("Erreur lors de la récupération des produits : " + err.message);
      return [];
    }
  };
  const { isLoading, data, error } = useQuery({  queryKey: ["sessionLikers"], queryFn: fetchData });

  return (

      <div className="modal-container z-index-lg">
        <div className="container">
          <div className="row vh-100 d-flex align-items-center justify-content-center">
            <div className="col-md-8 d-flex flex-column rounded-3">
              <button className="btn-close btn-close-white position-absolute end-0 me-3" style={{ top: "10px" }} aria-label="Close" onClick={ close } ></button>
             
              <div className="border bg-white text-secondary rounded-3" >
                <div className="d-flex justify-content-between align-items-center border-bottom p-4 bg-green-light text-secondary rounded-top-3">
                  <div className="d-flex align-items-center">
                    <i class="bi bi-user me-2"></i>
                    <span className=""> Liste des likers </span>
                  </div>
                </div>  
                {/* *************************************** */}
                <div className="d-flex flex-column border-bottom p-4 gap-2 scroll-60">  
                {
                  isLoading ? (
                      <div className="col-md-12 d-flex justify-content-center mt-3"> <div className="spinner-border text-success fs-1" role="status" aria-label="Chargement"></div> </div>
                    ) : (
                        data?.length > 0 ? (
                          data?.map((item, index) => (
                            
                            <div className="border bg-white d-flex align-items-center p-3 rounded-3" key={index}>
                              <div className="me-2">
                                  <div className="border bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold small" style={{ width:40, height:40}}>
                                    { item?.owner.fname.charAt(0).toUpperCase() }{ item?.owner.lname.charAt(0).toUpperCase() }
                                  </div>
                              </div>
                              <div>
                                  <div className="fw-bold text-secondary small"> { item?.owner.fname + ' ' + item?.owner.lname } </div>
                                  <div className="text-secondary small"> { item?.owner.occupation } </div>
                              </div>    
                              <span className="d-flex align-items-center justify-content-center ms-auto border bg-green-light rounded-circle" style={{ width:30, height:30}}>
                                <i className="bi bi-plus-circle text-success small"></i>
                              </span>
                            </div>
                        ))
                      ) : (
                        <div className="d-flex px-4 mt-3 w-100 py-3 border shadow-sm bg-white text-muted">
                          La liste des likers de cette nouvelle est vide
                        </div>
                      )
                     )
                }
                {  
                  error && (
                      <div className="col-md-12 mt-3">
                        <div className="border alert alert-danger text-muted px-4 py-3"> Une erreur est survenue lors du traitement. Veuillez vérifier votre connexion </div>
                      </div>
                    )
                }
                </div>
                {/* *************************************** */}
                <div className="d-flex justify-content-between align-items-center border-bottom p-3 bg-green-light text-secondary rounded-bottom-3"></div>  
              
              </div>
            </div>
          </div>
        </div>
      </div>
      
    )
}
