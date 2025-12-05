import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import LoginRedirectModal from "../components/LoginRedirectModal";

export default function ProtectedRoute() 
{
  const { user, loading } = useAuth();
  const [showModal, setShowModal] = useState(false);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center vh-100"> 
        <div className="spinner-border text-success fs-1"></div> 
      </div>
    );
  }

  if (!user) {
    setTimeout(() => setShowModal(true), 0); // Show modal after render
    return <LoginRedirectModal show={showModal} onClose={() => setShowModal(false)} />;
  }

  return <Outlet />;
}
