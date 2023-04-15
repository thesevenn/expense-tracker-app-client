import {useState, useEffect, useContext} from "react";
import {useNavigate} from "react-router-dom";

import {AuthContext} from "../context/AuthContext";

interface NewAccess {
	timeout: number;
	getAccess: Function;
}

export default function useNewAccess({timeout, getAccess}: NewAccess) {
	const navigate = useNavigate();
	const {setAuth} = useContext(AuthContext);

	useEffect(() => {
		console.log(localStorage.getItem("auth"));

		const user = localStorage.getItem("auth");
		let interval: ReturnType<typeof setInterval>;
		if (user == null) {
			console.log("no user");
			navigate("/login");
		} else if (user != null) {
			interval = setInterval(async () => {
				const response = await getAccess();
				if (response.data.success == true) {
					console.log("hello", response.data);
					localStorage.setItem("auth", "true");
					setAuth(true);
				} else {
					localStorage.setItem("auth", "false");
					setAuth(false);
					navigate("/login");
				}
			}, timeout);
		}
		return () => clearTimeout(interval);
	}, []);
	/* 
    should check for auth state in local storage and should update the local storage every time auth change.

    should start a timer to get new access from given function
    should cancel timer if app closed
    
    */

	return;
}
