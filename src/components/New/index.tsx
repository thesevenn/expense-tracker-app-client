import {
	ReactElement,
	ChangeEvent,
	SetStateAction,
	Dispatch,
	useState,
	useContext,
} from "react";

import "./new.css";
import {Transaction} from "../Dashboard";
import {AuthContext} from "../../context/AuthContext";

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
	const {error, setError} = useContext(AuthContext);
	const [underLimit, setUnderLimit] = useState<number>(50);

	function handlerInput(
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	): void {
		if (
			(e.target.name == "amount" && isNaN(+e.target.value)) ||
			+e.target.value > 499999
		) {
			setError("Amount can be Numbers less than 500000");
		} else {
			setTransaction(prev => ({...prev, [e.target.name]: e.target.value}));
			if (e.target.name == "description") {
				setUnderLimit(50 - transaction.description.length);
				if (underLimit <= 0) {
					setTransaction(prev => ({
						...prev,
						description: prev.description.substring(0, 50),
					}));
				}
			}
			setError("");
		}
	}

	return (
		<>
			<section className="transaction-new-card">
				<h3 className="new-transaction-title">New Transaction</h3>
				{error && <p className="error-para">{error}</p>}
				<select
					name="credit"
					id="credit"
					className="transaction-type"
					onChange={e => handlerInput(e)}
					value={transaction.credit ? "true" : "false"}
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
				<span className="character-count">{underLimit}/50</span>

				<button className="add-button" onClick={e => newRecord()}>
					New
				</button>
			</section>
		</>
	);
}
