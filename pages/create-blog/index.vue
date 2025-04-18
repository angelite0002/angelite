<template>
	<div id="create-blog">
		<section
			id="markdown-editor"
			:class="
				blogStatus.status == 0
					? 'grid grid-cols-2 w-full'
					: 'text-center'
			"
		>
			<template v-if="blogStatus.status == 0">
				<div class="flex flex-col gap-4">
					<div class="grid grid-cols-2">
						<div class="flex flex-row">
							<input
								type="file"
								v-on:change="addImg"
								id="add-img"
							/>
							<label
								for="add-img"
								class="flex items-center gap-1 px-3 py-1 img-upload-btn"
							>
								<UIcon
									name="i-heroicons-cloud-arrow-up-16-solid"
									:size="20"
								/>
								Image
							</label>
							<div>
								<button
									class="flex items-center gap-1 px-3 py-1 img-upload-btn"
									@click="confirmImg"
									:disabled="!fileInput"
								>
									{{
										!fileInput
											? "No Image"
											: "Confirm Image"
									}}
								</button>
							</div>
						</div>
						<div class="flex flex-row-reverse">
							<button
								:disabled="
									!(!!mdText.trim() && !!blogTitle.trim())
								"
								@click="uploadBlog"
								class="flex items-center gap-1 px-3 py-1 img-upload-btn"
							>
								Add Blog
							</button>
						</div>
					</div>
					<div class="flex gap-2">
						<label for="title">Enter blog title (Required):</label>
						<input type="text" id="title" v-model="blogTitle" />
					</div>
					<Codemirror
						v-model="mdText"
						:extensions="ext"
						:style="{
							height: `${size.height - 100}px`,
						}"
					/>
				</div>
				<div
					:class="`w-[${size.width / 3}px] h-[${
						size.height - 100
					}px]`"
					v-html="mdOut"
				></div>
			</template>
			<template v-else-if="blogStatus.status == 500">
				<h1>Internal Server Error</h1>
			</template>
			<template v-else>
				<h1>Blog Added Successfully</h1>
			</template>
		</section>
		<section id="how-to-markdown">
			<h1>How to Markdown?</h1>
			<h4>I will just tell how to use it</h4>
			<br />
			<table border="1">
				<thead>
					<tr>
						<th><h3>Syntax</h3></th>
						<th><h3>Output</h3></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>## Hello</td>
						<td>
							<h2>Hello</h2>
						</td>
					</tr>
					<tr>
						<td>### Hello</td>
						<td>
							<h3>Hello</h3>
						</td>
					</tr>
					<tr>
						<td>#### Hello</td>
						<td>
							<h4>Hello</h4>
						</td>
					</tr>
					<tr>
						<td>##### Hello</td>
						<td>
							<h5>Hello</h5>
						</td>
					</tr>
					<tr>
						<td>###### Hello</td>
						<td>
							<h6>Hello</h6>
						</td>
					</tr>
					<tr>
						<td>**Hello**</td>
						<td>
							<b>Hello</b>
						</td>
					</tr>
					<tr>
						<td>*Hello*</td>
						<td>
							<i>Hello</i>
						</td>
					</tr>
					<tr>
						<td>__Hello__</td>
						<td>
							<b>Hello</b>
						</td>
					</tr>
					<tr>
						<td>_Hello_</td>
						<td>
							<i>Hello</i>
						</td>
					</tr>
					<tr>
						<td>`Hello`</td>
						<td>
							<code>Hello</code>
						</td>
					</tr>
					<tr>
						<td>[Hello](https://google.com)</td>
						<td>
							<a href="https://google.com">Hello</a>
						</td>
					</tr>
				</tbody>
			</table>
		</section>
	</div>
</template>

<script setup lang="ts">
import { Codemirror } from "vue-codemirror";
import { marked } from "marked";
import { githubLight } from "@uiw/codemirror-theme-github";

import { markdown } from "@codemirror/lang-markdown";

useHead({
	title: "Create Blog",
});

function addImg(payload: Event) {
	if (!(payload.target instanceof HTMLInputElement)) return;
	let file = payload.target.files?.[0];
	if (!file) return;
	fileInput.value = file;
}
let fileInput = ref<null | File>(null);
let ext = [markdown(), githubLight];

function confirmImg() {
	if (!fileInput.value) return;
	let reader = new FileReader();
	reader.onload = () => {
		mdText.value += `![Image](${reader.result})\n`;
	};
	reader.readAsDataURL(fileInput.value);
	fileInput.value = null;
}

let size = reactive({
	width: 800,
	height: 800,
});
onMounted(() => {
	if (!visualViewport) return;
	size.width = visualViewport.width;
	size.height = visualViewport.height;
});
let mdText = ref("");
let blogTitle = ref("");

let blogStatus = reactive({ status: 0, error: "" });

let mdOut = computed(() => marked(mdText.value));
async function uploadBlog() {
	if (!(!!mdText.value.trim() && !!blogTitle.value.trim())) return;
	let dateNow = new Date(Date.now());
	let data = {
		title: blogTitle.value.trim(),
		content: mdText.value.trim() + "\n",
		month: dateNow.getMonth() + 1,
		year: dateNow.getFullYear(),
	};
	let res = await $fetch("/api/blog-add", {
		method: "POST",
		body: JSON.stringify(data),
	});
	blogStatus.status = res.status;
	blogStatus.error = res.error;
}

definePageMeta({
	middleware: ["admin-auth"],
});
</script>

<style>
#create-blog {
	background: rgb(250, 242, 245);
	width: 100vw;
	height: 100%;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 50px;
	color: salmon;
}
#add-img {
	display: none;
}
.img-upload-btn {
	background: rgb(248, 214, 211);
	border: 2px solid rgb(253, 230, 228);
	border-radius: 0.375rem;
}
#markdown-editor {
	column-gap: 50px;
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
#how-to-markdown {
	margin-top: 30px;
	padding: 20px;
	border-top: 3px solid salmon;
	width: 90vw;
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
#create-blog a {
	color: rgb(226, 105, 91);
	text-decoration: underline !important;
}
#title {
	background-color: rgb(255, 228, 239);
	border: 2px solid rgb(252, 187, 211);
	@apply rounded-md px-2 py-0.5;
}
#title:focus {
	outline: none;
	border: 2px solid rgb(253, 162, 195);
}
</style>