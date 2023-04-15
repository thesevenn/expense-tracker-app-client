import {Routes, Route} from "react-router-dom";

import Layout from "./Layout";
import Login from "./components/Login";
import {Protected} from "./components/Protected";
import Error from "./Error";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Records from "./components/Records";

export default function App() {
	return (
		<>
			<Routes>
				<Route element={<Layout />}>
					<Route element={<Protected />}>
						<Route path="/">
							<Route element={<Dashboard />} />
						</Route>

						<Route index path="/dashboard" element={<Dashboard />} />
						<Route path="user/records" element={<Records />} />
					</Route>
				</Route>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="*" element={<Error />} />
			</Routes>
		</>
	);
}
