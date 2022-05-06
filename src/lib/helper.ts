export function getFormatedDate(dateStr: string | Date): {
	year: string;
	month: string;
	day: string;
} {
	let dateObj = new Date(dateStr);
	let month = dateObj.getMonth() + 1;
	let day = dateObj.getDate();
	return {
		year: String(dateObj.getFullYear()),
		month: month < 10 ? `0${month}` : String(month),
		day: day < 10 ? `0${day}` : String(day)
	};
}
