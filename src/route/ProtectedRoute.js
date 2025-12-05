import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute() 
{
  const { user, loading } = useAuth();

  if (loading) {
     return (
      <div className="d-flex align-items-center justify-content-center vh-100"> 
        <div className="spinner-border text-success fs-1" role="status" aria-label="Chargement"></div> 
      </div>
     );
  }

  // If no user, redirect to external URL
  if (!user) {
    window.location.href = "https://agrospace.xelkoomai.sn";
    return null; // Render nothing while redirecting
  }

  return <Outlet />;
}
