import {ReactElement} from "react";

import "./loader.css";

type PropType = {
	message: string;
};

export default function Loader({
	message,
}: React.PropsWithoutRef<PropType>): ReactElement {
	return (
		<div className="loader-page">
			<div className="spinner-card">
				<div>
					<div className="spinner-container">
						<div className="spinner"></div>
						<div className="spinner"></div>
						<div className="spinner"></div>
						<div className="spinner"></div>
					</div>
				</div>
				<div className="action-text">{message}</div>
			</div>
		</div>
	);
}
