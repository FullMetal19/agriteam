import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ProductApi } from "../api-services/product.api";
import { NewsApi } from "../api-services/news.api";
import { SessionApi } from "../api-services/session.api";


export function UnewsForm({ close, refetch })
{

  const [files, setFiles] = useState([]);
  const [err, setErr] = useState(false);
  
  const [inputs, setInputs] = useState();
  const [status, setStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleInputs = (event) => {
      const { name, value, files } = event.target;
      setStatus(0);
      
      if (name === 'images') {
        setErr(false);
        const selectedFiles = Array.from(event.target.files);
        if (selectedFiles.length > 3) { setErr(true); }
        else {
          setFiles(selectedFiles);
          setInputs((prev) => ({ ...prev, [name]: files }));
        } 
      }
      else {
          setInputs((prev) => ({ ...prev, [name]: value }));
      }
  };
  
  const handleForm = async (event) => {
    
    event.preventDefault();
    const news = NewsApi("multipart/form-data");
    setStatus(0);
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      for (const key in inputs) {
          if (key === 'images') {
              for(let i = 0; i < inputs.images.length; i++ ){
                  formData.append('images', inputs.images[i]);
              }
          } else {
              formData.append(key, inputs[key]);
          }
      }
      const res = await news.insert(formData);
      setIsLoading(false);
      setStatus( res.data.success ? 1 : -1 );
      event.target.reset();
      refetch();

    } catch (err) {
        setStatus(-1);
        setIsLoading(false);
    }
  }; 

  return (

    <div className="col-lg-12 mb-4">
      <form className="border border-success bg-white text-secondary rounded-3" onSubmit={ handleForm } encType="multipart/form-data"  >
        <div className="d-flex justify-content-between align-items-center border-bottom p-3 bg-green-light text-secondary rounded-3">
          <div className="d-flex align-items-center">
            <i className="bi bi-plus-circle-fill me-2"></i>
            <span className=""> Ajout d'une nouvelle </span>
          </div>
          <button className="btn btn-sm" onClick={ close } >
            <i className="bi bi-x-circle text-secondary"></i>
          </button>
        </div>  
        {/* *************************************** */}
        <div className="d-flex flex-column border-bottom p-4">

          {/* Textarea */}
          <div className="mb-3">
            <label className="text-secondary small mb-2 ms-3">Contenu du texte </label>
            <textarea className="border p-3 rounded-2 w-100 text-muted" rows="5"  name="desc" onChange={ handleInputs } required  placeholder="Écrivez quelque chose..." ></textarea>
          </div>
          <div className="d-flex flex-column mb-3">
            <div className="d-flex">
                <label className="cursor bg-green-light px-4 py-2 rounded-2 border" htmlFor="img1">
                <i className="bi bi-upload me-2"></i>
                <span className=""> Importer des images </span>
              </label>
            </div>
            <input type="file" className="hidden" accept="image/*" multiple id="img1" name="images" required  onChange={ handleInputs }  />
          </div>

          <div className="d-flex">
            {err && <p className="border text-danger small mb-3 py-2 px-4 rounded-4"> Vous ne pouvez pas impoter plus de 3 images. </p> }
          </div>
          {
            ! err && (
              <div className="d-flex gap-2 flex-wrap mb-3">
                {files.map((file, index) => (
                  <div key={index} className="border rounded p-1">
                    <img src={URL.createObjectURL(file)} alt="preview" width="100" height="100" style={{ objectFit: "cover", borderRadius: "8px" }} />
                  </div>
                ))}
              </div>
            )
          }
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
                   Une erreur est survenue lors de la creation de votre compte, veuillez rééssayer s'il vous plaît.
                </div>
               </div>
            )
          }
          {
            status === 1 && (
              <div className="col-md-12">
                <div className="alert alert-success py-2 px-4 small">
                   Nouvelle publiée avec succes.
                </div>
              </div>
            )
          } 
        </div> 
        {/* ************************************** */}
        <div className="d-flex p-3">
          <button type="submit" className="btn btn-outline-success d-flex justify-content-center align-items-center border py-2 px-4" > 
            Poster maintenant <i className="bi bi-arrow-right ms-2"></i> 
          </button> 
        </div> 
      </form>
    </div>
  );
};




