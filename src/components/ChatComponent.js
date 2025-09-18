import React, { useEffect, useState } from "react"
import { DiscussionApi } from "../api-services/discussion.api";
import { useQuery } from "@tanstack/react-query";
import { TextReducer } from "./Card";


export function ParticipantBar({sessionId})
{
    const discussion = DiscussionApi();

    const [name, setName] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const fetchData = async () => {
      try {
        const res = await discussion.findAllParticipants(sessionId);
        // console.log(res.data);
        return res.data.data || [];
      } catch (err) {
        console.log("Erreur lors de la récupération des produits : " + err.message);
        return [];
      }
    };
    const { isLoading, data, error } = useQuery({  queryKey: ["allParticipants"], queryFn: fetchData });

    useEffect(() => { if (Array.isArray(data)) { setFilteredData(data) } }, [data]);
                    
    const handleInputChange = (e) => {
        const value = e.target.value;
        setName(value);
        const filtered = data.filter( (item) => item.fname.toLowerCase().startsWith(value.toLowerCase()) );
        setFilteredData(filtered);
    };

    return (

      <div className="flex flex-column">
        <div className="pt-2 pb-4 border-bottom">
          <input type="search" className="border p-3 w-100 rounded-2 text-muted" value={ name } placeholder="Recherche prénom" onChange={ handleInputChange } />
        </div>
        <ul className="list-unstyled chat-list scroll-60">
          { 
            isLoading ? (
                <div className="col-md-12 d-flex justify-content-center mt-3"> <div className="spinner-border text-success fs-1" role="status" aria-label="Chargement"></div> </div>
            ) : (
                filteredData.length > 0 ? (
                    filteredData.map((item, index) => (

                      <li className="chat-item d-flex align-items-center p-2 border-bottom" key={index}>
                        <div className="border bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold small me-2" style={{ width:40, height:40}}>
                          { item?.fname.charAt(0).toUpperCase() }{ item?.lname.charAt(0).toUpperCase() }
                        </div>
                         <div>
                          <span className="text-dark"> { item?.fname + ' ' + item?.lname } </span>
                          <p className="mb-0 text-secondary small"> { item?.occupation } </p>
                        </div>
                        {/* <span className="ms-auto bg-success rounded-circle" style={{ width:'10px', height:'10px' }} ></span> */}
                      </li>
                    ))
                  ) : (
                    <div className="d-flex px-4 mt-3 w-100 py-3 border bg-white text-muted">
                      La liste des participants est vide.
                    </div>
                  )
                )}
          {
            error && (
                  <div className="col-md-12 mt-3">
                    <div className="border alert alert-danger text-muted px-4 py-3"> Une erreur est survenue lors du traitement. Veuillez vérifier votre connexion </div>
                  </div>
                )
          }
          </ul>
      </div>
    )
}



export function MessageBox({ design, data, setReply, remove })
{

    const uid = localStorage.getItem('uid');

    return (

      <div className="col-11 d-flex justify-content-end mb-4">
        <div className={`d-flex flex-column border rounded-3 p-3 chat-bubble ${design}`} >
          <div className="d-flex align-items-center justify-content-between mb-2 gap-5 border-bottom pb-2">
            <small className="text-success"> { data?.author?.fname + ' ' + data?.author?.lname } </small>
            <div className="d-flex text-secondary">
              <i className="bi bi-reply cursor me-3" onClick={ ()=> setReply(data)  } ></i>
              {
                data?.userId === parseInt(uid) && ( <i className="bi bi-x-circle cursor" onClick={ ()=> remove(data) } ></i> )
              }
            </div>
          </div>
          {
            data?.parent && (
              <div className="d-flex mb-3 bg-dark-light flex-column px-3 py-2 rounded-3">
                <small className="text-success mb-1"> { data?.parent?.author?.fname + ' ' + data?.parent?.author?.lname } </small>
                <span className="text-secondary"> <TextReducer text={ data?.parent?.message } maxsize={35} /> </span>
              </div>
            )
          }
          {
            data?.image && ( <img src={`${data?.image}`} className="img-fluid border mb-3 rounded-3" alt="my-image" /> )
          }
          <p className="text-secondary"> { data?.message } </p>
          <small className="text-secondary fs-xs"> { data?.createdAt } </small>
        </div>
      </div>

    )
}




export function OverlaySidebar({ sessionId })
{
  
  const discussion = DiscussionApi();

  const [name, setName] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
      try {
        const res = await discussion.findAllParticipants(sessionId);
        // console.log(res.data);
        return res.data.data || [];
      } catch (err) {
        console.log("Erreur lors de la récupération des produits : " + err.message);
        return [];
      }
    };
  const { isLoading, data, error } = useQuery({  queryKey: ["allParticipants"], queryFn: fetchData });

  useEffect(() => { if (Array.isArray(data)) { setFilteredData(data) } }, [data]);
                    
  const handleInputChange = (e) => {
      const value = e.target.value;
      setName(value);
      const filtered = data.filter( (item) => item.fname.toLowerCase().startsWith(value.toLowerCase()) );
      setFilteredData(filtered);
  };


  return(
        
      <div className="offcanvas offcanvas-start index-max" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        
        <div className="offcanvas-header">
          <p className="offcanvas-title fs-4 p-3 w-100" id="offcanvasExampleLabel"> AgriTeam </p>
          <button type="button" className="btn btn-sm text-reset" data-bs-dismiss="offcanvas" aria-label="Close">
            <i className="bi bi-x fs-2 text-secondary"></i>
          </button>
        </div>

        <div className="offcanvas-body border-top">
           <div className="flex flex-column">
        <div className="pt-2 pb-4 border-bottom">
          <input type="search" className="border p-3 w-100 rounded-2 text-muted" value={name} placeholder="Recherche prénom" onChange={ handleInputChange } />
        </div>
        <ul className="list-unstyled chat-list scroll-60">
          { 
            isLoading ? (
                <div className="col-md-12 d-flex justify-content-center mt-3"> <div className="spinner-border text-success fs-1" role="status" aria-label="Chargement"></div> </div>
            ) : (
                filteredData.length > 0 ? (
                    filteredData.map((item, index) => (

                      <li className="chat-item d-flex align-items-center p-2 border-bottom" key={index}>
                        <div className="border bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold small me-2" style={{ width:40, height:40}}>
                          { item?.fname.charAt(0).toUpperCase() }{ item?.lname.charAt(0).toUpperCase() }
                        </div>
                         <div>
                          <span className="text-dark"> { item?.fname + ' ' + item?.lname } </span>
                          <p className="mb-0 text-secondary small"> { item?.occupation } </p>
                        </div>
                        {/* <span className="ms-auto bg-success rounded-circle" style={{ width:'10px', height:'10px' }} ></span> */}
                      </li>
                    ))
                  ) : (
                    <div className="d-flex px-4 mt-3 w-100 py-3 border bg-white text-muted">
                      La liste des participants est vide.
                    </div>
                  )
                )}
          {
            error && (
                  <div className="col-md-12 mt-3">
                    <div className="border alert alert-danger text-muted px-4 py-3"> Une erreur est survenue lors du traitement. Veuillez vérifier votre connexion </div>
                  </div>
                )
          }
          </ul>
      </div>
        </div>

      </div>
    )
}
