import { createTransport } from "nodemailer";

export default defineEventHandler(async (event) => {
	try {
		let body: { name: string; msg: string; rating: string } =
			await readBody(event);
		const { name, msg, rating } = body;
		if (!name) return;
		if (!msg) return;
		if (!rating) return;
		let transport = createTransport({
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: useRuntimeConfig().public.EMAIL,
				pass: useRuntimeConfig().public.EMAIL_TOKEN,
			},
		});
		await transport.sendMail({
			from: useRuntimeConfig().public.EMAIL,
			to: useRuntimeConfig().public.FEEDBACK_RECIEVER,
			subject: "Otp for Angelite Login/Booking",
			html: `<h1>Feedback</h1><h2>By: ${name}</h2><h3>Rating: ${rating} stars</h3><p>${msg}</p>`,
		});
		return { statusCode: 200, statusMessage: "Success" };
	} catch (e) {
		console.log(e);
		return {
			statusCode: 500,
			statusMessage: "Internal Server Error",
		};
	}
});
