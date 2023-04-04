import {ReactElement} from "react";
import {Outlet, Navigate} from "react-router-dom";

export default function Layout(): ReactElement {
	const auth = false;
	return (
		<>
			<Outlet />
		</>
	);
}
