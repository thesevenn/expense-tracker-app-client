import {ReactElement, useState, useEffect, useContext} from "react";
import {useNavigate} from "react-router-dom";

import "./dashboard.css";
import Greeting from "../Greeting";
import Recents from "../Recents";
import Summary from "../Summary";
import New from "../New";
import Sidebar from "../Sidebar";
import api from "../../api";
import {AuthContext} from "./../../context/AuthContext";
import {Record} from "../Recents";

export interface Transaction {
	description: string;
	amount: string;
	credit: boolean;
}

export interface loadingState {
	recent: boolean;
	new: boolean;
}

export default function Dashboard(): ReactElement {
	const navigate = useNavigate();
	const {auth, user, setError} = useContext(AuthContext);
	const [records, setRecords] = useState<Array<Record>>([]);
	const [loading, setLoding] = useState<loadingState>({
		recent: false,
		new: false,
	});
	const [transaction, setTransaction] = useState<Transaction>({
		amount: "",
		description: "",
		credit: false,
	});

	useEffect(() => {
		if (auth) {
			fetchRecents();
		} else {
			navigate("/login", {replace: true});
		}
	}, []);

	async function fetchRecents() {
		setLoding(prev => ({...prev, recent: true}));
		try {
			const response = await api.get("/users/records");
			if (response.data) {
				setRecords(response.data.records);
				setLoding(prev => ({...prev, recent: false}));
			} else {
				console.log(response.data.message);
				setLoding(prev => ({...prev, recent: false}));
			}
		} catch (error) {
			setLoding(prev => ({...prev, recent: false}));
			if (error instanceof Error) {
				console.log(error.message);
			}
		}
	}

	async function newRecord() {
		if (transaction.description == "" || transaction.amount == "") {
			setError("amount and description are required");
		} else {
			try {
				setLoding(prev => ({...prev, new: true}));
				const response = await api.post("/users/records", transaction);
				setTransaction({amount: "", description: "", credit: false});
				if (!response.data) {
					setError(response.data.message);
					setLoding(prev => ({...prev, recent: false}));
				} else {
					fetchRecents();
					setTransaction({credit: false, description: "", amount: ""});
					setLoding(prev => ({...prev, recent: false}));
				}
			} catch (error) {
				setLoding(prev => ({...prev, recent: true}));
				if (error instanceof Error) {
					console.log(error.message);
				}
			}
		}
	}

	return (
		<>
			<section className="dashboard-grid">
				<Sidebar />
				<Greeting name={user} />
				<Summary name={user} />
				<New
					setTransaction={setTransaction}
					newRecord={newRecord}
					transaction={transaction}
				/>
				<Recents records={records} loading={loading.recent} />
			</section>
		</>
	);
}
