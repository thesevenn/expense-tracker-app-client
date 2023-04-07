import {
	MouseEvent,
	ReactElement,
	useState,
	ChangeEvent,
	useContext,
} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AiFillEyeInvisible, AiFillEye} from "react-icons/ai";

import "../Signup/signup.css";
import Credentials from "../../types/credentials.type";
import api from "../../api";
import {AuthContext} from "../../context/AuthContext";
import Loader from "../Loader";

export default function Login(): ReactElement {
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);

	const {auth, setAuth, setError, user, setUser, setMessage, error} =
		useContext(AuthContext);
	if (auth && user) {
		navigate("/dashboard", {replace: true});
	}

	const [credentials, setCredentials] = useState<Credentials>({
		email: "",
		password: "",
	});

	const [type, setType] = useState<"text" | "password">("password");

	function handleInput(e: ChangeEvent<HTMLInputElement>) {
		console.log(e.target.name);

		setCredentials(prev => ({...prev, [e.target.name]: e.target.value}));
	}

	async function handleLogin(e: MouseEvent) {
		e.preventDefault();
		setLoading(true);

		try {
			if (user && auth) {
				navigate("/dashboard", {replace: true});
			} else {
				const response = await api.post("/auth/login", credentials);

				if (
					response.data &&
					response.data.success == true &&
					response.data.auth == true
				) {
					setAuth(true);
					setUser(response.data.user);
					setMessage(response.data.message);
					setError("");
					navigate("/dashboard", {replace: true});
					setLoading(false);
				} else {
					setError(response.data.message);
					setLoading(false);
					setAuth(false);
				}
			}
		} catch (error) {
			setLoading(false);
			if (error instanceof Error) {
				console.log(error.message);
			}
		}
	}
	return (
		<>
			{loading && <Loader message="Logging in..." />}
			{error && <div className="error-message">{error}</div>}
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
						<i
							className="eye-icon"
							onClick={e => setType(type == "text" ? "password" : "text")}
						>
							{type == "password" ? <AiFillEye /> : <AiFillEyeInvisible />}
						</i>
						<input
							type={type}
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
