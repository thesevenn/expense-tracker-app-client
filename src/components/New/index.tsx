import {ReactElement, ChangeEvent, SetStateAction, Dispatch} from "react";

import "./new.css";
import {Transaction} from "../Dashboard";

interface PropType {
	transaction: Transaction;
	setTransaction: Dispatch<SetStateAction<Transaction>>;
	newRecord: Function;
}

export default function New({
	setTransaction,
	newRecord,
	transaction,
}: PropType): ReactElement {
	function handlerInput(
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	): void {
		setTransaction(prev => ({...prev, [e.target.name]: e.target.value}));
	}

	return (
		<>
			<section className="transaction-new-card">
				<h3 className="new-transaction-title">New Transaction</h3>
				<select
					name="credit"
					id="credit"
					className="transaction-type"
					onChange={e => handlerInput(e)}
				>
					<option value="false" defaultChecked>
						Debit
					</option>
					<option value="true">Credit</option>
				</select>
				<input
					type="text"
					name="amount"
					id="amount"
					className="input-field amount-field"
					placeholder="Transaction Amount"
					value={transaction.amount}
					onChange={e => handlerInput(e)}
				/>
				<input
					type="text"
					name="description"
					id="description"
					className="input-field description-field"
					placeholder="Transaction Description"
					value={transaction.description}
					onChange={e => handlerInput(e)}
				/>
				<button className="add-button" onClick={e => newRecord()}>
					New
				</button>
			</section>
		</>
	);
}
