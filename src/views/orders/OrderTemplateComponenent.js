import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useQuery } from "@tanstack/react-query";
import { WithdrawApi } from "../../api-services/withdraw.api";
import { UserApi } from "../../api-services/user.api";
import { TextReducer } from "../../components/Card";


export function LeftSidebar() 
{
  const [showBalance, setShowBalance] = useState();
  const [status, setStatus] = useState(false);

  const balance = WithdrawApi();

  const fetchData = async () => {
    try {
      const res = await balance.getBalance();
      // console.log(res.data)
      return res.data.data || [];
    } catch (err) {
      console.log("Erreur : " + err.message);
      return [];
    }
  };
  const { data, refetch } = useQuery({  queryKey: ["balance"], queryFn: fetchData });
 
  return (

    <div className="col-lg-4"> 
      <div className="row sticky-top">
        {/* ************************************* */}
        <div className="col-lg-12 mb-4">
          <Userbar />
        </div>
        {/* *********************************** */}
        <div className="col-lg-12 mb-4">
          <div className="border bg-white text-secondary rounded-3">
            <div className="d-flex align-items-center border-bottom px-3 py-2">
              <i className="bi bi-cash-coin text-secondary"></i>
            </div>  
            <div className="d-flex align-items-center border-bottom px-3 py-2">
              Mon solde
            </div> 
            <div className="d-flex align-items-center p-3 border-bottom mb-3">
              <div className="w-100 d-flex align-items-center border-top border-start border-bottom input py-2 px-3 text-muted"> 
                {  showBalance ?  `${ data?.totalAmount ?? 0 } Fcfa`  :  '********************'}  
              </div> 
              <button className="bg-green-light d-flex align-items-center border py-2 px-3" onClick={ ()=> setShowBalance( ! showBalance ) } > 
                <i class= {`"bi text-secondary" ${ showBalance ? "bi-eye" : "bi-eye-slash" } `} ></i>
              </button>   
            </div> 
            <div className="d-flex align-items-center border-bottom px-3 py-2">
              Faire un retrait d'argent
            </div> 
            <div className="d-flex align-items-center p-3">
              <button className="bg-green-light text-secondary d-flex justify-content-center align-items-center border px-3 py-2" onClick={ ()=> setStatus(true) }> 
                Retrait <i className="bi bi-arrow-right ms-2"></i> 
              </button> 
            </div> 
             <div className="d-flex align-items-center border-bottom px-3 py-2">
              Historique des retraits
            </div> 
            <div className="d-flex align-items-center p-3">
              <a href="/historique-retraits" className="btn-sm btn btn-outline-secondary d-flex justify-content-center align-items-center px-3"> 
                <i className="bi bi-eye me-2"></i>  consulter 
              </a> 
            </div> 
          </div>
        </div>
        {/* ************************************* */}
        <div className="col-lg-12 mb-4">  
        {
           status && ( <WithdrawForm  close={ ()=> setStatus(false) } refetch={refetch} /> )
        } 
        </div>
        {/* ************************************** */}
      </div>
    </div>

  );
}




export function Userbar({page}) 
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
  const { data } = useQuery({ queryKey: ["user"], queryFn: fetchData });

  return (

    <div className="border bg-white text-secondary rounded-top-3">
      <div className="d-flex align-items-center p-3">
        <div className="me-2">
          <div className="border bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold small" style={{ width:40, height:40}}>
             {data?.fname ? data.fname.charAt(0).toUpperCase() : ""}{data?.lname ? data.lname.charAt(0).toUpperCase() : ""}
          </div>
        </div>
        <div>
          <div className="fw-bold text-secondary small" title={ data?.fname + ' ' + data?.lname }> <TextReducer text={data?.fname + ' ' + data?.lname} maxsize={24} /> </div>
          <div className="text-secondary small" title={ data?.occupation }> <TextReducer text={ data?.occupation} maxsize={24} /> </div>
        </div>
      </div>
    </div>

  );
}





