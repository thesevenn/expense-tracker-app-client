import {ReactElement, useState, useEffect} from "react";

import "./summary.css";
import api from "../../api";

interface PropType {
	name: string;
}

interface Summary {
	id: string;
	u_id: string;
	credited: string;
	debited: string;
	last_update: string;
}

export default function Summary({name}: PropType): ReactElement {
	const [summary, setSummary] = useState<Summary>();
	useEffect(() => {
		fetchSummary();
	}, []);
	async function fetchSummary() {
		try {
			const response = await api.get("/users/summary");
			if (response.data) {
				setSummary(response.data.summary);
				console.log(response.data.summary);
			} else {
				console.log(response.data.message);
			}
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
			}
		}
	}

	// net diffenrence and symbol with seperation
	const net: number = +(summary?.credited || 0) - +(summary?.debited || 0);
	const symbol = net >= 0 ? "+" : "-";

	return (
		<>
			<div className="summary-card">
				<section className="summary-headings">
					<p className="brief-heading">Your Finacial Brief</p>
					{name && <strong className="user-name">{name}</strong>}
				</section>
				<section className="summary-data">
					<div className="credit-debit">
						<div className="info-card info-col card-credit">
							<strong className="action-heading">Total Credit</strong>
							<span className="amount green">
								+ {summary?.credited || "0.00"}
							</span>
						</div>
						<div className="info-card info-col card-debit">
							<strong className="action-heading">Total Debit</strong>
							<span className="amount red">- {summary?.debited || "0.00"}</span>
						</div>
						<div className="info-card info-row card-net">
							<strong className="action-heading">Net Difference</strong>
							<span
								className={"amount difference " + (net >= 0 ? "green" : "red")}
							>
								{symbol + " " + Math.abs(net).toFixed(2) || "0.00"}
							</span>
						</div>
					</div>
					<div className="donut-chart">donut chart</div>
				</section>
			</div>
		</>
	);
}

// avg income = total credit/12 avg. expense = total debit/12
