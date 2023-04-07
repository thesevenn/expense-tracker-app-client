import {ReactElement} from "react";

import "./skeleton.css";

export default function ButtonSkeleton(): ReactElement {
	return (
		<>
			<div className="button-skeleton pulse-animate"></div>
		</>
	);
}
