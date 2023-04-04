import {ReactElement} from "react";
import {Link} from "react-router-dom";

import "./recents.css";

export default function Recents(): ReactElement {
	return (
		<>
			<div className="recents-card">
				<h3 className="recent-title">Recent Transactions</h3>
				<section className="transaction-list">
					<Record />
					<Record />
					<Record />
					<Record />
					<Record />
				</section>
				<div>
					<Link to="/user/records">
						<button className="button-records">Show more</button>
					</Link>
				</div>
			</div>
		</>
	);
}

export function Record(): ReactElement {
	const credit = true;
	return (
		<div className="record-entry">
			<p className="record-serial">1</p>
			<p className="record-date">1 apr</p>
			<p className="record-description">paid on amazon</p>
			<p className={(credit ? "credit" : "debit") + " record-amount"}>
				+ 45700
			</p>
		</div>
	);
}
