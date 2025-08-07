<template>
	<div class="testimonials-page">
		<h1>Feedback and Testimonials</h1>

		<!-- Feedback Form -->
		<div class="feedback-form">
			<h2>Share Your Feedback</h2>
			<form @submit.prevent="submitFeedback">
				<div>
					<label for="name">Name:</label>
					<input
						type="text"
						id="name"
						v-model="newFeedback.name"
						placeholder="Enter your name"
						required
					/>
				</div>
				<div>
					<label for="message">Feedback:</label>
					<textarea
						id="message"
						v-model="newFeedback.message"
						placeholder="Enter your feedback"
						required
					></textarea>
				</div>
				<div class="flex flex-row justify-center space-x-1">
					<button
						v-for="i in 5"
						:key="i"
						class="text-2xl bg-transparent"
						@click="
							newFeedback.rating = newFeedback.rating == i ? 0 : i
						"
					>
						{{ newFeedback.rating >= i ? "★" : "☆" }}
					</button>
				</div>
				<button type="submit" id="submit-feedback">Submit</button>
			</form>
		</div>
	</div>
</template>

<script lang="ts">
useHead({
	title: "Send us your feedback",
});
useSeoMeta({
	title: "Send us your feedback",
});

export default {
	data() {
		return {
			feedbacks: Array<{
				name: string;
				message: string;
				rating: number;
			}>(),
			newFeedback: {
				name: "",
				message: "",
				rating: 0,
			},
		};
	},
	methods: {
		async submitFeedback() {
			if (
				this.newFeedback.name &&
				this.newFeedback.message &&
				this.newFeedback.rating
			) {
				let res: { statusCode: number } = await $fetch(
					"/api/send-feedback",
					{
						method: "POST",
						body: {
							name: this.newFeedback.name,
							msg: this.newFeedback.message,
							rating: this.newFeedback.rating,
						},
					}
				);
				if (res.statusCode == 200)
					alert("Thank you for your feedback!");
				else createError("Cannot send feedback.");
			}
		},
	},
};
</script>

<style>
h1 {
	font-size: 50px;
}
h2 {
	font-size: 40px;
}
input:focus-within {
	outline: none;
}
textarea:focus-within {
	outline: none;
}
:is(input, textarea) {
	border: 2px solid #fa8072;
	background-color: transparent;
}
.testimonials-page {
	font-family: Arial, sans-serif;
	padding: 20px;
	max-width: 800px;
	margin: 0 auto;
}
body {
	background-color: #fae5ec !important;
	color: salmon;
}

.feedback-form {
	margin-bottom: 40px;
	padding: 20px;
	border-radius: 5px;
	border: 2px solid #fa8072;
}

.feedback-form label {
	display: block;
	margin: 10px 0 5px;
}
.feedback-form input,
.feedback-form textarea,
.feedback-form select {
	width: 100%;
	padding: 8px;
	margin-bottom: 10px;
	border-radius: 4px;
}

#submit-feedback {
	background-color: #fa8072;
	color: white;
	border: none;
	padding: 10px 20px;
	border-radius: 5px;
	cursor: pointer;
}

#submit-feedback:hover {
	background-color: #f07769;
}
</style>