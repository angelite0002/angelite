export default defineEventHandler(async (event) => {
	let name = getQuery(event)["name"];
	let token = getQuery(event)["token"];
	const body: {
		title: string;
		content: string;
		month: number;
		year: number;
	} = await readBody(event);
	const { title, content, month, year } = body;

	let res = await fetch(
		useRuntimeConfig().public.BACKEND +
			"add-blog?name=" +
			name +
			"&token=" +
			token,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ title, content, month, year }),
		}
	);
	let data: { status: number; error: string } = await res.json();
	if (data.status !== 200) console.error(data);
	return data;
});
