<template>
	<section class="about-us-section">
		<div class="about-us-container">
			<div class="about-text">
				<h1>
					<NuxtLink to="/">
						<UIcon name="i-heroicons-chevron-left"
					/></NuxtLink>
					About Angelite
				</h1>
				<div class="px-10">
					<h2>Introduction:</h2>
					<p>
						Angelite is a dynamic event management company committed
						to delivering innovative event solutions. Our mission is
						to turn every event into an unforgettable experience,
						tailored to the needs and desires of our client.
					</p>
					<h2>Our services:</h2>
					<ul>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;Corporate Events</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;Weddings</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;Private Celebrations</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;Personal Celebrations</li>
						<li>&nbsp;&nbsp;&nbsp;&nbsp;Product Launches</li>
						<li>
							&nbsp;&nbsp;&nbsp;&nbsp;Conferences and seminars
						</li>
					</ul>
					<br />
					<p>
						Our services are fully customizable to meet the specific
						needs and preferences of our clients.
					</p>
					<br />
					<div class="flex flex-row gap-5">
						<a href="mailto:angelite2420@gmail.com" target="_blank">
							<UIcon name="i-logos:google-gmail" :size="30" />
						</a>
						<a
							href="https://instagram.com/angelite2420"
							target="_blank"
						>
							<UIcon
								name="i-line-md:instagram"
								:size="34"
								class="insta-logo"
							/>
						</a>
						<a
							href="https://youtube.com/@angelite2420"
							target="_blank"
						>
							<UIcon name="logos:youtube-icon" :size="30" />
						</a>
					</div>
				</div>
			</div>
			<div class="about-image">
				<img
					class="w-full"
					:src="logo"
					alt="Angelite - Creating Memorable Events"
				/>
			</div>
		</div>
	</section>
</template>

<script setup>
useHead({
	title: "Angelite - About Us",
});
import logo from "~/assets/img/angelite-logo.jpg";
</script>
<style scoped>
.about-us-section {
	background-color: #ffffff;
	padding: 50px 20px;
	padding-bottom: 20px;
	width: 100%;
	height: 100%;
	color: #333;
}
h2 {
	font-size: x-large;
}
.about-us-container {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	justify-content: center;
}

.about-text {
	flex: 1 1 60%;
	margin-right: 20px;
}

.about-text h1 {
	font-size: 2.5em;
	margin-bottom: 20px;
	display: flex;
	flex-direction: row;
}
h1 a {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: end;
}
.about-text p {
	color: #666;
	font-size: 1.2em;
	margin-bottom: 20px;
}

.about-image {
	display: flex;
	justify-content: center;
}

.about-image img {
	max-width: 100%;
	border-radius: 10px;
}
.insta-logo {
	background-color: transparent;
	background-image: conic-gradient(#ac2bb1, #e1296c, #faaf42, #6541c3);
}
@media (max-width: 768px) {
	.about-us-container {
		flex-direction: column;
		text-align: center;
	}

	.about-text {
		margin: 0 0 20px 0;
	}

	.about-image img {
		width: 80%;
	}
}
</style>