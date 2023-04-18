export default function partOfTheDay(hour: number): string {
	let part: string = "Night";
	if (hour >= 5 && hour < 12) {
		part = "Morning";
	} else if (hour >= 12 && hour <= 17) {
		part = "Afternoon";
	} else {
		part = "Night";
	}
	return part;
}
