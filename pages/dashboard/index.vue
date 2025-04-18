<template>
	<div id="user-dashboard">
		<div id="admin-nav">
			<div id="admin-name">
				<div>
					<img src="/favicon.ico" width="30" height="30" />
				</div>
				<div class="leading-loose">
					{{
						user.name.length > 0
							? user.name[0].toUpperCase() + user.name.slice(1)
							: user.name
					}}
				</div>
			</div>
			<div id="nav-option-list">
				<button>
					<UIcon name="i-heroicons-arrow-left-solid" :size="22" />
					<a href="/"> Home </a>
				</button>
				<button
					@click="uiOption = 'events'"
					:class="uiOption == 'events' ? 'active' : ''"
				>
					<UIcon
						name="i-heroicons-calendar-days-20-solid"
						:size="22"
					/>
					Events
				</button>
				<button
					@click="uiOption = 'users'"
					:class="uiOption == 'users' ? 'active' : ''"
				>
					<UIcon name="i-heroicons-user-circle-16-solid" :size="22" />
					Users
				</button>
				<button @click="gotoAddBlog">
					<UIcon name="i-heroicons-plus" :size="22" />
					Add Blog
				</button>
			</div>
		</div>
		<div id="dashboard-ui">
			<template v-if="uiOption == 'events'">
				<div
					v-if="events.eventList.length == 0 && !error"
					class="flex content-center text-3xl text-center text-rose-300"
				>
					No Events Found
				</div>
				<div
					v-else-if="error"
					class="flex content-center text-3xl text-center text-red-500"
				>
					Internal Server Error
					<br />
					500
				</div>
				<div v-else class="flex flex-col justify-start">
					<div
						class="grid grid-cols-8 bg-pink-200 rounded-tl-lg rounded-tr-lg text-rose-500 text-start"
					>
						<div class="py-1 pl-3 border-r-2 border-rose-300">
							Name
						</div>
						<div class="py-1 pl-5 border-r-2 border-rose-300">
							Email
						</div>
						<div class="py-1 pl-5 border-r-2 border-rose-300">
							Phone no.
						</div>
						<div class="py-1 pl-5 border-r-2 border-rose-300">
							Event Type
						</div>
						<div class="py-1 pl-5 border-r-2 border-rose-300">
							Sub Event Type
						</div>
						<div class="py-1 pl-5 border-r-2 border-rose-300">
							Event Date
						</div>
						<div class="py-1 pl-5 border-r-2 border-rose-300">
							Address
						</div>
						<div class="py-1 pl-5 text-center">
							<label for="event-filter">
								Status:
								<select
									v-model="eventFilter"
									id="event-filter"
									class="text-center bg-transparent border-0"
								>
									<option value="all" selected>All</option>
									<option value="done">Done</option>
									<option value="soon">Soon</option>
								</select>
							</label>
						</div>
					</div>
					<template v-for="(event, i) in events.eventList">
						<div
							:key="i"
							:class="
								'grid grid-cols-8 bg-pink-200 border-t-2 text-rose-500 border-rose-500 text-start ' +
								(i == events.eventList.length - 1
									? 'rounded-br-lg rounded-bl-lg'
									: '')
							"
							v-if="
								eventFilter == 'all' ||
								(eventFilter == 'done' && event.isDone) ||
								(eventFilter == 'soon' && !event.isDone)
							"
						>
							<div class="py-1 pl-3 border-r-2 border-rose-300">
								{{ event.name }}
							</div>
							<div class="py-1 pl-3 border-r-2 border-rose-300">
								{{ event.email }}
							</div>
							<div class="py-1 pl-3 border-r-2 border-rose-300">
								{{ event.countryCode + "-" + event.phone }}
							</div>
							<div class="py-1 pl-5 border-r-2 border-rose-300">
								{{ event["event-type"] }}
							</div>
							<div class="py-1 pl-5 border-r-2 border-rose-300">
								{{ event["sub-event-type"] }}
							</div>
							<div class="py-1 pl-5 border-r-2 border-rose-300">
								{{ dobConverter(event["event-date"]) }}
							</div>
							<div class="py-1 pl-5 border-r-2 border-rose-300">
								{{ event.address }}
							</div>
							<div class="py-1 pl-5 text-center">
								<UIcon
									v-if="event.isDone"
									name="i-material-symbols-done-all-rounded"
									:size="20"
								/>
								<UIcon
									v-else
									name="i-hugeicons-coming-soon-02"
									:size="20"
								/>
							</div>
						</div>
					</template>
				</div>
			</template>
			<template v-else>
				<div
					v-if="users.length == 0 && !error"
					class="flex content-center text-3xl text-center text-rose-300"
				>
					No Users Found
				</div>
				<div
					v-else-if="error"
					class="flex content-center text-3xl text-center text-red-500"
				>
					Internal Server Error
					<br />
					500
				</div>
				<div v-else class="flex flex-col justify-start gap-y-5">
					<div
						v-for="(user, i) in users"
						:key="i"
						class="grid grid-cols-6 bg-pink-200 rounded-lg text-rose-500 text-start"
					>
						<div class="py-1 pl-3 border-r-2 border-rose-300">
							{{ user.name }}
						</div>
						<div class="py-1 pl-5 border-r-2 border-rose-300">
							{{ user.email }}
						</div>
						<div class="py-1 pl-5 border-r-2 border-rose-300">
							{{ `${user.countryCode}-${user.phone}` }}
						</div>
						<div class="py-1 pl-5 border-r-2 border-rose-300">
							{{ dobConverter(user["date_of_birth"]) }}
						</div>
						<div class="py-1 pl-5">
							{{ user.address }}
						</div>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>
