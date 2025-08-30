import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth"

const ProtectedRoutes = () => {
   const {isAuthenticated} = useAuth();
   return isAuthenticated? <Outlet/> : <Navigate to = '/login'/>
}

export default ProtectedRoutes
