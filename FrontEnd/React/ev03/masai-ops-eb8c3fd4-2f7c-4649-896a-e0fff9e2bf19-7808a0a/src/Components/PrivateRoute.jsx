import { Children } from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

function PrivateRoute({children}) {
    const { auth } = useContext(AppContext);

    if(!auth.isAuth){
        return <Navigate to="/login" />
    }

    return children;

}

export default PrivateRoute;