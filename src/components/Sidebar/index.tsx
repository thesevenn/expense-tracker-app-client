import {ReactElement} from "react";
import {FaPowerOff} from "react-icons/fa";
import {MdRemoveCircle} from "react-icons/md";
import {useNavigate} from "react-router-dom";

import "./sidebar.css";
import api from "../../api";

export default function Sidebar(): ReactElement {
	const navigate = useNavigate();
	async function handleLogOut() {
		const response = await api.get("/auth/logout");
		if (response.data.success == false) {
			console.log(response.data.message);
		} else {
			console.log(response.data);
			navigate("/login");
		}
	}

	async function handleDeleteAccount() {
		const response = await api.delete("/users/account");
		if (response.data.success == false) {
			console.log(response.data.message);
		} else {
			console.log(response.data);
			navigate("/signup");
		}
	}
	return (
		<>
			<header className="sidebar">
				<div className="brand-logo">Finax</div>
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
