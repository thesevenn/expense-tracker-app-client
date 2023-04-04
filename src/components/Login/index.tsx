import {
	MouseEvent,
	ReactElement,
	useState,
	ChangeEvent,
	useContext,
} from "react";
import {Link, useNavigate} from "react-router-dom";

import "../Signup/signup.css";
import Credentials from "../../types/credentials.type";
import api from "../../api";
import {AuthContext} from "../../context/AuthContext";

export default function Login(): ReactElement {
	const navigate = useNavigate();
	const {auth, setAuth, setError, user, setUser, setMessage} =
		useContext(AuthContext);
	if (auth && user) {
		navigate("/dashboard", {replace: true});
	}

	const [credentials, setCredentials] = useState<Credentials>({
		email: "",
		password: "",
	});

	function handleInput(e: ChangeEvent<HTMLInputElement>) {
		console.log(e.target.name);

		setCredentials(prev => ({...prev, [e.target.name]: e.target.value}));
	}

	async function handleLogin(e: MouseEvent) {
		e.preventDefault();

		try {
			if (user && auth) {
				navigate("/dashboard");
			} else {
				const response = await api.post("/auth/login", credentials);

				if (response.data.success == false) {
					setError(response.data.message);
					setAuth(false);
				} else {
					setAuth(true);
					setUser(response.data.user);
					setMessage(response.data.message);
					navigate("/dashboard");
				}
			}
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
			}
		}
	}
	return (
		<>
			<section className="auth-card">
				<h1 className="brand-name">Finax</h1>
				<form className="form-area">
					<h2 className="action-title">Login </h2>
					<div className="input-area">
						<input
							type="text"
							id="email"
							name="email"
							className="input-field"
							onChange={e => handleInput(e)}
							required
						/>
						<label htmlFor="email" className="label-for">
							email
						</label>
					</div>
					<div className="input-area">
						<input
							type="text"
							id="password"
							name="password"
							className="input-field"
							onChange={e => handleInput(e)}
							required
						/>
						<label htmlFor="password" className="label-for">
							password
						</label>
					</div>
					<button
						type="submit"
						className="button"
						onClick={e => handleLogin(e)}
					>
						Login
					</button>
				</form>
				<p className="action-para">
					Don't have an account?{" "}
					<Link to="/signup">
						<strong className="action-strong">Create One</strong>
					</Link>
				</p>
			</section>
		</>
	);
}
