import { Navigate, Outlet } from "react-router-dom";

const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); 
    const exp = payload.exp * 1000; 
    return Date.now() < exp;
  } catch (err) {
    return false;
  }
};

export default function ProtectedRoute() {
  return isTokenValid() ? <Outlet /> : <Navigate to="/404" replace />;
}
