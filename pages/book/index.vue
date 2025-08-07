<template>
	<div :id="screenSize.width > 700 ? 'book-event' : 'book-event-mobile'">
		<UCarousel
			:items="items"
			:ui="{
				item: 'basis-full',
				container: 'rounded-lg',
			}"
			arrows
			ref="carouselRef"
			class="w-[90vw] mx-auto"
		>
			<template #default="{ item }">
				<div
					class="flex flex-col justify-center w-screen gap-5"
					v-if="item === 'eventType'"
				>
					<button
						v-for="(btn, index) in eventType"
						:key="index"
						:class="
							(index == selectType
								? 'bg-red-300 text-red-400'
								: 'bg-transparent text-red-300') +
							' ' +
							(screenSize.width >= 600
								? 'w-[80vw] ml-[10vw]'
								: 'ml-[5vw] w-[80vw]') +
							' border-red-300 border-2 p-1 rounded-2xl text-lg'
						"
						@click="selectType = index"
					>
						{{ btn }}
					</button>
				</div>
				<div
					v-else-if="item === 'subEventType'"
					class="flex flex-col justify-center w-full gap-5 p-5"
				>
					<button
						v-for="(btn, index) in subEventType[selectType]"
						:key="index"
						:class="
							(index == subEventTypeSelect
								? 'bg-red-300 text-red-400'
								: 'bg-transparent text-red-300') +
							' border-red-300 border-2 p-1 rounded-2xl w-auto text-lg'
						"
						@click="subEventTypeSelect = index"
					>
						{{ btn }}
					</button>
				</div>
				<div
					v-else-if="!(item == 'eventType' || item == 'subEventType')"
					class="flex flex-col items-center w-full gap-5 p-5"
				>
					<input
						v-model="name"
						placeholder="Name"
						class="p-1 bg-white rounded-md"
					/>
					<input
						v-model="email"
						placeholder="Email"
						type="email"
						class="p-1 bg-white rounded-md"
					/>
					<input
						v-model="address"
						placeholder="Address"
						class="p-1 bg-white rounded-md"
					/>
					<label
						for="date-picker"
						class="flex items-center gap-2 p-1 rounded-md"
						id="date-picker-label"
					>
						<div class="text-black">Date of Birth:</div>
						<input
							type="date"
							id="date-picker"
							placeholder="Date of Birth"
							v-model="DoB"
							class="p-1 bg-white rounded-md"
					/></label>
					<label
						for="date-picker"
						class="items-center gap-2 p-1 rounded-md"
						id="date-picker-label"
					>
						<div class="text-black">Date of Event:</div>
						<input
							type="date"
							id="date-picker"
							placeholder="Date of Birth"
							v-model="eventDate"
							class="p-1 bg-white rounded-md"
					/></label>
					<div v-if="screenSize.width >= 600" class="flex gap-5">
						<SelectCountyCode
							class="p-1 bg-white rounded-md"
							v-model="countryCode"
						/>
						<input
							v-model="phoneNumber"
							placeholder="Phone Number"
							type="number"
							min="0"
							class="w-full p-1 bg-white rounded-md"
						/>
					</div>
					<template v-else>
						<SelectCountyCode
							class="p-1 bg-white rounded-md"
							v-model="countryCode"
						/>
						<input
							v-model="phoneNumber"
							placeholder="Phone Number"
							type="number"
							min="0"
							class="w-full p-1 bg-white rounded-md"
						/>
					</template>
					<div id="submit-div">
						<button
							id="submit"
							@click="login"
							class="rounded-md"
							:disabled="
								!(
									Boolean(DoB) &&
									Boolean(eventDate) &&
									Boolean(name.trim()) &&
									Boolean(email.trim()) &&
									Boolean(address.trim()) &&
									Boolean(String(phoneNumber).trim())
								) || otpWorkDone
							"
						>
							Submit
						</button>
					</div>
					<UModal v-model="otpRecieved">
						<div
							id="otp-modal"
							class="flex flex-col justify-center gap-5 p-5 text-center"
						>
							<h1 class="text-4xl font-bold">
								Enter OTP sent to your email
							</h1>
							<div>
								<input
									class="w-1/2"
									min="0"
									type="number"
									v-model="otpInput"
									id="otp-input"
								/>
							</div>
							<div class="flex justify-center">
								<button
									@click="otpSubmit"
									:disabled="
										otpInput < 1000 && otpInput != otp
									"
								>
									Submit
								</button>
							</div>
						</div>
					</UModal>
				</div>
			</template>
			<template #prev="{ onClick, disabled }">
				<button
					:disabled="disabled"
					@click="
						() => {
							onClick();
							subEventTypeSelect = -1;
						}
					"
				>
					Prev
				</button>
			</template>

			<template #next="{ onClick, disabled }">
				<button
					:class="
						disabled ||
						selectType == -1 ||
						(carouselRef.page == 2 && subEventTypeSelect == -1)
							? 'hidden'
							: ''
					"
					:disabled="
						disabled ||
						selectType == -1 ||
						(carouselRef.page == 2 && subEventTypeSelect == -1)
					"
					@click="onClick"
				>
					Next
				</button>
			</template>
		</UCarousel>
	</div>
