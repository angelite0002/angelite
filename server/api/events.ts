export default defineEventHandler(async (event) => {
	let name = getQuery(event)["name"];
	let token = getQuery(event)["token"];
	try {
		let res = await fetch(
			useRuntimeConfig().public.BACKEND +
				"events?name=" +
				name +
				"&token=" +
				token,
			{
				method: "POST",
				headers: {
					accept: "application/json",
				},
			}
		);
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
