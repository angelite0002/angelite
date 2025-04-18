export default defineNuxtRouteMiddleware(async (to, from) => {
	let useLoggedIn = useCookie("auth");
	if (!useLoggedIn.value) return navigateTo("/");

	let data: {
		name: string;
		password: string;
		email: string;
	};
	if (typeof useLoggedIn.value === "string")
		data = JSON.parse(useLoggedIn.value);
	else data = useLoggedIn.value;

	let login = await $fetch("/api/admins", {
		method: "post",
		body: JSON.stringify(data),
	});
	if (login.authenticated != "ADMIN") {
		navigateTo("/");
	}
});
