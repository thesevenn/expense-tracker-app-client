import {
	ReactElement,
	useState,
	useEffect,
	useReducer,
	ReducerState,
} from "react";

import "./records.css";
import Sidebar from "../Sidebar";
import {Record} from "../Recents";
import api from "../../api";
import getMonthName from "../../utils/getMonthName";
import {Action} from "@remix-run/router";

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
		(async () => {
			const response = await api.get("/users/records?page=1&count=15");
			if (response.data?.success) {
				setRecords(response.data.records);
			}
		})();
	}, []);

	useEffect(() => {
		fetchRecords(filter.year, filter.month, page);
	}, [filter, page]);

	function applyFilters(): void {
		setDisableNext(false);
		setPage(1);
		setFilter({year: year, month: month});
		console.log(filter);

		// fetchRecords(filter.year, filter.month);
	}

	function handleNext() {
		setPage(page + 1);
		fetchRecords(filter.year, filter.month, page + 1);
		console.log(page, "next");
	}

	console.log(page, "corr");

	function handlePrev() {
		setDisableNext(false);
		if (page > 1) {
			setPage(page - 1);
			// fetchRecords(filter.year, filter.month, page - 1);
		}
		console.log(page, "prev");
	}

	async function fetchRecords(
		year?: number,
		month?: number,
		page: number = 1,
		count: number = 15
	): Promise<void> {
		let queryString = `?page=${page}&count=${count}`;
		if (year && !month) {
			queryString = `?year=${year}&page=${page}&count=${count}`;
		} else if (month) {
			year = year || date.getFullYear();
			queryString = `?year=${year}&month=${month}&page=${page}&count=${count}`;
		}
		console.log(filter);

		const response = await api.get(`/users/records${queryString}`);
		console.log(response.data);

		if (response.data?.success) {
			setRecords(response.data.records);

			if (response.data.total < count) {
				setDisableNext(true);
			} else if (response.data.total == 0) {
				setPage(page - 1);
				setDisableNext(true);
			} else {
				setDisableNext(false);
			}
		}
		console.log(queryString, "qs");
	}

	return (
		<>
			<div className="records-page">
				<Sidebar />
				<section className="filter-section">
					<h1 className="filter-title">
						Records for {getMonthName(filter.month)}, {year}
					</h1>
					<div className="filters-control">
						<div>
							<label htmlFor="month" className="filter-label">
								Month
							</label>
							<select
								defaultValue=""
								name="month"
								id="month"
								className="filter"
								onChange={e => setMonth(Number(e.target.value))}
							>
								<option disabled hidden value="">
									select
								</option>
								{Array(date.getMonth() + 1)
									.fill("")
									.map((month, index) => (
										<option key={index} value={index + 1}>
											{getMonthName(index)}
										</option>
									))}
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
								onChange={e => setYear(Number(e.target.value))}
							>
								{Array(date.getFullYear() - 2020)
									.fill(0)
									.map((year, index) => (
										<option key={index} value={date.getFullYear() - index}>
											{date.getFullYear() - index}
										</option>
									))}
							</select>
						</div>
						<button className="filter-button" onClick={() => applyFilters()}>
							Apply Filters
						</button>
					</div>
				</section>
				<section className="records-list">
					{records?.length ? (
						records.map((record, index) => (
							<Record key={record.id} {...record} index={index} />
						))
					) : (
						<div className="no-content">Nothing to Show Here.</div>
					)}
				</section>
				<section className="pagination">
					<button
						className="prev-button button"
						disabled={page < 2}
						onClick={() => handlePrev()}
					>
						prev
					</button>
					<div className="page-current">{page}</div>
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
