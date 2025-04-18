import crypto from "crypto";

export default defineEventHandler(async (event) => {
	let loginData: { name: string; email: string; password: string } =
		await readBody(event);

	let loginStr =
		`{name: ${loginData.name.toLowerCase()}` +
		`, email: ${loginData.email.toLowerCase()}` +
		`, pass: ${loginData.password}}`;

	let hash = crypto.hash("sha512", loginStr);

	try {
		let res = await fetch(
			"http://localhost:8000/admins?adminHash=" + hash,
			{
				method: "POST",
				headers: {
					accept: "application/json",
				},
			}
		);
		let data: { status: number; error: null; authenticated: string } =
			await res.json();
		return data;
	} catch (e) {
		return { status: 500, error: e, authenticated: "NONE" };
	}
});
