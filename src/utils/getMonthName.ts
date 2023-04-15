export default function getMonthName(month: string): string {
	let monthName = "January";
	console.log(month, typeof month);

	switch (month) {
		case "0":
			monthName = "January";
		case "1":
			monthName = "February";
		case "2":
			monthName = "March";
		case "3":
			monthName = "April";
		case "4":
			monthName = "May";
		case "5":
			monthName = "June";
		case "6":
			monthName = "July";
		case "7":
			monthName = "August";
		case "8":
			monthName = "September";
		case "9":
			monthName = "October";
		case "10":
			monthName = "Novemer";
		case "11":
			monthName = "December";
		default:
			monthName;
	}
	return monthName;
}
