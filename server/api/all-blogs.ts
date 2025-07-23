export default defineEventHandler(async (event) => {
	let blogFragment = getQuery(event)["blog-frag"];
	let res = await fetch(
		useRuntimeConfig().public.BACKEND +
			"blogs?blogFrag=" +
			blogFragment?.toString(),
			{
				method: "POST",
				headers: {
					accept: "application/json",
				},
			}
	);

	let data: {
		title: string;
		id: string;
		month: number;
		year: number;
	}[] = await res.json();

	return data;
});
