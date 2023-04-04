import {useContext} from "react";
import {Routes, Route, Navigate} from "react-router-dom";

import Layout from "./Layout";
import Login from "./components/Login";
import {Protected} from "./components/Protected";
import Error from "./Error";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import {AuthContext} from "./context/AuthContext";

export default function App() {
	const {auth, user} = useContext(AuthContext);
	console.log(auth, user);

	const authenticated = auth && user;
	console.log(authenticated, "au");

	return (
		<>
			<Routes>
				<Route element={<Layout />} errorElement={<Error />}>
					<Route element={<Protected />} errorElement={<Error />}>
						<Route path="/">
							<Route element={<Dashboard />} />
						</Route>

						<Route index path="/dashboard" element={<Dashboard />} />
						<Route path="user/records" element={<div>records</div>} />
					</Route>
				</Route>
				<Route
					path="/login"
					element={
						authenticated ? (
							<Navigate to={{pathname: "/dashboard"}} />
						) : (
							<Login />
						)
					}
				/>
				<Route
					path="/signup"
					element={!authenticated ? <Signup /> : <Navigate to="/" />}
				/>
			</Routes>
		</>
	);
}
