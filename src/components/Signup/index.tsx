import {ChangeEvent, MouseEvent, ReactElement, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

import "./signup.css";
import Credentials from "../../types/credentials.type";
import api from "../../api";

export default function Signup(): ReactElement {
	const navigate = useNavigate();
	const [error, setError] = useState<string>("");
	const [credentials, setCredentials] = useState<Credentials>({
		email: "",
		password: "",
		name: "",
	});

	function handleInput(e: ChangeEvent<HTMLInputElement>) {
		setCredentials(prev => ({...prev, [e.target.name]: e.target.value}));
	}

	async function handleSubmit(e: MouseEvent) {
		e.preventDefault();
		try {
			const response = await api.post("/auth/sign-up", credentials);
			if (response.data.success == false) {
				setError(response.data.message);
			} else {
				console.log(response.data);
				navigate("/login");
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
