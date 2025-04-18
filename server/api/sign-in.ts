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
	} catch (e) {
		return { status: 500, error: e };
	}
	return { status: 200, error: null };
});
