import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { DiscussionCard,  ProfileCard } from "../components/Card";
import { useQuery } from "@tanstack/react-query";
import { SessionApi } from "../api-services/session.api";
import { SessionLikerListModal } from "../components/Modal";


export default function DiscussionHistoric() 
{

  const session = SessionApi();

  const [date, setDate] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await session.findHistoric();
      return res.data.data || [];
    } catch (err) {
      console.log("Erreur lors de la récupération des produits : " + err.message);
      return [];
    }
  };
  const { isLoading, data, error, refetch } = useQuery({  queryKey: ["allSessions"], queryFn: fetchData });

  useEffect(() => { if (Array.isArray(data)) { setFilteredData(data) } }, [data]);
                    
  const handleInputChange = (e) => {
      const value = e.target.value;
      setDate(value);
      const filtered = data.filter( (item) => item.createdAt.toLowerCase().startsWith(value.toLowerCase()) );
      setFilteredData(filtered);
  };

  
  const [curItem, setCurItem] = useState();
  const [isLikerModalVisible, setIsLikerModalVisible] = useState(false);
    
  const likerListHandler = (item) => {
    setCurItem(item)
    setIsLikerModalVisible(true)
  } 
 
  return (
    <div className="bg-light min-vh-100">
      {/* Header's section */}
      <Header page={3} />
      {
        isLikerModalVisible && (  <SessionLikerListModal meta={curItem} close={ ()=> setIsLikerModalVisible(false) }  /> )
      }
      {/* Service's section */}
      <div className="container pb-5 pt-4">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-6 col-md-9">
            
            <div className="row sticky-top pt-4 mb-4">
              <div className="col-lg-12 border bg-white text-secondary rounded-top-3 mb-2">
                <div className="d-flex align-items-center px-4 py-3 text-secondary border-bottom mb-3">
                  <i className="bi bi-clock-history me-2"></i> Historique des sessions de discussion consultées  
                </div>
                <div className="d-flex gap-2 mb-3 px-3" >
                  <span className="d-flex align-items-center border py-2 px-3 rounded-2 text-secondary">  
                    <i className="bi bi-funnel me-2"></i> Filtre
                  </span>
                  <input type="date" name="date" value={date} className="w-100 border px-3 py-2 text-muted rounded-2" onChange={ handleInputChange }/>       
                </div>  
              </div>
            </div>


            <div className="row"> 
              {/* Main content: on lg it’s left, on md it goes after */}
              <div className="col-lg-12 rounded-3 order-md-2 order-lg-1"> 
                { isLoading ? (
                    <div className="col-md-12 d-flex justify-content-center mt-3"> <div className="spinner-border text-success fs-1" role="status" aria-label="Chargement"></div> </div>
                  ) : (
                    filteredData.length > 0 ? (
                      filteredData.map((item, index) => (
                        <DiscussionCard likerListHandler={likerListHandler} data={item} key={index} refetch={refetch} />
                      ))
                    ) : (
                      <div className="d-flex px-4 mt-3 w-100 py-3 border shadow-sm bg-white text-muted">
                        La liste de nouvelles est vide.
                      </div>
                    )
                  )}
                { error && (
                    <div className="col-md-12 mt-3">
                      <div className="border alert alert-danger text-muted px-4 py-3"> Une erreur est survenue lors du traitement. Veuillez vérifier votre connexion </div>
                    </div>
                  )
                }
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
