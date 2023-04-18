import {ReactElement} from "react";
import {Link} from "react-router-dom";

import "./error.css";
import page_not_found from "../assets/page_not_found_re_e9o6.svg";

export default function Error(): ReactElement {
	return (
		<div className="error-page">
			<img
				src={page_not_found}
				alt="404 - page not found"
				className="error-svg"
			/>
			<div className="error-action">
				<p className="error-title">
					Oops! cannot find what you are looking for!!
				</p>
				<Link to={{pathname: "/dashboard"}}>
					<button className="button">Go Back</button>
				</Link>
			</div>
		</div>
	);
}
