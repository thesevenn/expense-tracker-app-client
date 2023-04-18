import React, {ReactElement, useEffect, useState} from "react";

import "./greeting.css";
import partOfTheDay from "../../utils/partOfDay";

interface PropType {
	name: string;
}
export default function Greeting({name}: PropType): ReactElement {
	const [time, setTime] = useState<Date>(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date());
		}, 1000 * 60);

		return () => clearInterval(interval);
	}, [time]);

	return (
		<>
			<section className="greet-card">
				<div className="date-time__section">
					<p className="date-time">
						{time.toDateString().substring(0, 15)},{" "}
						{time.toTimeString().substring(0, 5)}
					</p>
				</div>
				<div className="greet-section">
					<h1 className="greet-title">
						Good {partOfTheDay(time.getHours())}
						{", " + name || ""}
					</h1>
					<p className="greet-para">What are your plans for today?</p>
				</div>
			</section>
		</>
	);
}
/* 


*/
