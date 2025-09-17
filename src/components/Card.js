import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ImageContainer } from "./ImageContainer";
import { ProductApi } from "../api-services/product.api";
import { UserApi } from "../api-services/user.api";
import { useQuery } from "@tanstack/react-query";
import { NewsApi } from "../api-services/news.api";
import { SessionApi } from "../api-services/session.api";



export function NewsCard({ likerListHandler, data, refetch })
{
  const news = NewsApi();   
    
  const likeHandle = async ()=> {
    try {
      await news.like( data?.id );
      refetch();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="card border mb-4 pt-4 pb-3">
      {/* **************** Header ***************** */}
      <Profile data={ data.owner } />
      {/* ***************** Text **************** */}
      <div className="px-3 text-muted">
        <TextExpandable text={ data?.desc } wordLimit={20} />
      </div>
      {/* ***************** Image ****************** */}
      <ImageContainer images={data.images} />
      {/* ***************** Actions *****************************/}
      <div className="card-footer bg-white d-flex justify-content-between border-0 pt-4">
        <div className="d-flex align-items-center">
          <i className="bi bi-heart-fill text-success me-2 cursor" onClick={ ()=> likerListHandler(data) } ></i>
          <small className="text-secondary"> { data?.like } </small>
        </div>
        <div>
          <button className="btn btn-sm  border text-muted me-2" onClick={ likeHandle }>
            <i className="bi bi-heart text-success"></i> J’aime
          </button>
        </div>
      </div>
    </div>
  );
};


export function ProductCard({ orderHandler, likerListHandler, data, refetch })
{

  const product = ProductApi();   
  
  const likeHandle = async ()=> {
    try {
      await product.like( data?.id );
      refetch();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="card border mb-4 pt-4 pb-3">
      {/* **************** Header ***************** */}
      <Profile data={ data.owner } />
      {/* ***************** Text **************** */}
      <div className="px-3 text-muted">
        <TextExpandable text={ data?.description } wordLimit={20} />
      </div>
      <div className="row"> 
        <div className="col-sm-5"> 
          <div className="d-flex align-items-center px-3 mb-3"> 
            <span className="text-secondary small border px-2 py-1"> Stock </span>
            <span className="text-secondary small border-end border-top border-bottom px-3 py-1"> { data?.stock } </span>
            <span className="text-secondary small border-end border-top border-bottom px-2 py-1"> { data?.unit} </span>
          </div>
        </div>
        <div className="col-sm-7"> 
          <div className="d-flex align-items-center px-3 mb-3"> 
            <span className="text-secondary small border px-2 py-1"> Prix unitaire </span>
            <span className="text-secondary small border-end border-top border-bottom px-3 py-1"> { data?.unitPrice } </span>
            <span className="text-secondary small border-end border-top border-bottom px-2 py-1"> Fcfa </span>
          </div>
        </div>
      </div>
      {/* ***************** Image ****************** */}
      <ImageContainer images={data.images} />
      {/* ***************** Actions *****************************/}
      <div className="card-footer bg-white d-flex justify-content-between border-0 pt-4">
        <div className="d-flex align-items-center">
          <i className="bi bi-heart-fill text-success me-2 cursor" onClick={ ()=> likerListHandler(data) } ></i>
          <small className="text-secondary"> { data?.likes } </small>
        </div>
        <div>
          <button className="btn btn-sm  border text-muted me-2" onClick={ likeHandle } >
            <i className="bi bi-heart text-success"></i> J’aime
          </button>
          <button className="btn btn-sm border text-muted me-2" onClick={ ()=> orderHandler(data) } >
            <i className="bi bi-cart"></i> Commander
          </button>
        </div>
      </div>
    </div>
  );
};


export function DiscussionCard({ likerListHandler, data, refetch })
{

  const session = SessionApi();   
    
  const likeHandle = async ()=> {
    try {
      await session.like( data?.id );
      refetch();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="card border mb-4 pt-4 pb-3">
      {/* **************** Header ***************** */}
      <Profile data={ data.owner } />
      {/* ***************** Text **************** */}
      <div className="d-flex flex-column px-3 pt-3 bg-green-light">
        <div className="d-flex align-items-center mb-3">
          <span className="fw-bold text-secondary me-4"> Theme : </span>
          {
            data?.status === 'open' ? ( 
              <span className="text-success"> <i className="bi bi-check-circle me-1" ></i> { data?.status } </span> 
            ) : (
              <span className="text-danger"> <i className="bi bi-slash-circle-fill me-1" ></i> { data?.status } </span> 
            )
          }
        </div>
        
        <TextExpandable text={ data?.desc } wordLimit={20} />
      </div>

      {/* ***************** Actions *****************************/}
      <div className="card-footer bg-white d-flex justify-content-between border-0 pt-4">
        <div className="d-flex align-items-center">
          <i className="bi bi-heart-fill text-success me-2 cursor" onClick={ ()=> likerListHandler(data) } ></i>
          <small className="text-secondary">{ data?.like }</small>
        </div>
        <div>
          <button className="btn btn-sm border text-muted me-2" onClick={ likeHandle }>
            <i className="bi bi-heart text-success"></i> J’aime
          </button>
          <a href={`/chat-session/${data?.id}`} className="btn btn-sm border text-muted" >
            <i className="bi bi-chat-dots"></i> Participer
          </a>
        </div>
      </div>
    </div>
  );
};



export function ProfileCard({color}) 
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
  const { data } = useQuery({  queryKey: ["user"], queryFn: fetchData });

  return (

    <div className="card border rounded-3 mb-4">
      <div className={color}  style={{ height: "80px", overflow: "hidden" }}></div>
      <div className="card-body text-center position-relative">
        {/* Profile picture */}
        <div className="bg-green-light text-success border border-success rounded-circle rounded-circle border position-absolute fw-bold d-flex align-items-center justify-content-center" style={{ width:60, height:60, top: "-37px", left: "50%", transform: "translateX(-50%)"}}>
         {data?.fname ? data.fname.charAt(0).toUpperCase() : ""}{data?.lname ? data.lname.charAt(0).toUpperCase() : ""}
        </div>
        <div style={{ height: "40px" }}></div>
        <h5 className="fw-bold text-secondary mb-1"> { data?.fname + ' ' + data?.lname } </h5>
        <p className="mb-1 text-muted"> { data?.occupation } </p>
        <p className="text-secondary small"> { data?.sex } </p>
     
        <div className="d-flex justify-content-center" >
           <a href="/mon-compte" className="btn btn-outline-secondary mb-3 aligns-self-center d-flex align-items-center justify-content-center">
             <i className="bi bi-plus-lg me-2"></i> Mon compte
           </a>
        </div>
      </div>
    </div>
  );
}




function Profile({data}) 
{
  return (
  
    <div className="card-header bg-white d-flex align-items-center border-0 mb-2">
        <div className="me-2">
            <div className="border bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold small" style={{ width:40, height:40}}>
              {data?.fname ? data.fname.charAt(0).toUpperCase() : ""}{data?.lname ? data.lname.charAt(0).toUpperCase() : ""}
            </div>
        </div>
        <div>
            <div className="fw-bold text-secondary small"> { data?.fname + ' ' + data?.lname } </div>
            <div className="text-secondary small"> { data?.role ? data?.role : "profession de l'utilisateur" } </div>
        </div>    
        <span className="d-flex align-items-center justify-content-center ms-auto border bg-green-light rounded-circle" style={{ width:30, height:30}}>
          <i className="bi bi-cart text-success small"></i>
        </span>
    </div>
  );
}


export function CurrentUserOrderCard({ onClick, data, cancel})
{

  return (
    <div className="card border mb-4">
      {/* ***************** Text **************** */}
      <div className="d-flex flex-column px-3 py-2 text-muted bg-light border-bottom rounded-2">
        <span className="text-muted mb-1"> <i className="bi bi-plus-circle me-2"></i> Source du post </span>
        <span className="text-secondary">
          <TextReducer text={ data?.product?.description } maxsize={85} />
          <a href={'/product/'+data?.product?.id } className="btn btn-sm text-muted mx-2" title="Voir plus">
            <i className="bi bi-arrow-right"></i> 
          </a>
        </span>
      </div>
      {/* ***************** Table *****************************/}
      <div className="bg-white border-0 py-3 px-4 border-bottom">
        <div className="row">
          <div className="col-3 p-2 text-secondary border small"> Produit</div> 
          <div className="col-3 p-2 text-secondary border-top border-bottom border-end small"> Unité </div>
          <div className="col-3 p-2 text-secondary border-top border-bottom border-end small"> Prix unitaire </div>
          <div className="col-3 p-2 text-secondary border-top border-bottom border-end small"> Quantité </div>
        </div>
        <div className="row">
          <div className="col-3 p-2 text-secondary border-start border-bottom border-end small"> { data?.product?.name } </div> 
          <div className="col-3 p-2 text-secondary border-bottom border-end small"> { data?.product?.unit } </div>
          <div className="col-3 p-2 text-secondary border-bottom border-end small"> { data?.product?.unitPrice } Fcfa </div>
          <div className="col-3 p-2 text-secondary border-bottom border-end small"> { data?.quantity } </div>
        </div>
      </div>
      {/* ***************** Actions *****************************/}
      <div className="card-footer bg-white d-flex align-items-center border-0 p-3">
        <div className="d-flex align-items-center"> 
          <span className="text-muted small border p-2 bg-light"> Prix total </span>
          <span className="text-muted small border-end border-top border-bottom py-2 px-3 bg-light"> { data?.totalPrice } </span>
          <span className="text-muted small border-end border-top border-bottom p-2 bg-light"> Fcfa </span>
        </div>
      </div>
      {/* ***************** Actions *****************************/}
      {
        ( data?.status === 'paid' ) ? 
        ( <span className="text-success small border-end border-top border-bottom py-2 px-3 bg-green-light"> Payé </span> ) :
        (
          <div className="card-footer bg-white d-flex justify-content-between align-items-center border-0 p-3">
            <button className="btn btn-sm btn-outline-danger px-2" onClick={ cancel }>
             <i className="bi bi-x-circle me-1"></i> Annuler
            </button>
            <button className="btn btn-sm btn-outline-secondary px-2" onClick={onClick}>
              Payer la commande <i className="bi bi-arrow-right"></i> 
            </button>
          </div>
        )
      }
    </div>
  );
};



export function ExternOrderCard({data})
{
  return (
    <div className="card border mb-4">
      <div className="d-flex align-items-center p-3">
        <div className="me-2">
          <div className="border bg-success text-white rounded-circle d-flex align-items-center justify-content-center fw-bold small" style={{ width:40, height:40}}>
            { data?.owner.fname.charAt(0).toUpperCase() }{ data?.owner.lname.charAt(0).toUpperCase() }
          </div>
        </div>
        <div>
          <div className="fw-bold text-secondary small"> { data?.owner.fname + ' ' + data?.owner.lname } </div>
          <div className="text-secondary small"> tel : { data?.owner.phone } </div>
        </div>
      </div>
      {/* ***************** Text **************** */}
      <div className="d-flex flex-column px-3 py-2 text-muted bg-light border-top border-bottom rounded-2">
        <span className="text-muted mb-1"> <i className="bi bi-plus-circle me-2"></i> Source du post </span>
        <span className="text-secondary">
          <TextReducer text={ data?.product.desc } maxsize={85} />
          <a href={'/product/'+data?.product.id } className="btn btn-sm text-muted mx-2" title="Voir plus">
            <i className="bi bi-arrow-right"></i> 
          </a>
        </span>
      </div>
      {/* ***************** Table *****************************/}
      <div className="bg-white border-0 py-3 px-4 border-bottom">
        <div className="row">
          <div className="col-3 p-2 text-secondary border small"> Produit</div> 
          <div className="col-3 p-2 text-secondary border-top border-bottom border-end small"> Unité </div>
          <div className="col-3 p-2 text-secondary border-top border-bottom border-end small"> Prix unitaire </div>
          <div className="col-3 p-2 text-secondary border-top border-bottom border-end small"> Quantité </div>
        </div>
        <div className="row">
          <div className="col-3 p-2 text-secondary border-start border-bottom border-end small"> { data?.product.name } </div> 
          <div className="col-3 p-2 text-secondary border-bottom border-end small"> { data?.product.unit } </div>
          <div className="col-3 p-2 text-secondary border-bottom border-end small"> { data?.product.unitPrice } Fcfa </div>
          <div className="col-3 p-2 text-secondary border-bottom border-end small"> { data?.quantity } </div>
        </div>
      </div>
      {/* ***************** Actions *****************************/}
      <div className="card-footer bg-white d-flex justify-content-between align-items-center border-0 p-3">
        <div className="d-flex align-items-center"> 
          <span className="text-muted small border p-2"> Prix total </span>
          <span className="text-muted small border-end border-top border-bottom py-2 px-3 bg-light"> { data?.totalPrice } </span>
          <span className="text-muted small border-end border-top border-bottom p-2"> Fcfa </span>
          {
              ( data?.status === 'paid' ) ? 
              ( <span className="text-success small border-end border-top border-bottom py-2 px-3 bg-green-light"> Payé </span> ) :
              ( <span className="text-success small border-end border-top border-bottom py-2 px-3 bg-green-light"> à traiter... </span> )
          }
        </div>
      </div>
    </div>
  );
};





export function TextExpandable ({ text, wordLimit }) 
{
  const [isExpanded, setIsExpanded] = useState(false);

  const words = text.split(' ');
  const isTooLong = words.length > wordLimit;

  const displayText = isTooLong && !isExpanded
    ? words.slice(0, wordLimit).join(' ') + '...'
    : text;

  return (
    
    <p>
        {displayText}
          <button className="btn btn-sm text-muted mx-2" title={`${isExpanded ? 'Réduir' : 'Voir plus'}`} onClick={() => setIsExpanded(!isExpanded)}>
          <i className={`bi ${isExpanded ? 'bi-arrow-left' : 'bi-arrow-right'}`} ></i>
          </button>
    </p>

  );

};




export function TextReducer({text, maxsize}) 
{
    if ( text?.length <= maxsize )
     return ( <span > { text }  </span> )
    else{
        const reducer = text?.slice(0, maxsize) + '...';
        return ( <span > { reducer }  </span> )
    }
}
