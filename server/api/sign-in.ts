export default defineEventHandler(async (event) => {
	let res = await readBody(event);

	let data: {
		name: string;
		email: string;
		countryCode: string;
		phoneNumber: number;
		address: string;
		DoB: Date;
	} = res;
	try {
		await fetch(
			useRuntimeConfig().public.BACKEND +
				"sign-in?name=" +
				data.name +
				"&email=" +
				data.email +
				"&countryCode=" +
				parseInt(data.countryCode) +
				"&phone=" +
				String(data.phoneNumber) +
				"&address=" +
				data.address +
				"&DoB=" +
				data.DoB,
			{
				method: "POST",
				headers: {
					accept: "application/json",
				},
			}
		);
	} catch (e) {
		return { status: 500, error: e };
	}
	return { status: 200, error: null };
});
