import {ReactElement, useContext} from "react";
import {Outlet, useNavigate, Navigate} from "react-router-dom";

import {AuthContext} from "../../context/AuthContext";
type PropType = {
	auth: boolean;
	data: string;
};
export function Protected(): ReactElement {
	const {auth, user} = useContext(AuthContext);
	console.log(auth, user);

	const authenticated = auth && user;
	console.log(authenticated, "auth");

	return (
		<>{authenticated ? <Outlet /> : <Navigate to={{pathname: "/login"}} />}</>
	);
}
