<template>
	<div
		:class="'h-full min-h-[100vh] ' +
			(screenSize.width < 1200 ? 'flex flex-col' : 'grid grid-cols-2')
		"
		id="home"
	>
		<div v-if="screenSize.width < 1200" class="w-full">
			<header class="w-full" id="header-mobile">
				<NuxtLink to="/dashboard" v-if="adminData.auth == 'ADMIN'">
					<img
						v-if="screenSize.width < 600"
						src="~/assets/img/angelite-nobg.png"
						:class="`w-auto h-[20vh]`"
						id="navbar-logo"
					/>
					<img
						src="~/assets/img/angelite-nobg.png"
						v-else
						class="w-[20vw]"
						id="navbar-logo"
					/>
				</NuxtLink>
				<template v-if="screenSize.width < 600">
					<img
						src="~/assets/img/angelite-nobg.png"
						:class="`w-auto h-[20vh]`"
						id="navbar-logo"
					/>
				</template>
				<template v-else>
					<img
						src="~/assets/img/angelite-nobg.png"
						class="w-[20vw]"
						id="navbar-logo"
					/>
				</template>
			</header>
			<main class="w-full h-full px-5 mt-5">
				<div
					class="flex items-end justify-center"
					id="landing-info-mobile"
				>
					<div class="text-xl text-center text-wrap">
						It's time to make your event memorable with Angelite
					</div>
				</div>
				<div class="flex flex-row my-4 text-sm gap-x-5">
					<NuxtLink to="/sign-in" class="w-full h-full">
						<button class="login-btn-div-mobile">SIGN IN</button>
					</NuxtLink>
					<NuxtLink to="/feedback" class="w-full h-full">
						<button class="login-btn-div-mobile">FEEDBACK</button>
					</NuxtLink>
				</div>
				<UCarousel
					ref="carouselRef"
					v-slot="{ item }"
					:items="items"
					:prev-button="btn"
					:next-button="btn"
					:ui="{ item: 'basis-full' }"
					class="w-full overflow-hidden rounded-lg"
					arrows
				>
					<img
						v-if="screenSize.width < 600"
						:src="item"
						type="image/jpeg"
						draggable="false"
						class="h-[60vh] w-full"
					/>
					<img
						v-else
						:src="item"
						type="image/jpeg"
						draggable="false"
						class="h-[60vh] w-auto mx-auto"
					/>
				</UCarousel>
				<div
					class="text-[#fa8072] text-xl flex justify-center flex-col gap-5 mt-5 text-center"
				>
					<template v-if="imageIndex < 3">
						You Dream, We Plan &
					</template>
					<template v-else>
						<div class="flex justify-center">
							What are you waiting for?
						</div>
					</template>
					<div class="flex justify-center">
						<NuxtLink to="/book">
							<button id="login-btn">Let's Celebrate</button>
						</NuxtLink>
					</div>
				</div>
			</main>
			<footer id="mobile-footer">
				<ul class="grid w-full grid-cols-3 text-lg">
					<li class="flex justify-center angelite-nav">
						<NuxtLink to="/about" class="flex items-center gap-1">
							<UIcon name="i-heroicons-identification-20-solid" />
							About
						</NuxtLink>
					</li>
					<li class="flex justify-center angelite-nav">
						<NuxtLink to="/gallary" class="flex items-center gap-1">
							<UIcon name="i-solar-gallery-bold" />
							Gallery
						</NuxtLink>
					</li>
					<li class="flex justify-center angelite-nav">
						<NuxtLink to="/blogs" class="flex items-center gap-1">
							<UIcon
								name="i-material-symbols-edit-note-outline-rounded"
							/>
							Blogs
						</NuxtLink>
					</li>
				</ul>
			</footer>
		</div>
		<template v-else>
			<header id="landing-part-1">
				<NuxtLink to="/dashboard" v-if="adminData.auth == 'ADMIN'">
					<img
						src="~/assets/img/angelite-nobg.png"
						class="w-40 h-auto"
						id="navbar-logo"
					/>
				</NuxtLink>
				<img
					src="~/assets/img/angelite-nobg.png"
					class="w-40 h-auto"
					id="navbar-logo"
					v-else
				/>
				<div
					class="flex items-end justify-center w-3/4 px-20 mt-52"
					id="landing-info"
				>
					<div class="text-3xl text-center text-wrap">
						It's time to make your event memorable with Angelite
					</div>
				</div>
				<div class="login-btn-div">
					<NuxtLink to="/sign-in">
						<button id="login-btn">SIGN IN</button>
					</NuxtLink>
				</div>
				<div class="login-btn-div">
					<NuxtLink to="/feedback">
						<button id="login-btn">FEEDBACK</button>
					</NuxtLink>
				</div>
			</header>
			<div id="landing-part-2" class="block pt-5">
				<nav class="flex justify-end pr-5">
					<ul class="flex flex-row gap-[3vw] text-2xl">
						<li class="angelite-nav">
							<NuxtLink to="/">Home</NuxtLink>
						</li>
						<li class="angelite-nav">
							<NuxtLink to="/about">About</NuxtLink>
						</li>
						<li class="angelite-nav">
							<NuxtLink to="/gallary">Gallary</NuxtLink>
						</li>
						<li class="angelite-nav">
							<NuxtLink to="/blogs">Blogs</NuxtLink>
						</li>
					</ul>
				</nav>
				<div class="h-[70vh] w-full pr-5 mt-5 pl-14">
					<UCarousel
						ref="carouselRef"
						v-slot="{ item }"
						:items="items"
						:prev-button="btn"
						:next-button="btn"
						:ui="{ item: 'basis-full' }"
						class="overflow-hidden rounded-lg"
						arrows
					>
						<img
							:src="item"
							type="image/jpeg"
							draggable="false"
							class="h-[70vh] w-full"
						/>
					</UCarousel>
				</div>
				<div
					class="text-[#fa8072] text-3xl flex justify-center flex-col gap-5 mt-5 text-center"
				>
					<template v-if="imageIndex < 3">
						You Dream, We Plan &
					</template>
					<template v-else>
						<div class="flex justify-center">
							What are you waiting for?
						</div>
					</template>
					<div class="flex justify-center">
						<NuxtLink to="/book">
							<button id="login-btn">Let's Celebrate</button>
						</NuxtLink>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>
