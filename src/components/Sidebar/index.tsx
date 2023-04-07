import {ReactElement, useContext, useState} from "react";
import {FaPowerOff} from "react-icons/fa";
import {MdRemoveCircle} from "react-icons/md";
import {useNavigate} from "react-router-dom";

import "./sidebar.css";
import logo from "../../assets/finax.svg";
import api from "../../api";
import {AuthContext} from "../../context/AuthContext";
import Loader from "../Loader";

export default function Sidebar(): ReactElement {
	const navigate = useNavigate();
	const {setAuth, setUser} = useContext(AuthContext);
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");

	async function handleLogOut() {
		setMessage("Logging out...");
		setLoading(true);
		const response = await api.get("/auth/logout");
		if (response.data.success == false) {
			console.log(response.data.message);
			setLoading(false);
			setMessage("");
		} else {
			setAuth(false);
			setUser("");
			navigate("/login");
			setLoading(false);
			setMessage("");
		}
	}

	async function handleDeleteAccount() {
		setMessage("processing...");
		setLoading(true);
		const response = await api.delete("/users/account");
		if (response.data.success == false) {
			console.log(response.data.message);
			setLoading(false);
			setMessage("");
		} else {
			setAuth(false);
			setUser("");
			setMessage("");
			navigate("/signup");
			setLoading(false);
		}
	}
	return (
		<>
			{loading && <Loader message={message} />}
			<header className="sidebar">
				<div className="brand-logo">
					<img src={logo} alt="Finax" />
				</div>
				<div className="account-actions">
					<button onClick={() => handleDeleteAccount()}>
						<i className="icons delete-account" title="delete account">
							<MdRemoveCircle />
						</i>
					</button>
					<button onClick={() => handleLogOut()}>
						<i className="icons logout" title="logout">
							<FaPowerOff />
						</i>
					</button>
				</div>
			</header>
		</>
	);
}
