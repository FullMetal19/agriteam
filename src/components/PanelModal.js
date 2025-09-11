import { useState } from "react";
import { ProductApi } from "../api-services/product.api";
import { NewsApi } from "../api-services/news.api";
import { SessionApi } from "../api-services/session.api";


export function UnewsUpdateModal({ close, data, refetch })
{
  
  const [inputs, setInputs] = useState(data);
  const [status, setStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const news = NewsApi();
  
  const handleInputs = (event) => {
    setStatus(0);
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleForm = async (event) => {
    
    event.preventDefault();
    setStatus(0);
    setIsLoading(true);

    try {
      const res = await news.update( data?.id, inputs);
      setIsLoading(false);
      (res.data.success) ? setStatus(1) : setStatus(-1);
      event.target.reset();
      refetch();

    } catch (err) {
        setStatus(-1);
        setIsLoading(false);
    }
  }; 
  

    return (

      <div className="modal-container z-index-lg">
        <div className="container">
          <div className="row vh-100 d-flex align-items-center justify-content-center px-2">
            <div className="col-md-8 p-4 d-flex flex-column rounded-3">
              <button className="btn-close btn-close-white position-absolute end-0 me-3" style={{ top: "10px" }} aria-label="Close" onClick={ close } ></button>
             
              <form className="border bg-white text-secondary rounded-3" onSubmit={handleForm}>
                <div className="d-flex justify-content-between align-items-center border-bottom p-4 bg-green-light text-secondary rounded-top-3">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-pencil-square me-2"></i>
                    <span className=""> Mise à jour d'une nouvelle </span>
                  </div>
                </div>  
                {/* *************************************** */}
                <div className="d-flex flex-column border-bottom p-4">
                  {/* Textarea */}
                  <div className="mb-3">
                    <label className="text-secondary small mb-2 ms-3">Contenu du texte </label>
                    <textarea className="border p-3 rounded-2 w-100 text-muted" rows="8" name="desc" value={ inputs?.desc }  onChange={ handleInputs } required placeholder="Écrivez quelque chose..."> </textarea>
                  </div>
                </div> 
                {/* ************************************** */}
                <div className="d-flex flex-column p-4">
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
                           Une erreur est survenue durant le traitement. Veuillez rééssayer s'il vous plaît.
                        </div>
                       </div>
                    )
                  }
                  {
                    status === 1 && (
                      <div className="col-md-12">
                        <div className="alert alert-success py-2 px-4 small">
                           Nouvelle mise à jour avec succes.
                        </div>
                      </div>
                    )
                  } 
                  <button type="submit" className="btn btn-outline-success d-flex justify-content-center align-items-center border py-2 px-4" > 
                    Mettre à jour <i className="bi bi-arrow-right ms-2"></i> 
                  </button> 
                </div> 
              </form>

            </div>
          </div>
        </div>
      </div>
      
    )
}


export function UnewsDeleteModal({ close, data, refetch })
{

    const [status, setStatus] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const news = NewsApi();   

    const removeNews = async ()=> {

      setStatus(0);
      setIsLoading(true);
      try {
          const res = await news.remove( data?.id );
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
                    <span className=""> Suppresion d'une nouvelle </span>
                  </div>
                </div>  
                {/* *************************************** */}
                <div className="d-flex flex-column border-bottom p-3">
                  <p className="text-secondary"> Etes vous vraiment sure de vouloir supprimer cette nouvelle </p>
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
                        Nouvelle supprimée avec succes.
                      </div>
                    </div>
                  )
                } 
                {/* ************************************** */}
                <div className="d-flex gap-3 p-3">
                  <button className="btn btn-sm btn-outline-danger px-3" onClick={close} > Non </button> 
                  <button className="btn btn-sm btn-outline-success px-3" onClick={ removeNews } > Oui </button> 
                </div> 
              </form>

            </div>
          </div>
        </div>
      </div>
      
    )
}




// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::




