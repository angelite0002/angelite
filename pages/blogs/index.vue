<template>
	<div class="blogging-section">
		<h1 v-if="screenSize.width > 600">Our Latest Blogs</h1>
		<h1 v-else class="mobile">Our Latest Blogs</h1>
		<br />
		<div class="flex flex-col gap-4 px-4 text-start">
			<div v-for="(blog, i) in blogs" :key="i" class="blog">
				<div>
					<h2>
						<NuxtLink :href="'/blogs/' + blog.id">
							{{ blog.title }}
						</NuxtLink>
					</h2>
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
			</div>
		</div>
		<br />
		<div class="flex justify-center">
			<button
				class="flex items-center px-5 py-2 text-xl load-more gap-x-2"
				v-if="!limitedBlog"
			>
				<UIcon name="i-material-symbols-refresh" :size="22" />
				<p>Load more</p>
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
let blogCount = ref(0);
let limitedBlog = ref(false);
let blogs = reactive<
	{
		title: string;
		id: string;
		month: number;
		year: number;
	}[]
>([]);

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

let screenSize = reactive({
	width: 0,
	height: 0,
});

onMounted(() => {
	if (visualViewport) {
		screenSize.height = visualViewport.height;
		screenSize.width = visualViewport.width;
	}
});

useHead({
	title: "Blogs",
});
useSeoMeta({
	title: "Blogs",
	description: "Blogs uploaded by angelite admins",
});

async function loadBlogs() {
	let data = await $fetch<
		{
			title: string;
			id: string;
			month: number;
			year: number;
		}[]
	>("/api/all-blogs", {
		query: { "blog-frag": blogCount.value },
	});
	if (data.length < 5) limitedBlog.value = true;
	blogCount.value++;
	data.forEach((el) => blogs.push(el));
}
loadBlogs();
</script>

<style scoped>
.blogging-section {
	text-align: center;
	min-height: 100vh;
	height: 100%;
	padding: 20px;
	color: salmon;
	background-color: #fae5ec;
	border-radius: 10px;
}
.blogging-section h1:is(:not(.mobile)) {
	font-size: 4.5rem;
	margin-bottom: 10px;
}
h1 {
	font-size: 3rem;
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
.blog {
	background-color: rgb(255, 210, 228);
	border: 2px solid rgb(253, 230, 228);
	border-radius: 0.75rem;
	padding: 10px;
	padding-left: 20px;
}
.load-more {
	background-color: rgb(255, 210, 228);
	border: 2px solid rgb(253, 230, 228);
	border-radius: 0.75rem;
}
</style>