</template>
<script setup lang="ts">
import type { UCarousel } from "#build/components";
import type { VNodeRef } from "vue";

useHead({
	title: "Angelite - Book Event",
});
useSeoMeta({
	title: "Angelite - Book Event",
	description: "Book your events",
});

function otpSubmit() {
	let data = {
		name: name.value,
		email: email.value,
		phoneNumber: String(phoneNumber.value),
		dateOfBirth: DoB.value,
		eventDate: eventDate.value,
		eventType: selectType.value,
		subEventType: subEventTypeSelect.value,
	};
	otpRecieved.value = false;
	otpWorkDone.value = true;
}

let otpWorkDone = ref(false);

let carouselRef = ref<typeof UCarousel | null | VNodeRef>(null);
let selectType = ref(-1);
let subEventTypeSelect = ref(-1);

let items = ["eventType", "subEventType", ""];

let eventType = [
	"Social Event/ सामाजिक समारोह",
	"Personal Event/ व्यक्तिगत समारोह",
	"Professional Event/ व्यवसायिक समारोह",
	"Political Event/ राजनीतिक समारोह",
	"Cultural Event/ संस्कृतिक समारोह",
	"Others Event/ अन्य समारोह",
];
let subEventType = [
	[
		"Wedding/ विवाह",
		"Engagement/ सगाई",
		"Baby Shower/ गोद भराई",
		"Tonsure/ मुंडन",
		"Others/ अन्य",
	],
	[
		"Birthday/ जन्मदिन",
		"Anniversay/ सालगिरह",
		"House Blessing/ गृहप्रवेश",
		"Others/ अन्य",
	],
	["Product launch", "Workshop", "Promotional", "Opening", "Conference"],
	["Rally", "Conference"],
	["School/ College Events", "Festivals", "Others/ अन्य"],
	["Sports Event", "Concert", "Others/ अन्य"],
];
let name = ref("");
let email = ref("");
let countryCode = ref(91);
let address = ref("");
let DoB = ref(new Date());
let eventDate = ref(new Date());
let phoneNumber = ref("");
let otp = ref(0);
let otpRecieved = ref(false);
let otpInput = ref(0);

async function login(e: Event) {
	e.preventDefault();
	if (
		!(
			name.value.trim() &&
			email.value.trim() &&
			address.value.trim() &&
			String(phoneNumber.value).trim() &&
			eventDate.value &&
			DoB.value
		)
	)
		return;
	let out: { otp: number } = await $fetch(
		"/api/otp-generate/?email=" + email.value
	);
	otp.value = out.otp;
	console.log(otp.value);
	otpRecieved.value = true;
}

let screenSize = reactive({
	width: 0,
	height: 0,
});

onMounted(() => {
	selectType.value = -1;
	subEventTypeSelect.value = -1;
	if (visualViewport) {
		screenSize.height = visualViewport.height;
		screenSize.width = visualViewport.width;
	}
});
</script>
<style scoped>
#book-event {
	background: #fae5ec;
	text-align: center;
	color: salmon;
	padding: 30px;
	align-content: center;
	width: 100vw;
	height: 100vh;
	display: flex;
	display: flex;
	flex-direction: column;
	gap: 10px;
}
#book-event-mobile {
	background: #fae5ec;
	text-align: center;
	color: salmon;
	padding: 20px;
	align-content: center;
	width: 100vw;
	height: 100vh;
	display: flex;
	display: flex;
	flex-direction: column;
	gap: 10px;
}
#submit-div {
	display: flex;
	justify-content: center;
}
#submit {
	padding: 5px 10px;
	font-size: large;
	color: white;
	border-radius: 10px;
	background: hsl(340, 89%, 83%);
}

#date-picker-label {
	display: flex;
	justify-content: space-evenly;
}
</style>