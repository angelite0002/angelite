export default defineEventHandler(async (event) => {
	let blogId = getQuery(event)["id"];
	if (blogId?.toString().length !== 24)
		return { error: "Blog does not exist" };
	let res = await fetch(
		useRuntimeConfig().public.BACKEND + "get-blog?id=" + blogId.toString(),
		{
			method: "POST",
			headers: {
				Accept: "application/json",
			},
		}
	);

	let data: {
		title: string;
		id: string;
		content: string;
		month: number;
		year: number;
		error?: string;
	} = await res.json();

	return !data.error
		? { ...data, error: "" }
		: {
				error: data.error,
				title: "",
				content: "",
				id: "",
				month: 0,
				year: 0,
		  };
});
