import {ReactElement, useState, useEffect} from "react";

import "./records.css";
import Sidebar from "../Sidebar";
import {Record} from "../Recents";
import api from "../../api";
import getMonthName from "../../utils/getMonthName";

interface Filter {
	year: number;
	month: number;
}

export default function Records(): ReactElement {
	const date = new Date();
	const [page, setPage] = useState<number>(1);
	const [records, setRecords] = useState<Record[]>([] as Record[]);
	const [disableNext, setDisableNext] = useState(false);
	const [year, setYear] = useState<number>(date.getFullYear());
	const [month, setMonth] = useState<number>(date.getMonth());
	const [filter, setFilter] = useState<Filter>({} as Filter);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		fetchRecords(year, month, 1);
	}, []);

	function applyFilters(): void {
		setDisableNext(false);
		setPage(1);
		setFilter({year: year, month: month});
		fetchRecords(filter.year, filter.month);
	}

	function handleNext() {
		setPage(page + 1);
		fetchRecords(filter.year, filter.month, page);
	}

	function handlePrev() {
		setDisableNext(false);
		if (page > 1) {
			setPage(page - 1);
			fetchRecords(filter.year, filter.month, page);
		}
	}
	console.log(filter);

	async function fetchRecords(
		year?: number,
		month?: number,
		page: number = 1,
		count: number = 15
	): Promise<void> {
		const queryString = "";
		const response = await api.get(
			`/users/records?year=${year}&month=${month}&page=${page}&count=${count}`
		);

		if (response.data?.success) {
			setRecords(response.data.records);
			if (response.data.total < count) {
				setDisableNext(true);
			} else {
				setDisableNext(false);
			}
			console.log(response.data);
		} else {
			console.log(response.data);
		}
	}

	return (
		<>
			<div className="records-page">
				<Sidebar />
				<section className="filter-section">
					<h1 className="filter-title">
						Records for {}, {date.getFullYear()}
					</h1>
					<div className="filters-control">
						<div>
							<label htmlFor="month" className="filter-label">
								Month
							</label>
							<select
								name="month"
								id="month"
								className="filter"
								defaultValue={new Date().getMonth()}
								defaultChecked={true}
								onChange={e => setMonth(Number(e.target.value))}
							>
								<option value={1}>April</option>
								<option value={2}>May</option>
								<option value={3}>Sept</option>
							</select>
						</div>
						<div>
							<label htmlFor="year" className="filter-label">
								Year
							</label>
							<select
								name="year"
								id="year"
								className="filter"
								defaultValue={new Date().getFullYear()}
								defaultChecked={true}
								onChange={e => setYear(Number(e.target.value))}
							>
								<option value={2023}>2023</option>
								<option value={2022}>2022</option>
							</select>
						</div>
						<button className="filter-button" onClick={() => applyFilters()}>
							Apply Filters
						</button>
					</div>
				</section>
				<section className="records-list">
					{records &&
						records.map((record, index) => (
							<Record key={record.id} {...record} index={index} />
						))}
				</section>
				<section className="pagination">
					<button
						className="prev-button button"
						disabled={page < 2}
						onClick={() => handlePrev()}
					>
						prev
					</button>
					<span className="page-current">{page}</span>
					<button
						className="next-button button"
						disabled={disableNext}
						onClick={() => handleNext()}
					>
						next
					</button>
				</section>
			</div>
		</>
	);
}
