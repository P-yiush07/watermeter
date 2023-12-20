import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoutes = () => {
    const { user, isLoggedIn } = useAuth()
    return user && isLoggedIn ? <Outlet /> : <Navigate to='/login'/>
   
}

export default PrivateRoutes