<script setup lang="ts">
useHead({
	title: "Angelite",
});
import type { UCarousel } from "#components";

let screenSize = reactive({
	width: 0,
	height: 0,
});

let adminData = reactive({
	name: "",
	email: "",
	password: "",
	auth: "NONE",
});

let btn: Button = {
	// @ts-ignore
	color: "transparent",
};

onMounted(() => {
	if (visualViewport) {
		screenSize.height = visualViewport.height;
		screenSize.width = visualViewport.width;
	}
	let useLoggedIn = useCookie("auth");
	if (!useLoggedIn.value) {
		adminData.auth = "NONE";
		return;
	}

	let data: {
		name: string;
		password: string;
		email: string;
		auth: AuthType;
	};
	if (typeof useLoggedIn.value === "string")
		data = JSON.parse(useLoggedIn.value);
	else data = useLoggedIn.value;
	adminData = data;
});

let carouselRef = ref<typeof UCarousel | null>(null);
onMounted(() => {
	setInterval(() => {
		if (!carouselRef.value) return;
		imageIndex.value = carouselRef.value.page;
		if (carouselRef.value.page === carouselRef.value.pages) {
			imageIndex.value = 0;
			return carouselRef.value.select(0);
		}
		carouselRef.value.next();
	}, 2000);
});

import angelite from "~/assets/img/angelite-logo.jpg";
import rowdyMomo from "~/assets/img/rowdy-momo.jpg";
import rowdyMomo2 from "~/assets/img/rowdy-momo-2.jpg";
import bDay from "~/assets/img/birthday.jpg";
import bDay2 from "~/assets/img/birthday-2.png";
import type { Button } from "@nuxt/ui/dist/runtime/types";

let imageIndex = ref(0);

let items = [angelite, bDay2, bDay, rowdyMomo, rowdyMomo2];
</script>
<style scoped>
#login-btn {
	background: transparent;
	border: 2px solid #fa8072;
	border-radius: 100px;
	padding: 10px;
	padding-left: 40px;
	padding-right: 40px;
	color: salmon;
	font-size: 20px;
}
.login-btn-div {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 75%;
	height: 15%;
}
.login-btn-div-mobile {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	background: transparent;
	border: 2px solid #fa8072;
	border-radius: 100px;
	padding: 10px;
	text-align: center;
}
#landing-info {
	font-size: 20px;
}
#landing-info-mobile {
	font-size: 15px;
}
#home {
	background-color: #fae5ec;
	filter: brightness(1.1);
	color: salmon;
	height: 100%;
	min-height: 100vh;
}
#header-mobile {
	background-color: rgb(253, 217, 229);
}
#mobile-footer {
	clear: both;
	position: sticky;
	width: 94vw;
	bottom: 2vh;
	background-color: rgb(245, 181, 202);
	@apply mx-[3vw] rounded-lg py-3;
}
#landing-part-1 {
	background-color: transparent;
}
:is(button[aria-label="Next"], button[aria-label="Prev"]) {
	background-color: transparent !important;
}
#landing-part-2 {
	color: black;
}
.angelite-nav {
	color: rgb(250, 110, 95);
}
.angelite-nav:hover {
	color: rgb(248, 79, 60);
}
</style>