export function UproductForm({ close, refetch })
{

  const [files, setFiles] = useState([]);
  const [err, setErr] = useState(false);
  
  const [inputs, setInputs] = useState();
  const [status, setStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleInputs = (event) => {
      const { name, value, files } = event.target;
      setStatus(0);
      
      if (name === 'images') {
        setErr(false);
        const selectedFiles = Array.from(event.target.files);
        if (selectedFiles.length > 2) { setErr(true); }
        else {
          setFiles(selectedFiles);
          setInputs((prev) => ({ ...prev, [name]: files }));
        } 
      }
      else {
          setInputs((prev) => ({ ...prev, [name]: value }));
      }
  };
  
  const handleForm = async (event) => {
    
    event.preventDefault();
    const product = ProductApi("multipart/form-data");
    setStatus(0);
    setIsLoading(true);
    console.log(inputs);
    
    try {
      const formData = new FormData();
      for (const key in inputs) {
          if (key === 'images') {
              for(let i = 0; i < inputs.images.length; i++ ){
                  formData.append('images', inputs.images[i]);
              }
          } else {
              formData.append(key, inputs[key]);
          }
      }
      const res = await product.insert(formData);
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

    <div className="col-lg-12 mb-4">
      <form className="border border-success bg-white text-secondary rounded-3" onSubmit={ handleForm } encType="multipart/form-data"  >
        <div className="d-flex justify-content-between align-items-center border-bottom p-3 bg-green-light text-secondary rounded-top-3">
          <div className="d-flex align-items-center">
            <i className="bi bi-plus-circle-fill me-2"></i>
            <span className=""> Ajout d'un produit </span>
          </div>
          <button className="btn btn-sm" onClick={ close } >
            <i className="bi bi-x-circle text-secondary"></i>
          </button>
        </div>  
        {/* *************************************** */}
        <div className="d-flex flex-column border-bottom p-4">

          <div className="mb-3">
            <label className="text-secondary small mb-2 ms-3">Nom du produit </label>
            <div className="d-flex gap-2" >
              <input type="text" name="name" placeholder="exemple Pastèque" className="w-100 border px-3 py-3 text-muted rounded-2" onChange={ handleInputs } required />
              <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
            </div>
          </div>

          <div className="mb-3">
            <label className="text-secondary small ms-3 mb-2">Catégorie de produits </label>
            <div className="d-flex gap-2" >
              <select className="w-100 border px-3 py-3 text-muted rounded-2" name='category' onChange={ handleInputs } required>
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
              <select className="w-100 border px-3 py-3 text-muted rounded-2" name='unit' onChange={ handleInputs } required>
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
              <input type="number" name="unitPrice" placeholder="Montant" className="w-100 border input px-3 py-3 text-muted rounded-2" onChange={ handleInputs } required />
              <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-secondary"> Fcfa </span> 
              <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
            </div>
          </div>

          <div className="mb-3">
            <label className="text-secondary small mb-2 ms-3">Quantité en stock </label>
            <div className="d-flex gap-2" >
              <input type="number" name="stock" className="w-100 border input px-3 py-3 text-muted rounded-2" onChange={ handleInputs } required />
              <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span>
            </div>
          </div>

          <div className="mb-3">
            <label className="text-secondary small mb-2 ms-3">Description du produit </label>
            <textarea className="border p-3 rounded-2 w-100 text-muted" rows="5" name="desc" onChange={ handleInputs } required placeholder="Écrivez quelque chose..."> </textarea>
          </div>

          <div className="d-flex flex-column mb-3">
            <div className="d-flex">
                <label className="cursor bg-green-light px-4 py-2 rounded-2 border" htmlFor="img1">
                <i className="bi bi-upload me-2"></i>
                <span className=""> Importer des images </span>
              </label>
            </div>
            <input type="file" className="hidden" accept="image/*" multiple id="img1" name="images" required  onChange={ handleInputs }  />
          </div>

          <div className="d-flex">
            {err && <p className="border text-danger small mb-3 py-2 px-4 rounded-4"> Vous ne pouvez pas impoter plus de 2 images de votre produit. </p> }
          </div>
          {
            ! err && (
              <div className="d-flex gap-2 flex-wrap mb-3">
                {files.map((file, index) => (
                  <div key={index} className="border rounded p-1">
                    <img src={URL.createObjectURL(file)} alt="preview" width="100" height="100" style={{ objectFit: "cover", borderRadius: "8px" }} />
                  </div>
                ))}
              </div>
            )
          }
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
                   Une erreur est survenue lors de la creation de votre compte, veuillez rééssayer s'il vous plaît.
                </div>
               </div>
            )
          }
          {
            status === 1 && (
              <div className="col-md-12">
                <div className="alert alert-success py-2 px-4 small">
                   Produit publié avec succes.
                </div>
              </div>
            )
          } 
        </div> 
        
        {/* ************************************** */}
        <div className="d-flex p-3">
          <button type="submit" className="btn btn-outline-success d-flex justify-content-center align-items-center border py-2 px-4" > 
            Poster maintenant <i className="bi bi-arrow-right ms-2"></i> 
          </button> 
        </div> 
      </form>
    </div>
  );
};



