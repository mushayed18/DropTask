import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const PrivateSign = ({children}) => {
    const {user} = useContext(AuthContext);

    if(!user) {
        return children
    }

    return <Navigate to={'/'}></Navigate>
};

export default PrivateSign;