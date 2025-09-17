import React from "react";
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import { Error } from "./views/Error";
import MarketPlace from "./views/MarketPlace";
import Discussions from "./views/Discussion";
import News from "./views/News";
import Template from "./components/Template";
import Unews from "./views/my-account/Unews";
import Uproduct from "./views/my-account/Uproducts";
import Udiscussion from "./views/my-account/Usession";
import Account from "./views/Account";
import { ChatSession } from "./views/ChatSession";
import MyOrder from "./views/orders/MyOrder";
import ExternalOrder from "./views/orders/ExternalOrder";
import OneProduct from "./views/OneProduct";
import WithdrawHistoric from "./views/WithdrawHistoric";
import DiscussionHistoric from "./views/DiscussionHistoric";

import ProtectedRoute from "./route/ProtectedRoute";

function App() {

  return (

     <BrowserRouter>
      <Routes>
        {/* Toutes les routes protégées */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<News />} />
          <Route path="/marche-virtuel" element={<MarketPlace />} />
          <Route path="/product/:id" element={<OneProduct />} />
          <Route path="/discussion" element={<Discussions />} />
          <Route path="/mon-compte" element={<Account />} />
          <Route path="/panel-nouvelle" element={<Unews />} />
          <Route path="/panel-produit" element={<Uproduct />} />
          <Route path="/panel-session" element={<Udiscussion />} />
          <Route path="/chat-session/:sessionId" element={<ChatSession />} />
          <Route path="/commande" element={<MyOrder />} />
          <Route path="/commande-externe" element={<ExternalOrder />} />
          <Route path="/historique-retraits" element={<WithdrawHistoric />} />
          <Route path="/historique-session" element={<DiscussionHistoric />} />
        </Route>

        {/* Page 404 accessible même sans token */}
        <Route path="/404" element={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>

     
  );
}

export default App;
