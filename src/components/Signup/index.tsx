import {ChangeEvent, MouseEvent, ReactElement, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AiFillEyeInvisible, AiFillEye} from "react-icons/ai";

import "./signup.css";
import Credentials from "../../types/credentials.type";
import api from "../../api";
import Loader from "../Loader";
import {validateEmail} from "../../utils/validation";

export default function Signup(): ReactElement {
	const navigate = useNavigate();
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const [type, setType] = useState<"text" | "password">("password");
	const [credentials, setCredentials] = useState<Credentials>({
		email: "",
		password: "",
		name: "",
	});

	function handleInput(e: ChangeEvent<HTMLInputElement>) {
		setError("");
		setCredentials(prev => ({...prev, [e.target.name]: e.target.value}));
	}

	async function handleSubmit(e: MouseEvent) {
		e.preventDefault();

		if (
			credentials.email == "" ||
			credentials.password == "" ||
			credentials.name == ""
		) {
			setError("Required fields cannot be empty");
		} else if (!validateEmail(credentials.email)) {
			setError("Please enter a valid email.");
		} else {
			setLoading(true);

			try {
				const response = await api.post("/auth/sign-up", credentials);
				if (response.data.success == false) {
					setError(response.data.message);
					setLoading(false);
				} else {
					navigate("/login");
					setLoading(false);
					setError("");
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
			{loading && <Loader message="Signingup..." />}
			{error && <div className="error-message">{error}</div>}
			<section className="auth-card">
				<h1 className="brand-name">FinaX</h1>
				<form className="form-area">
					<h2 className="action-title">Create Account </h2>
					<div className="input-area">
						<input
							type="text"
							id="name"
							name="name"
							className="input-field"
							onChange={e => handleInput(e)}
							required
						/>
						<label htmlFor="name" className="label-for">
							name
						</label>
					</div>
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
						onClick={e => handleSubmit(e)}
					>
						Create Account
					</button>
				</form>
				<p className="action-para">
					Already have an account?{" "}
					<Link to="/login">
						<strong className="action-strong">Login</strong>
					</Link>
				</p>
			</section>
		</>
	);
}
