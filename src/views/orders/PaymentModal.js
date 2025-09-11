import { useState } from "react";
import { ProductOrderApi } from "../../api-services/productOrder.api";


export function PaymentModal({ close, data, refetch })
{
    const [inputs, setInputs] = useState({ amount : data?.totalPrice });
    const [status, setStatus] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    
    const productOrder = ProductOrderApi();
      
    const handleInputs = (event) => {
      setStatus(0);
      const { name, value } = event.target;
      setInputs((prev) => ({ ...prev, [name]: value , 'amount': data?.totalPrice }));    
    };
      
    const handleForm = async (event) => {
        
      event.preventDefault();
      setStatus(0);
      setIsLoading(true);
          
      try {
        const res = await productOrder.pay( data?.id, inputs);
        setIsLoading(false);
        console.log(res.data.success)
        setStatus(res.data.success ? 1 : -1);
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
            <div className="col-md-8 col-lg-6 p-2 bg-green-light d-flex flex-column rounded-3">
              <button className="btn-close btn-close-white position-absolute end-0 me-3" style={{ top: "10px" }} aria-label="Close" onClick={ close } ></button>
             
              <div className="border bg-white text-secondary rounded-3 py-4 px-4">
                <div className="d-flex align-items-center justify-content-between border-bottom px-3 py-2 mb-3 bg-light">
                  <i className="bi bi-pencil-square text-secondary"></i>
                  <span className="text-secondary"> Payement de la commande </span>
                </div>  
                <form className="d-flex flex-column p-3" onSubmit={handleForm}>
                  <div className="d-flex gap-2 mb-3" >
                    <input type="text" name="fname" placeholder="Prénom" className="w-100 border input py-2 px-3 text-muted rounded-2" onChange={ handleInputs } />
                    <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                  </div>
                  <div className="d-flex gap-2 mb-3" >
                    <input type="text" name="lname" placeholder="Nom" className="w-100 border input py-2 px-3 text-muted rounded-2" onChange={ handleInputs } />
                    <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                  </div>
                  <div className="d-flex gap-2 mb-3" >
                    <input type="number" name="phone" placeholder="Numéro de téléphone" className="w-100 border input py-2 px-3 text-muted rounded-2" onChange={ handleInputs } />
                    <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                  </div>
                  <div className="d-flex gap-2 mb-3" >
                    <select className="w-100 border py-2 px-3 text-muted rounded-2" name='operator' onChange={ handleInputs }>
                      <option value="" > Choisir un opérateur </option>
                      <option value="Wave" > Wave </option>
                    </select>  
                    <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-danger"> * </span> 
                  </div>
                  <div className="d-flex gap-2 mb-4" >
                    <input type="number" name="amount" value={ inputs?.amount } placeholder="Montant" className="w-100 border input py-2 px-3 text-muted rounded-2" />
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
                          Commande payée avec succes.
                        </div>
                      </div>
                    )
                  } 
                  <button type="submit" className="bg-green-light text-secondary d-flex justify-content-center align-items-center border py-2 px-3 mb-2"> 
                    Payer maintenant <i className="bi bi-arrow-right ms-2"></i> 
                  </button> 
                </form> 
              </div>

            </div>
          </div>
        </div>
      </div>
      
    )
}
