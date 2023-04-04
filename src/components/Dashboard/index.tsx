import {ReactElement} from "react";

import "./dashboard.css";
import Greeting from "../Greeting";
import Recents from "../Recents";
import Summary from "../Summary";
import New from "../New";
import Sidebar from "../Sidebar";

export default function Dashboard(): ReactElement {
	return (
		<>
			<section className="dashboard-grid">
				<Sidebar />
				<Greeting />
				<Summary />
				<New />
				<Recents />
			</section>
		</>
	);
}
