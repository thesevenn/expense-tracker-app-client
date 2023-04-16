import {ReactElement} from "react";
import {Link} from "react-router-dom";

import "./recents.css";
import CardSkeleton from "../Skeletons/Card.skeleton";
import ButtonSkeleton from "../Skeletons/ButtonSkeleton";

export interface Record {
	id: string;
	amount: string;
	credit: boolean;
	added_at: string;
	description: string;
	index: number;
}

type PropType = {
	records: Record[];
	loading: boolean;
};

export default function Recents({records, loading}: PropType): ReactElement {
	return (
		<>
			<div className="recents-card">
				<h3 className="recent-title">Recent Transactions</h3>
				<section className="transaction-list">
					{loading ? (
						<>
							<CardSkeleton />
							<CardSkeleton />
							<CardSkeleton />
							<CardSkeleton />
							<CardSkeleton />
						</>
					) : records.length ? (
						records.map((record, index) => {
							if (index < 5)
								return <Record {...record} key={record.id} index={index} />;
						})
					) : (
						<div className="no-content">Nothing to show here.</div>
					)}
				</section>
				<div>
					{loading ? (
						""
					) : records.length ? (
						<Link to="/user/records">
							<button className="button-records">Show more</button>
						</Link>
					) : (
						""
					)}
				</div>
			</div>
		</>
	);
}

export function Record({
	amount,
	description,
	added_at,
	credit,
	index,
}: Record): ReactElement {
	const symbol: string = credit ? "+" : "-";
	return (
		<div className="record-entry">
			<p className="record-serial">{index + 1}</p>
			<p className="record-date">{added_at.substring(0, 10)}</p>
			<p className="record-description">{description}</p>
			<p className={(credit ? "credit" : "debit") + " record-amount"}>
				{symbol + " " + amount}
			</p>
		</div>
	);
}
