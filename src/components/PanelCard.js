import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ImageContainer } from "./ImageContainer";
import { TextExpandable } from "./Card";
import { ProductApi } from "../api-services/product.api";
import { NewsApi } from "../api-services/news.api";
import { SessionApi } from "../api-services/session.api";


export function UnewsCard({ update, remove, data, likerListHandler, refetch })
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
    <div className="card border mb-4">
      {/* **************** Header ***************** */}
      <div className="card-header bg-white d-flex border-0 p-3 border-bottom mb-3">
        <button className="btn btn-sm border text-secondary me-2 px-2" onClick={update} >
          <i className="bi bi-pencil-square me-1"></i> Modifier
        </button>
        <button className="btn btn-sm border text-secondary px-2" onClick={remove} >
          <i className="bi bi-trash me-1"></i> Suprimer
        </button>  
      </div>

      {/* ***************** Text **************** */}
      <div className="px-3 text-muted">
        <TextExpandable text={ data?.desc } wordLimit={20} />
      </div>
      {/* ***************** Image ****************** */}
       <ImageContainer images={data.images} />

      {/* ***************** Actions *****************************/}
      <div className="card-footer bg-white d-flex justify-content-between border-0 p-3">
        <div className="d-flex align-items-center">
          <i className="bi bi-heart-fill text-success me-2 cursor" onClick={ ()=> likerListHandler(data) }></i>
          <small className="text-secondary">{ data?.like }</small>
        </div>
        <div>
          <button className="btn btn-sm  border text-muted me-2" onClick={ likeHandle } >
            <i className="bi bi-heart text-success"></i> J’aime
          </button>
        </div>
      </div>
    </div>
  );
};


export function UproductCard({ update, remove, data, likerListHandler, refetch })
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

    <div className="card border mb-4">
      {/* **************** Header ***************** */}
      <div className="card-header bg-white d-flex border-0 p-3 border-bottom mb-3">
        <button className="btn btn-sm border text-secondary me-2 px-2" onClick={update} >
          <i className="bi bi-pencil-square me-1"></i> Modifier
        </button>
        <button className="btn btn-sm border text-secondary px-2" onClick={remove} >
          <i className="bi bi-trash me-1"></i> Suprimer
        </button>  
      </div>
      {/* ***************** Text **************** */}
      <div className="px-3 text-muted">
        <TextExpandable text={ data?.desc } wordLimit={20} />
      </div>
      <div className="row"> 
        <div className="col-sm-4"> 
          <div className="d-flex align-items-center px-3 mb-3"> 
            <span className="text-secondary small border px-2 py-1"> Stock </span>
            <span className="text-secondary small border-end border-top border-bottom px-3 py-1"> { data?.stock } </span>
            <span className="text-secondary small border-end border-top border-bottom px-2 py-1"> { data?.unit} </span>
          </div>
        </div>
        <div className="col-sm-8"> 
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
          <small className="text-secondary"> { data?.like } </small>
        </div>
        <div>
          <button className="btn btn-sm  border text-muted me-2"  onClick={ likeHandle }>
            <i className="bi bi-heart text-success"></i> J’aime
          </button>
        </div>
      </div>
    </div>

  );
};


export function UdiscussionCard({ update, remove, data, likerListHandler, refetch })
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
    
    <div className="card border mb-4">
      {/* **************** Header ***************** */}
      <div className="card-header bg-white d-flex border-0 p-3 border-bottom">
        <button className="btn btn-sm border text-secondary me-2 px-2" onClick={update} >
          <i className="bi bi-pencil-square me-1"></i> Modifier
        </button>
        <button className="btn btn-sm border text-secondary px-2" onClick={remove} >
          <i className="bi bi-trash me-1"></i> Suprimer
        </button>  
      </div>
      {/* ***************** Text **************** */}
      <div className="d-flex flex-column px-3 pt-3 text-muted bg-green-light">
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
      <div className="card-footer bg-white d-flex justify-content-between border-0 p-4">
        <div className="d-flex align-items-center">
          <i className="bi bi-heart-fill text-success me-2 cursor" onClick={ ()=> likerListHandler(data) }></i>
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

