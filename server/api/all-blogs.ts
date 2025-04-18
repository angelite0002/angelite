export default defineEventHandler(async (event) => {
	let blogFragment = getQuery(event)["blog-frag"];
	let res = await fetch(
		"http://localhost:8000/blogs?blogFrag=" + blogFragment?.toString()
	);

	let data: {
		title: string;
		id: string;
		month: number;
		year: number;
	}[] = await res.json();

	return data;
});