export function UsessionForm({ close, refetch })
{

  const [inputs, setInputs] = useState();
  const [status, setStatus] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleInputs = (event) => {    
    setStatus(0);
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleForm = async (event) => {
    
    event.preventDefault();
    const session = SessionApi();
    setStatus(0);
    setIsLoading(true);
    
    try {
      const res = await session.insert(inputs);
      setIsLoading(false);
      setStatus( res.data.success ? 1 : -1 );
      event.target.reset();
      refetch();

    } catch (err) {
        setStatus(-1);
        setIsLoading(false);
    }

  }; 

  return (

    <div className="col-lg-12 mb-4">
      <form className="border border-success bg-white text-secondary rounded-3" onSubmit={ handleForm }>
        <div className="d-flex justify-content-between align-items-center border-bottom p-3 bg-green-light text-secondary rounded-3">
          <div className="d-flex align-items-center">
            <i className="bi bi-plus-circle-fill me-2"></i>
            <span className=""> Création d'une nouvelle session </span>
          </div>
          <button className="btn btn-sm" onClick={ close } >
            <i className="bi bi-x-circle text-secondary"></i>
          </button>
        </div>  
        {/* *************************************** */}
        <div className="d-flex flex-column border-bottom p-4">
          {/* Textarea */}
          <div className="mb-3">
            <label className="text-secondary small mb-2 ms-3"> Thème de la session</label>
            <textarea className="border p-3 rounded-2 w-100 text-muted" rows="5" name="desc" onChange={ handleInputs } required placeholder="Mettre le sujet de discussion..."> </textarea>
          </div>
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
                   Une erreur est survenue lors de la creation de votre compte, veuillez rééssayer s'il vous plaît.
                </div>
               </div>
            )
          }
          {
            status === 1 && (
              <div className="col-md-12">
                <div className="alert alert-success py-2 px-4 small">
                   Session de discussion publiée avec succes.
                </div>
              </div>
            )
          } 
        </div> 
        {/* ************************************** */}
        <div className="d-flex p-3">
          <button type="submit" className="btn btn-outline-success d-flex justify-content-center align-items-center border py-2 px-4" > 
            Créer maintenant <i className="bi bi-arrow-right ms-2"></i> 
          </button> 
        </div> 
      </form>
    </div>
  );
};


