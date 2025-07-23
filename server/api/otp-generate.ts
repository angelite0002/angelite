import { randomInt } from "crypto";
import { createTransport } from "nodemailer";

export default defineEventHandler(async (event) => {
	let otp: number;
	const email = getQuery(event)["email"];
	if (!email) return;

	try {
		let transport = createTransport({
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: useRuntimeConfig().public.EMAIL,
				pass: useRuntimeConfig().public.EMAIL_TOKEN,
			},
		});

		otp = randomInt(1300, 9999);
		while (otp % 100 == 0 || otp % 1000 == 0) {
			otp = randomInt(1300, 9999);
		}
		// to jaipalbhanwariya6@gmail.com
		await transport.sendMail({
			from: useRuntimeConfig().public.EMAIL,
			to: email.toString(),
			subject: "Otp for Angelite Login/Booking",
			html: `<div style='text-align: center'>
			Otp for Angelite
			<h1>${otp}</h1>
		</div>`,
		});
		console.log(otp);
	} catch (error) {
		console.log(error);
		return { error: error, otp: 0 };
	}
	return { otp, error: null };
});