export function UproductUpdateModal({ close, data, refetch })
{

  const [inputs, setInputs] = useState(data);
  const [status, setStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const product = ProductApi();
  
  const handleInputs = (event) => {
    setStatus(0);
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
      
  };
  
  const handleForm = async (event) => {
    
    event.preventDefault();
    setStatus(0);
    setIsLoading(true);

    try {
      const res = await product.update( data?.id, inputs);
      setIsLoading(false);
      (res.data.success) ? setStatus(1) : setStatus(-1);
      event.target.reset();
      refetch();

    } catch (err) {
        setStatus(-1);
        setIsLoading(false);
    }
  }; 
  

    return (

      <div className="modal-container z-index-lg">
        <div className="container">
          <div className="row vh-100 d-flex align-items-center justify-content-center px-2">
            <div className="col-md-8 p-4 d-flex flex-column rounded-3">
              <button className="btn-close btn-close-white position-absolute end-0 me-3" style={{ top: "10px" }} aria-label="Close" onClick={ close } ></button>
             
              <form className="border bg-white text-secondary rounded-3" onSubmit={handleForm} >
                <div className="d-flex justify-content-between align-items-center border-bottom p-4 bg-green-light text-secondary rounded-top-3">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-pencil-square me-2"></i>
                    <span className=""> Mis à jour d'un produit </span>
                  </div>
                </div>  
                {/* *************************************** */}
                <div className="d-flex flex-column border-bottom p-4 scroll-60">
                  {/* Selecter */}
                  <div className="mb-3">
                    <label className="text-secondary small mb-2 ms-3">Nom du produit </label>
                    <div className="d-flex gap-2" >
                      <input type="text" name="name" value={ inputs?.name }  placeholder="exemple Pastèque" className="w-100 border px-3 py-3 text-muted rounded-2" onChange={ handleInputs } required />
                      <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="text-secondary small ms-3 mb-2">Catégorie de produits </label>
                    <div className="d-flex gap-2" >
                      <select className="w-100 border px-3 py-3 text-muted rounded-2" name='category' value={ inputs?.category } onChange={ handleInputs } required>
                        <option value="" > Choisir la catégorie </option>
                        <option value="equipement" > Equipements agricole </option>
                        <option value="produit" > Produits agricole </option>
                        <option value="intrant" > Intrants agricole </option>
                        <option value="phytosanitaire" > Produits phytosanitaire </option>
                        <option value="expertise" > Expertise agricole </option>
                        <option value="autres" > Autres </option>
                      </select>  
                      <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="text-secondary small ms-3 mb-2">Choisir l'unité </label>
                    <div className="d-flex gap-2" >
                      <select className="w-100 border px-3 py-2 text-muted rounded-2" name='unit' value={ inputs?.unit } onChange={ handleInputs } required>
                        <option value="" > Selectionner une unité </option>
                        <optgroup label="Liquide">
                          <option value="litre" > Par litre </option>
                        </optgroup>
                        <optgroup label="Objet">
                          <option value="gramme" > Par gramme </option>
                          <option value="kilogramme" > Par kilogramme </option>
                          <option value="tonne" > Par tonne </option>
                        </optgroup>
                        <optgroup label="Surface">
                          <option value="métre carré"> Par métre carré </option>
                          <option value="hectare" > Par hectare </option>
                        </optgroup>
                        <optgroup label="Autres">
                          <option value="unité" > Par unité </option>
                          <option value="métre" > Par métre </option>
                          <option value="autres" > Autres </option>
                        </optgroup>
                      </select>  
                      <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="text-secondary small mb-2 ms-3">Prix unitaire </label>
                    <div className="d-flex gap-2" >
                      <input type="number" name="unitPrice" placeholder="Montant" value={ inputs?.unitPrice } className="w-100 border input px-3 py-3 text-muted rounded-2" onChange={ handleInputs } required />
                      <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-secondary"> Fcfa </span> 
                      <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="text-secondary small mb-2 ms-3">Quantité en stock </label>
                    <div className="d-flex gap-2" >
                      <input type="number" name="stock" value={ inputs?.stock } className="w-100 border input px-3 py-3 text-muted rounded-2" onChange={ handleInputs } required />
                      <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="text-secondary small mb-2 ms-3">Description du produit </label>
                    <textarea className="border p-3 rounded-2 w-100 text-muted" rows="5" name="desc" value={ inputs?.desc }  onChange={ handleInputs } required placeholder="Écrivez quelque chose..."> </textarea>
                  </div>

                </div> 
                {/* ************************************** */}
                <div className="d-flex flex-column p-4">
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
                           Une erreur est survenue durant le traitement. Veuillez rééssayer s'il vous plaît.
                        </div>
                       </div>
                    )
                  }
                  {
                    status === 1 && (
                      <div className="col-md-12">
                        <div className="alert alert-success py-2 px-4 small">
                           Produit mis à jour avec succes.
                        </div>
                      </div>
                    )
                  } 
                  <button type="submit" className="btn btn-outline-success d-flex justify-content-center align-items-center border py-2 px-4" > 
                    Mettre à jour <i className="bi bi-arrow-right ms-2"></i> 
                  </button> 
                </div> 
              </form>

            </div>
          </div>
        </div>
      </div>
      
    )
}


