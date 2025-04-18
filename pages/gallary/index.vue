<template>
	<div class="gallery-container">
		<div id="title" v-if="screenSize.width >= 1200">
			<div>
				<h1 class="my-5 text-4xl">Angelite Image Gallery</h1>
			</div>
			<div id="gallary-title"></div>
			<div></div>
		</div>
		<div
			id="gallary-title-mobile"
			v-else-if="screenSize.width < 600"
			class="h-[25vh]"
		>
			<div>
				<h1 class="my-5 ml-4 text-4xl">Angelite Image Gallery</h1>
			</div>
			<div></div>
		</div>
		<div id="title" v-else class="h-[25vh]">
			<div>
				<h1 class="my-5 ml-4 text-4xl">Angelite Image Gallery</h1>
			</div>
			<div id="gallary-title-tablet"></div>
		</div>
		<div id="images" v-if="screenSize.width >= 1200">
			<div class="image-grid">
				<div v-for="(image, i) in images" :key="i" class="image-item">
					<img :src="image" :alt="image" />
				</div>
			</div>
		</div>
		<div
			v-else-if="screenSize.width >= 600"
			class="grid grid-cols-2 gap-6 p-5"
		>
			<div v-for="(image, i) in images" :key="i">
				<img
					:src="image"
					:alt="image"
					class="transition-all rounded-lg hover:scale-105"
				/>
			</div>
		</div>
		<div v-else class="grid grid-cols-2 gap-6 p-5">
			<div v-for="(image, i) in images" :key="i">
				<img
					:src="image"
					:alt="image"
					class="transition-all rounded-lg hover:scale-110"
				/>
			</div>
		</div>
	</div>
</template>


<script setup lang="ts">
import { ref } from "vue";

import monvika from "~/assets/img/monvika-opening.jpg";
import monvika2 from "~/assets/img/monvika-2.jpeg";
import monvika3 from "~/assets/img/monvika-3.jpeg";
import rowdyMomo from "~/assets/img/rowdy-momo.jpg";
import rowdyMomo2 from "~/assets/img/rowdy-momo-2.jpg";
import bDay from "~/assets/img/birthday.jpg";
import bDay2 from "~/assets/img/birthday-2.png";

const images = ref([
	monvika2,
	monvika3,
	rowdyMomo2,
	bDay,
	monvika,
	bDay2,
	rowdyMomo,
]);

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
</script>

<style scoped>
#title {
	background-color: #fae0e9;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	color: salmon;
}
#title div {
	display: flex;
	align-items: center;
	justify-content: center;
}
#gallary-title {
	background-color: transparent;
	background-image: url(~/assets/img/angelite-logo-2.png);
	background-repeat: no-repeat;
	background-size: contain;
	padding: 200px 0;
	margin-bottom: 50px;
	text-align: center;
}
#gallary-title-tablet {
	background-color: transparent;
	background-image: url(~/assets/img/angelite-logo-2.png);
	background-repeat: no-repeat;
	background-size: cover;
	text-align: center;
}
#gallary-title-tablet div {
	display: flex;
	align-items: center;
	justify-content: start;
	margin-left: 20px;
}
#gallary-title-mobile {
	background-color: transparent;
	background-image: url(~/assets/img/angelite-logo-2.png);
	background-repeat: no-repeat;
	background-size: contain;
	text-align: center;
	color: salmon;
}
#gallary-title-mobile div {
	display: flex;
	align-items: center;
	justify-content: start;
	margin-left: 20px;
}
#gallary {
	background-color: #fff0f5;
	color: salmon;
	padding: 1rem;
}
#images {
	margin-left: auto;
	margin-right: auto;
	padding: 1rem;
	padding: 20px;
	max-width: 1200px;
	margin: 0 auto;
	@apply container;
}
#carousal-img button {
	color: white;
	background-color: rgba(100, 100, 100, 0.5);
}
#carousal-img button:active {
	background-color: rgba(100, 100, 100, 0.8);
}
#carousal-img button:hover {
	background-color: rgba(100, 100, 100, 0.8);
}
.gallery-container {
	text-align: center;
	background-color: #fae0e9;
}
.image-grid {
	display: grid;
	grid-template-columns: repeat(4, minmax(300px, 1fr));
	gap: 15px;
	column-gap: 30px;
}

.image-grid img {
	width: 100%;
	height: auto;
	border-radius: 10px;
	transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.image-grid img:hover {
	transform: scale(1.05);
	box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}
</style>