export function Topbar({page}) 
{
 
  return (

    <nav class="navbar navbar-expand-sm">
      <div class="container-fluid">
        <button class="navbar-toggler small" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav2" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon small"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav2">
          <ul class="navbar-nav mt-3">
            <li class= {`nav-item px-2 ${(page===1) && 'border bg-green-light '}`} >
              <a class="nav-link text-muted" aria-current="page" href="/commande"> Mes commandes </a>
            </li>
            <li class={`nav-item px-2 ${(page===2) && 'border bg-green-light '}`}>
              <a class="nav-link text-muted" href="/commande-externe"> Commandes externe </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  );
}



export function WithdrawForm({ close,  refetch }) 
{
 
    const [inputs, setInputs] = useState({});
    const [status, setStatus] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
      
    const withdraw = WithdrawApi();
        
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
        const res = await withdraw.doWithdraw( inputs );
        setIsLoading(false);
        // console.log(res.data.success)
        setStatus(res.data.success === true ? 1 : -1);
        event.target.reset();
        refetch();
      
      } catch (err) {
          setStatus(-1);
          setIsLoading(false);
      }
  
    }; 

  return (

    <div className="border bg-white text-secondary rounded-3">
      <div className="d-flex align-items-center justify-content-between border-bottom px-3 py-2">
        <i class="bi bi-pencil-square text-secondary"></i>
        <button className="btn btn-sm" onClick={ close } >
          <i class="bi bi-x-circle text-secondary"></i>
        </button>
      </div>  
      <div className="d-flex align-items-center border-bottom px-3 py-2 mb-2">
        <span className="text-secondary"> Retrait d'argent </span>
      </div>  
      <form className="d-flex flex-column p-3" onSubmit={handleForm}>

        <div className="d-flex gap-2 mb-3" >
          <input type="text" name="fname" placeholder="Prénom" className="w-100 border input py-2 px-3 text-muted rounded-2" onChange={ handleInputs } required />
          <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
        </div>
        <div className="d-flex gap-2 mb-3" >
          <input type="text" name="lname" placeholder="Nom" className="w-100 border input py-2 px-3 text-muted rounded-2" onChange={ handleInputs } required />
          <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
        </div>
        <div className="d-flex gap-2 mb-3" >
          <input type="number" name="phone" placeholder="Numéro de téléphone" className="w-100 border input py-2 px-3 text-muted rounded-2" onChange={ handleInputs } required />
          <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
        </div>
        <div className="d-flex gap-2 mb-3" >
          <select className="w-100 border py-2 px-3 text-muted rounded-2" name='operator' onChange={ handleInputs } required > 
            <option value="" > Choisir un opérateur </option>
            <option value="Wave" > Wave </option>
          </select>  
          <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
        </div>
        <div className="d-flex gap-2 mb-4" >
          <input type="number" name="amount" placeholder="Montant" className="w-100 border input py-2 px-3 text-muted rounded-2" onChange={ handleInputs } required />
          <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-secondary"> Fcfa </span> 
        </div>
        {
          isLoading && (
            <div className="d-flex justify-content-center align-items-center mb-4"> 
              <div className="spinner-border text-success" role="status" aria-label="Chargement"></div>
            </div>
          )
        }
        {
          status === -1 && (
            <div className="col-md-12 mb-4">
              <div className="alert alert-danger py-2 px-4 small">
                 Une erreur est survenue durant le traitement. Veuillez rééssayer s'il vous plaît.
              </div>
             </div>
          )
        }
        {
          status === 1 && (
            <div className="col-md-12 mb-4">
              <div className="alert alert-success py-2 px-4 small">
                Transfère effectué avec succes.
              </div>
            </div>
          )
        } 
        <button className="bg-green-light text-secondary d-flex justify-content-center align-items-center border py-2 px-3 mb-2"> 
          Transférer <i class="bi bi-arrow-right ms-2"></i> 
        </button> 

      </form> 
    </div>

  );
}