export function UproductDeleteModal({ close, data, refetch })
{
  
    const [status, setStatus] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const product = ProductApi();   

    const removeProduct = async ()=> {

      setStatus(0);
      setIsLoading(true);
      try {
          const res = await product.remove( data?.id );
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
                    <span className=""> Suppresion d'un produit </span>
                  </div>
                </div>  
                {/* *************************************** */}
                <div className="d-flex flex-column border-bottom p-3">
                  <p className="text-secondary"> Etes vous vraiment sure de vouloir retirer ce produit <span className="fw-bold text-success"> { data?.name } </span> du marché </p>
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
                         Produit supprimé avec succes.
                      </div>
                    </div>
                  )
                } 
                {/* ************************************** */}
                <div className="d-flex gap-3 p-3">
                  <button className="btn btn-sm btn-outline-danger px-3" onClick={close} > Non </button> 
                  <button className="btn btn-sm btn-outline-success px-3" onClick={ removeProduct } > Oui </button> 
                </div> 
              </form>

            </div>
          </div>
        </div>
      </div>
      
    )
  }




// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::



export function UsessionUpdateModal({ close, data, refetch })
{
   
  const [inputs, setInputs] = useState(data);
  const [status, setStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const session = SessionApi();
  
  const handleInputs = (event) => {
    setStatus(0);
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleForm = async (event) => {
    
    event.preventDefault();
    setStatus(0);
    setIsLoading(true);

    try {
      const res = await session.update( data?.id, inputs);
      setIsLoading(false);
      (res.data.success) ? setStatus(1) : setStatus(-1);
      event.target.reset();
      refetch();

    } catch (err) {
        setStatus(-1);
        setIsLoading(false);
    }
  }; 
  

  return (

      <div className="modal-container z-index-lg">
        <div className="container">
          <div className="row vh-100 d-flex align-items-center justify-content-center px-2">
            <div className="col-md-8 p-4 d-flex flex-column rounded-3">
              <button className="btn-close btn-close-white position-absolute end-0 me-3" style={{ top: "10px" }} aria-label="Close" onClick={ close } ></button>
             
              <form className="border bg-white text-secondary rounded-3" onSubmit={handleForm}>
                <div className="d-flex justify-content-between align-items-center border-bottom p-4 bg-green-light text-secondary rounded-top-3">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-pencil-square me-2"></i>
                    <span className=""> Mise à jour d'une session </span>
                  </div>
                </div>  
                {/* *************************************** */}
                <div className="d-flex flex-column border-bottom p-4">
                  {/* Textarea */}
                  <div className="mb-3">
                    <label className="text-secondary small mb-2 ms-3"> Thème de la session </label>
                    <textarea className="border p-3 rounded-2 w-100 text-muted" rows="8" name="desc" value={ inputs?.desc }  onChange={ handleInputs } required placeholder="Mettre le sujet de discussion..."> </textarea>
                  </div>
                </div> 
                {/* ************************************** */}
                <div className="d-flex flex-column p-4">
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
                           Une erreur est survenue durant le traitement. Veuillez rééssayer s'il vous plaît.
                        </div>
                       </div>
                    )
                  }
                  {
                    status === 1 && (
                      <div className="col-md-12">
                        <div className="alert alert-success py-2 px-4 small">
                          Session mise à jour avec succes.
                        </div>
                      </div>
                    )
                  } 
                  <button type="submit" className="btn btn-outline-success d-flex justify-content-center align-items-center border py-2 px-4" > 
                    Mettre à jour <i className="bi bi-arrow-right ms-2"></i> 
                  </button> 
                </div> 
              </form>

            </div>
          </div>
        </div>
      </div>
      
    )
}


export function UsessionDeleteModal({ close, data, refetch })
{

    const [status, setStatus] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const session = SessionApi();   

    const removeNews = async ()=> {

      setStatus(0);
      setIsLoading(true);
      try {
          const res = await session.remove( data?.id );
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
                    <span className=""> Suppresion d'une session </span>
                  </div>
                </div>  
                {/* *************************************** */}
                <div className="d-flex flex-column border-bottom p-3">
                  <p className="text-secondary"> Etes vous vraiment sure de vouloir supprimer cette session de discussion </p>
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
                        Session supprimée avec succes.
                      </div>
                    </div>
                  )
                } 
                {/* ************************************** */}
                <div className="d-flex gap-3 p-3">
                  <button className="btn btn-sm btn-outline-danger px-3" onClick={close} > Non </button> 
                  <button className="btn btn-sm btn-outline-success px-3" onClick={ removeNews } > Oui </button> 
                </div> 
              </form>

            </div>
          </div>
        </div>
      </div>
      
    )
}