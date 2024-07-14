
import { Outlet,Navigate } from "react-router-dom";

export default function Protected(){

        const login_status=localStorage.getItem("Token")
        console.log("Token",login_status)
        if (!login_status || login_status!=="true"){
            return <Navigate to ="/login" />
        }
    return login_status ? <Outlet/> : <Navigate to= "/login" />
};