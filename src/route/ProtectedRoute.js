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
     )
  }; 

  return user ? <Outlet /> : <Navigate to="/404" replace />;
}
