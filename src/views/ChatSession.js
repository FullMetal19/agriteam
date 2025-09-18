import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { MessageBox, OverlaySidebar, ParticipantBar } from "../components/ChatComponent";
import ChatSender from "../components/ChatSender";
import { useParams } from "react-router";
import { DiscussionApi } from "../api-services/discussion.api";
import { useQuery } from "@tanstack/react-query";
import { ChatDeleteModal } from "../components/ChatModal";
import { SessionApi } from "../api-services/session.api";


export function ChatSession() 
{
  
  const { sessionId } = useParams();

  const discussion = DiscussionApi();
    const fetchData = async () => {
      try {
        const res = await discussion.findAll(sessionId);
        return res.data.data || [];
      } catch (err) {
        console.log("Erreur lors de la récupération des produits : " + err.message);
        return [];
      }
    };
  const { isLoading, data, error, refetch } = useQuery({  queryKey: ["allMessages"], queryFn: fetchData });


  const sendMessage = async (msg) => {};

  const [replyData, setReplyData] = useState(false);
  
  const uid = localStorage.getItem('uid');


  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [curItem, setCurItem] = useState({});
  
  const setRemove = (data)=> {
    setCurItem(data)
    setShowDeleteModal(true)
  }

  const setReply = (data)=> {
    setCurItem(data)
    setReplyData(true)
  }


  const [state, setState] = useState(false);
  

 
  return (
    <div className="bg-light min-vh-100">
      {
        showDeleteModal &&  <ChatDeleteModal close={ ()=> setShowDeleteModal(false) } data={curItem} refetch={refetch} />
      }

      <OverlaySidebar state={state} sessionId={sessionId}  />

      {/* Header's section */}
      <Header page={3} />

      {/* Service's section */}
      <div className="container-md py-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-11">
            <div className="row d-flex justify-content-between">

              {/* Sidebar: on lg it’s right, but on md it goes first */}
              <div className="col-lg-4 col-md-0 mb-4"> 
                <div className="d-flex flex-column bg-white border rounded-2 sticky-top">
                  <div className=" d-flex justify-content-between align-items-center bg-green-light px-4 py-3 rounded-top-2">
                    <span className="lead text-secondary"> Participants </span> 
                    <button className="btn btn-sm visible" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" >
                      <i className="bi bi-list lead fs-4 text-success"></i>
                    </button>
                  </div>
                  <div className="p-4 inVisible">
                    <ParticipantBar sessionId={sessionId} />
                  </div>
                </div>
              </div>

              {/* Main content: on lg it’s left, on md it goes after */}
              <div className="col-lg-8 col-md-12 border bg-green-light rounded-top-2"> 
                {/* ******************************************** */}
                <div className="row d-flex justify-content-end bg-white rounded-bottom-4 rounded-top-2 py-5 px-4">
                  { 
                    isLoading ? (
                        <div className="col-md-12 d-flex justify-content-center mt-3"> <div className="spinner-border text-success fs-1" role="status" aria-label="Chargement"></div> </div>
                    ) : (
                    data.length > 0 ? (
                        data.map((item, index) => (

                         <MessageBox data={item} design={ item?.userId === parseInt(uid) ? 'bg-green-light' : 'bg-light' } setReply={ setReply }  remove={setRemove} key={index} />

                        ))
                      ) : (
                        <div className="d-flex p-4 mt-3 w-100 border bg-white text-muted">
                          Discussion vide, en attente de message.
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

                </div>
                {/* ******************************************** */}
                <Checker sessionId={sessionId} onSend={sendMessage} replyData={ replyData } parentMessage={curItem} closeReplyBox={ ()=> setReplyData(false) } refetch={refetch} />
  
              </div>
            </div>

        </div>
        </div>
      </div>

      {/* Footer's section */}
      <Footer />
      
  </div>
  );
}



function Checker ({ sessionId, replyData, parentMessage, closeReplyBox, refetch })
{

  const session = SessionApi();
    const fetchData = async () => {
      try {
        const res = await session.findOne(sessionId);
        // console.log(res.data);
        return res.data.data || [];
      } catch (err) {
        console.log("Erreur lors de la récupération des produits : " + err.message);
        return [];
      }
    };
  const { isLoading, data } = useQuery({  queryKey: ["session"], queryFn: fetchData });

  return (

     <div className="row pb-5 sticky-bottom">

      {
        isLoading ? ( 
                <div className="spinner-border text-success" role="status" aria-label="Chargement"></div> 
         ) : (
          data ? (
            <div className="col-lg-12 d-flex justify-content-center">
            {
                data?.status === 'open' ? ( 
                    <ChatSender sessionId={sessionId}  replyData={ replyData } parentMessage={parentMessage} closeReplyBox={ closeReplyBox } refetch={refetch} />
                ) : (
                    <div className="d-flex justify-content-center px-4 py-3 mt-3 w-100 border rounded-2 text-danger lead"> <i class="bi bi-slash-circle-fill me-3"></i> Cette session de discussion est close. </div>
                )
            }
            </div>
          ) : null 
         )
      }
        
      </div>

  )
}