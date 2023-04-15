import {ReactElement, useContext} from "react";
import {Outlet, useNavigate, Navigate} from "react-router-dom";

import {AuthContext} from "../../context/AuthContext";

export function Protected(): ReactElement {
	const {auth} = useContext(AuthContext);
	const user = localStorage.getItem("auth");

	const authenticated = auth;

	return (
		<>{authenticated ? <Outlet /> : <Navigate to={{pathname: "/login"}} />}</>
	);
}
