import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoute() {
  const { user } = useContext(AuthContext)

  return user ? <Outlet /> : <Navigate to="/login" />
}