<script setup lang="ts">
useHead({
	title: "Admin Dashboard",
});

let uiOption = ref<"events" | "users">("events");
let user = reactive({
	name: "",
	email: "",
	password: "",
	auth: "NONE",
});

function gotoAddBlog() {
	navigateTo("/create-blog");
}

let eventFilter = ref<"all" | "done" | "soon">("all");

let dobConverter = (dob: string) => {
	let dobSplited = dob.split("-");
	let date = dobSplited[0];
	let monthNo = Number(dobSplited[1]) - 1;
	let monthDict = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	let year = dobSplited[2];
	return `${date} ${monthDict[monthNo]} ${year}`;
};

let users = reactive<
	Array<{
		name: string;
		email: string;
		phone: string;
		countryCode: number;
		address: string;
		date_of_birth: string;
	}>
>([]);
let events = reactive<{
	eventList: Array<{
		id: string;
		name: string;
		email: string;
		phone: string;
		countryCode: string;
		address: string;
		"date-of-birth": string;
		"event-date": string;
		"event-type": string;
		"sub-event-type": string;
		isDone: boolean;
	}>;
}>({ eventList: [] });
let error = ref<Error | null>(null);

onMounted(async () => {
	let useLoggedIn = useCookie("auth");
	let data: {
		name: string;
		password: string;
		email: string;
		auth: AuthType;
	};
	if (!useLoggedIn.value) return;
	if (typeof useLoggedIn.value == "string")
		data = JSON.parse(useLoggedIn.value);
	else data = useLoggedIn.value;
	user = data;

	let usersData = await $fetch<{
		status: number;
		error: null;
		data:
			| [
					{
						name: string;
						email: string;
						phone: string;
						countryCode: number;
						address: string;
						date_of_birth: string;
					}
			  ]
			| null;
	}>("/api/users");
	if (usersData.error) {
		error.value = usersData.error;
		return;
	}
	if (usersData.data == null) return;
	users = usersData.data;

	let eventsData = await $fetch<{
		status: number;
		error: null;
		data: Array<{
			id: string;
			name: string;
			email: string;
			phone: string;
			countryCode: string;
			address: string;
			"date-of-birth": string;
			"event-date": string;
			"event-type": string;
			"sub-event-type": string;
		}> | null;
	}>("/api/events");
	if (eventsData.error) {
		error.value = eventsData.error;
		return;
	}
	if (eventsData.data == null) return;
	events.eventList = eventsData.data.map((el) => {
		return { ...el, isDone: eventIsDone(el["event-date"]) };
	});
});

function eventIsDone(data: string): boolean {
	let dateData = data.split("-");
	let date = +dateData[0];
	let month = +dateData[1] - 1;
	let year = +dateData[2];
	console.log(date, month, year);

	let dateNow = new Date();
	if (
		year <= dateNow.getFullYear() ||
		month <= dateNow.getMonth() ||
		date <= dateNow.getDate()
	)
		return true;
	else return false;
}

definePageMeta({
	middleware: ["admin-auth"],
});
</script>

<style scoped>
#user-dashboard {
	width: 100vw;
	height: 100vh;
	display: flex;
	column-gap: 5px;
	flex-direction: row;
	background: hsla(340, 100%, 100%, 0.925);
	align-content: center;
	text-align: center;
	color: salmon;
}
@media screen and (min-width: 600px) {
	#admin-nav {
		min-width: 8vw;
	}
}
#admin-nav {
	background: rgb(250, 242, 245);
	display: flex;
	height: 100%;
	padding: 5px 10px;
	text-align: start;
	flex-direction: column;
}
#admin-name {
	display: flex;
	padding: 5px 10px;
	flex-direction: row;
	column-gap: 5px;
	font-size: larger;
	font-family: "Courier New", Courier, monospace;
}
#admin-name img {
	mix-blend-mode: multiply;
}
#nav-option-list {
	padding: 0 3px;
	height: 100%;
	display: flex;
	flex-direction: column;
	row-gap: 5px;
}
#nav-option-list button {
	border-start-start-radius: 10px;
	border-end-start-radius: 10px;
	border-start-end-radius: 10px;
	border-end-end-radius: 10px;
	padding: 5px 7px;
	background: transparent;
	width: 100%;
	display: flex;
	flex-direction: row;
	align-content: space-evenly;
	column-gap: 5px;
}
#nav-option-list button:hover {
	background: rgb(245, 225, 225);
}
#nav-option-list .active {
	background: rgb(238, 213, 213);
}
#dashboard-ui {
	background: rgb(250, 242, 245);
	height: 100%;
	width: 100%;
	padding: 20px;
}
</style>