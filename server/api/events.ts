export default defineEventHandler(async (event) => {
	try {
		let res = await fetch("http://localhost:8000/events");
		let data: [
			{
				id: string;
				name: string;
				email: string;
				phone: string;
				countryCode: string;
				address: string;
				"date-of-birth": string;
				"event-date": string;
				"event-type": string;
				"sub-event-type": string;
			}
		] = await res.json();
		return { status: 200, error: null, data: data };
	} catch (e) {
		return { status: 500, error: e, data: null };
	}
});
