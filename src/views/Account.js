import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Template from "../components/Template";

export default function Account() 
{

  return (
    <Template page={1} >

      <div className="col-lg-12 mb-4">   
        <div className="border bg-white text-secondary rounded-3">
          <div className="d-flex align-items-center border-bottom px-4 py-3 text-secondary">
            <i className="bi bi-info-circle me-2"></i> Note d'information  
          </div>   
          <div className="d-flex flex-column p-3">
            {/* ********************************** */}
            <div className="d-flex px-4 py-3 text-secondary">
              <i className="bi bi-plus-circle me-2"></i>
              <div className="px-2 border-start text-secondary border-4">
                  Mettez en valeur vos produits sur notre marché virtuel ! Qu’il s’agisse de récoltes, d’intrants, de produits phytosanitaires, d’équipements agricoles ou encore de services et d’expertises, vous trouverez une vitrine idéale pour toucher vos futurs partenaires et clients.
              </div> 
            </div> 
            {/* *********************************** */}
            <div className="d-flex px-4 py-3 text-secondary">
              <i className="bi bi-plus-circle me-2"></i>
              <div className="px-2 border-start text-secondary border-4">
                  Pour votre sécurité, effectuez toujours vos paiements via la plateforme. Les commandes payées en dehors de notre système ne bénéficient d’aucune garantie : en cas d’arnaque, la responsabilité de la plateforme ne pourra être engagée.
              </div> 
            </div> 
            {/* *********************************** */}
            <div className="d-flex px-4 py-3 text-secondary">
              <i className="bi bi-plus-circle me-2"></i>
              <div className="px-2 border-start text-secondary border-4">
                  Créez vos sessions de discussion et profitez de 10 jours pour échanger avec la communauté ! Ces espaces sont conçus spécialement pour partager vos idées, poser vos questions et débattre autour des thèmes du secteur agricole.
              </div> 
            </div> 
            {/* *********************************** */}
            <div className="d-flex px-4 py-3 text-secondary">
              <i className="bi bi-plus-circle me-2"></i>
              <div className="px-2 border-start text-secondary border-4">
                  Restez informé grâce aux nouvelles ! Retrouvez des alertes, des opportunités de marché, des communiqués et bien d’autres informations essentielles pour les acteurs du secteur agricole.
              </div> 
            </div> 
            {/* *********************************** */}
          </div> 
        </div>
      </div>   

      {/* <div className="col-lg-12 mb-4">   
        <div className="border bg-white text-secondary rounded-3 mb-4">
          <div className="d-flex align-items-center border-bottom px-4 py-3 text-secondary">
            <i class="bi bi bi-bell me-2"></i> Boite de notification
          </div>   
          <div className="d-flex flex-column px-3 py-4">
            <div className="d-flex">
              <a href="/notification" className="link text-muted bg-green-light text-secondary d-flex justify-content-center align-items-center border py-2 px-3 "> 
                Voir notification <i class="bi bi-arrow-right ms-2"></i> 
              </a> 
            </div>
          </div> 
        </div>
      </div>         */}

    </Template>
  );
}
