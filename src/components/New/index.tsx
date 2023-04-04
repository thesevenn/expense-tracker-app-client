import {ReactElement} from "react";

import "./new.css";

export default function New(): ReactElement {
	return (
		<>
			<section className="transaction-new-card">
				<h3 className="new-transaction-title">New Transaction</h3>
				<select
					name="transaction"
					id="transaction"
					className="transaction-type"
				>
					<option value="false">Debit</option>
					<option value="true">Credit</option>
				</select>
				<input
					type="text"
					name="amount"
					id="amount"
					className="input-field amount-field"
					placeholder="Transaction Amount"
				/>
				<input
					type="text"
					name="description"
					id="description"
					className="input-field description-field"
					placeholder="Transaction Description"
				/>
				<button className="add-button">New</button>
			</section>
		</>
	);
}
