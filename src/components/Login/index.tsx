import {
	MouseEvent,
	ReactElement,
	useState,
	useEffect,
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
import {validateEmail} from "../../utils/validation";

export default function Login(): ReactElement {
	const navigate = useNavigate();
	const {auth, setAuth, setError, user, setUser, setMessage, error} =
		useContext(AuthContext);
	useEffect(() => {
		(async () => {
			const response = await api.get("/auth/new-access");
			if (response.data.success == true) {
				setAuth(true);
				setUser(response.data.user);
				navigate("/dashboard", {replace: true});
			} else {
				setAuth(false);
				navigate("/login", {replace: true});
			}
		})();
	}, [auth]);

	const [loading, setLoading] = useState<boolean>(false);

	const [credentials, setCredentials] = useState<Credentials>({
		email: "",
		password: "",
	});

	const [type, setType] = useState<"text" | "password">("password");

	function handleInput(e: ChangeEvent<HTMLInputElement>) {
		setError("");
		setCredentials(prev => ({...prev, [e.target.name]: e.target.value}));
	}

	async function handleLogin(e: MouseEvent) {
		e.preventDefault();

		if (credentials.email == "" || credentials.password == "") {
			setError("Required fields cannot be empty");
		} else if (!validateEmail(credentials.email)) {
			setError("Please enter a valid email.");
		} else {
			setError("");
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
						localStorage.setItem("auth", "true");
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
	}
	return (
		<>
			{loading && <Loader message="Logging in..." />}
			{error && <div className="error-message">{error}</div>}
			<section className="auth-card">
				<h1 className="brand-name">Finax</h1>
				<form className="form-area">
					<h2 className="action-title">Welcome Back</h2>
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
