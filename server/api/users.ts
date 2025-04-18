export default defineEventHandler(async (event) => {
	try {
		let res = await fetch("http://localhost:8000/");
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
