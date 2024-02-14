// import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const jwt = localStorage.getItem("jwt")

  return jwt ? <Outlet /> : <Navigate to="/login" />;
};
