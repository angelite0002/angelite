<template>
	<div id="blog-page">
		<div v-if="blog.error.length">
			<h1>Blog does not exist</h1>
		</div>
		<div v-else class="flex flex-col gap-5">
			<div
				class="px-3 mr-10 border-2 border-l-4 border-r-0 border-red-400 rounded-lg"
			>
				<h1>{{ blog.title }}</h1>
				<template
					v-if="
						new Date().getMonth() == blog.month - 1 &&
						new Date().getFullYear() == blog.year
					"
					>This month</template
				>
				<template
					v-else-if="
						new Date().getMonth() == blog.month &&
						new Date().getFullYear() == blog.year
					"
					>Last month</template
				>
				<template v-else>
					{{ months[blog.month - 1] }} {{ blog.year }}
				</template>
			</div>

			<div
				v-html="blogMarked"
				class="p-3 mr-10 border-2 border-l-4 border-r-0 border-red-400 rounded-lg"
			></div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { marked } from "marked";
let id = useRoute().params.id;

let blog = reactive({
	error: "",
	title: "",
	id: "",
	content: "",
	month: 0,
	year: 0,
});

let months = [
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

async function loadBlog() {
	let data = await $fetch<{
		title: string;
		id: string;
		content: string;
		month: number;
		year: number;
		error: string;
	}>("/api/get-blog", {
		query: { id },
	});
	blog.id = data.id;
	blog.title = data.title;
	blog.content = data.content;
	blog.error = data.error;
	blog.month = data.month;
	blog.year = data.year;
}

loadBlog();
let blogMarked = computed(() => marked(blog.content));
</script>
<style>
#blog-page {
	text-align: start;
	min-height: 100vh;
	height: 100%;
	padding: 20px;
	color: salmon;
	background-color: #fae5ec;
	border-radius: 10px;
}

h1 {
	font-size: 2.25rem;
	font-weight: 700;
}
h2 {
	font-size: 1.875rem;
	font-weight: 700;
}
h3 {
	font-size: 1.5rem;
	font-weight: 700;
}
h4 {
	font-size: 1.25rem;
	font-weight: 700;
}
h5 {
	font-size: 1.125rem;
	font-weight: 700;
}
h6 {
	font-size: 1rem;
	font-weight: 700;
}
table {
	width: 80vw;
	text-align: center;
	border-collapse: collapse;
	border: 2px solid salmon;
}
thead {
	border: 2px solid salmon;
}
tbody {
	border: 2px solid salmon;
}
b {
	font-weight: bold;
}
i {
	font-style: italic;
}
</style>