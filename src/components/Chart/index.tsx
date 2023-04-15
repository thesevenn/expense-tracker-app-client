import {ReactElement} from "react";
import {Chart, Tooltip, Legend, ArcElement, Title} from "chart.js";
import {Doughnut} from "react-chartjs-2";

Chart.register(Tooltip, Legend, ArcElement, Title);

interface PropType {
	dataset: Array<number>;
}

export default function DoughnutChart({dataset}: PropType): ReactElement {
	const data = {
		labels: ["Difference", "Debited", "Credited"],
		labelsColor: "red",
		datasets: [
			{
				label: "Your Financial Stats",
				data: dataset,
				cutout: "55%",
				radius: "85%",
				borderColor: "hsl(280, 10%, 61%)",
				backgroundColor: [
					"hsl(260, 50%, 51%)",
					"hsl(360, 82%, 61%)",
					"hsl(140, 82%, 61%)",
				],
				hoverOffset: 4,
				hoverBorderColor: "hsl(280, 10%, 81%)",
			},
		],
	};
	return (
		<>
			<Doughnut data={data} />
		</>
	);
}
