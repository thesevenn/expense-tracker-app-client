import {ReactElement} from "react";

import "./summary.css";

export default function Summary(): ReactElement {
	return (
		<>
			<div className="summary-card">
				<section className="summary-headings">
					<p className="brief-heading">Your Finacial Brief</p>
					<strong className="user-name">Sofiya Riyaz</strong>
				</section>
				<section className="summary-data">
					<div className="credit-debit">
						<div className="info-card info-col card-credit">
							<strong className="action-heading">Total Credit</strong>
							<span className="amount green">+ 45,134,531</span>
						</div>
						<div className="info-card info-col card-debit">
							<strong className="action-heading">Total Debit</strong>
							<span className="amount red">- 45,134,531</span>
						</div>
						<div className="info-card info-row card-net">
							<strong className="action-heading">Net Difference</strong>
							<span className="amount difference green">+45,134,531</span>
						</div>
					</div>
					<div className="donut-chart">donut chart</div>
				</section>
			</div>
		</>
	);
}

// avg income = total credit/12 avg. expense = total debit/12
