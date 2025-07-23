export default defineEventHandler(async (event) => {
	let name = getQuery(event)["name"];
	let token = getQuery(event)["token"];
	try {
		let res = await fetch(
			useRuntimeConfig().public.BACKEND +
				"?name=" +
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
		let data: {
			users: [
				{
					name: string;
					email: string;
					phone: string;
					countryCode: number;
					address: string;
					date_of_birth: string;
				}
			];
		} = await res.json();
		return { status: 200, error: null, data: data.users };
	} catch (e) {
		return { status: 500, error: e, data: null };
	}
});
