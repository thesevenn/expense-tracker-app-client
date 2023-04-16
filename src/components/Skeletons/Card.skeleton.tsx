import {ReactElement} from "react";

import "./skeleton.css";

export default function CardSkeleton(): ReactElement {
	return (
		<>
			<div className="card-skeleton pulse-animate">loading...</div>
		</>
	);
}
