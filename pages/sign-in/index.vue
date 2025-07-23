<template>
	<div id="login-page">
		<div
			:class="
				screenSize.width < 1200
					? screenSize.width < 600
						? 'login-form-mobile'
						: 'login-form-tablet'
					: 'login-form'
			"
			v-if="!isError && !loggedIn"
		>
			<MyCarousal :items="items" class="mb-10">
				<template #default="{ item }">
					<template v-if="item === 'login'">
						<form @submit="login">
							<label class="text-red-500">
								Name
								<template v-if="loginData.name.trim() == ''">
									required
								</template>
							</label>
							<input
								v-model="loginData.name"
								placeholder="Name"
								class="p-1 bg-white rounded-md"
							/>
							<label class="pt-2 text-red-500">
								Email
								<template v-if="loginData.email.trim() == ''">
									required
								</template>
								<template
									v-if="
										!(
											/[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+/.test(
												loginData.email
											) || !loginData.email.trim()
										)
									"
									>(Please enter in correct format)</template
								>
							</label>
							<input
								v-model="loginData.email"
								placeholder="Email"
								type="email"
								class="p-1 bg-white rounded-md"
							/>
							<label class="pt-2 text-red-500">
								Password
								<template
									v-if="loginData.password.trim() == ''"
								>
									required
								</template>
							</label>
							<input
								v-model="loginData.password"
								placeholder="Password"
								type="password"
								class="p-1 bg-white rounded-md"
							/>
							<div id="submit-div">
								<button
									id="submit"
									:disabled="
										!(
											loginData.name.trim() &&
											loginData.email.trim() &&
											loginData.password.trim() &&
											/[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+/.test(
												loginData.email
											)
										)
									"
									class="rounded-md"
								>
									Submit
								</button>
							</div>
							<UModal v-model="otpGot">
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
											@click="loginCheck"
											:disabled="
												otpInput < 1000 &&
												otpInput != otp
											"
										>
											Submit
										</button>
									</div>
								</div>
							</UModal>
						</form>
					</template>
					<template v-else>
						<form @submit="signIn">
							<label class="text-red-500">
								Name
								<template v-if="signinData.name.trim() == ''">
									required
								</template>
							</label>
							<input
								v-model="signinData.name"
								placeholder="Name"
								class="p-1 bg-white rounded-md"
							/>
							<label class="pt-2 text-red-500">
								Email
								<template v-if="signinData.email.trim() == ''">
									required
								</template>
								<template
									v-if="
										!(
											/[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+/.test(
												signinData.email
											) || !signinData.email.trim()
										)
									"
									>(Please enter in correct format)</template
								>
							</label>
							<input
								v-model="signinData.email"
								placeholder="Email"
								type="email"
								class="p-1 bg-white rounded-md"
							/>
							<label class="pt-2 text-red-500">
								Password
								<template
									v-if="signinData.password.trim() == ''"
								>
									required
								</template>
							</label>
							<input
								v-model="signinData.password"
								placeholder="Password"
								type="password"
								class="p-1 bg-white rounded-md"
							/>
							<label class="pt-2 text-red-500">
								Address
								<template
									v-if="signinData.address.trim() == ''"
								>
									required
								</template>
							</label>
							<input
								v-model="signinData.address"
								placeholder="Address"
								class="p-1 bg-white rounded-md"
							/>
							<label
								for="date-picker"
								class="pt-2 rounded-md"
								id="date-picker-label"
							>
								<div>Date of Birth:</div>
								<input
									type="date"
									id="date-picker"
									name="begin"
									placeholder="dd-mm-yyyy"
									min="01-01-1900"
									:max="
										new Date().toISOString().split('T')[0]
									"
									:ref="datePickerBtn"
									@click="mouseOutClick"
									v-model="signinData.DoB"
									class="p-1 bg-white rounded-md"
							/></label>
							<label class="pt-0 text-red-500">
								Phone Number
								<template
									v-if="
										!signinData.phoneNumber ||
										signinData.phoneNumber == '0'
									"
								>
									required
								</template>
								<template
									v-if="
										!/[0-9]+/.test(
											signinData.phoneNumber
										) && signinData.phoneNumber != ''
									"
								>
									(Only numbers are allowed)
								</template>
							</label>
							<div class="grid grid-cols-2 gap-5">
								<SelectCountyCode
									class="p-1 bg-white rounded-md"
									v-model="signinData.countryCode"
								/>
								<input
									v-model="signinData.phoneNumber"
									placeholder="Phone Number"
									type="number"
									min="0"
									class="w-full p-1 bg-white rounded-md"
								/>
							</div>
							<div id="submit-div">
								<button
									id="submit"
									:disabled="
										!(
											signinData.name.trim() &&
											signinData.email.trim() &&
											signinData.password.trim() &&
											/[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+/.test(
												signinData.email
											) &&
											signinData.address.trim() &&
											signinData.DoB &&
											signinData.countryCode &&
											!Number.isNaN(
												Number(signinData.phoneNumber)
											)
										)
									"
									class="rounded-md"
								>
									Submit
								</button>
							</div>
							<UModal v-model="otpGot">
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
												otpInput < 1000 &&
												otpInput != otp
											"
										>
											Submit
										</button>
									</div>
								</div>
							</UModal>
						</form>
					</template>
				</template>
				<template #indicator="{ onClick, page, active }">
					<button
						:disabled="active"
						:class="
							'justify-center rounded-full border-2 min-w-6 text-pink-500 py-1 px-3' +
							(active
								? ' bg-pink-300 border-pink-300'
								: ' bg-transparent border-pink-300')
						"
						@click="onClick(page)"
					>
						{{ page == 0 ? "Sign Up" : "Login (admins only)" }}
					</button>
				</template>
			</MyCarousal>
		</div>
		<div
			class="w-full text-5xl font-bold text-center text-pink-400"
			v-else-if="loggedIn"
		>
			Redirecting to dashboard
		</div>
		<div class="w-full text-5xl font-bold text-center text-red-500" v-else>
			Internal Server Error<br />500
		</div>
	</div>
</template>
<script lang="ts" setup>
import type { VNodeRef } from "vue";
import { UModal } from "#components";

useHead({
	title: "Angelite - Sign In",
});

let items = ["sign-up", "login"];

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

async function loginCheck() {
	let out = await $fetch<{
		token: string;
	}>("/api/admins", {
		method: "POST",
		body: JSON.stringify(loginData),
	});
	otpGot.value = false;
	if (out.token == "failed") return;
	const useLoggedIn = useCookie("auth");
	useLoggedIn.value = JSON.stringify({
		name: loginData.name,
		token: out.token,
	});
	loggedIn.value = true;
	otpGot.value = true;
	if (out.token == "failed") {
		alert("You are not an admin");
		navigateTo("/");
	}

	navigateTo("/dashboard");
}
let loggedIn = ref(false);
async function otpSubmit() {
	let data = {
		name: signinData.name,
		email: signinData.email,
		countryCode: signinData.countryCode,
		phoneNumber: signinData.phoneNumber,
		address: signinData.address,
		DoB: signinData.DoB,
	};
	let out: { error: Error | null } = await $fetch("/api/sign-in", {
		method: "POST",
		body: JSON.stringify(data),
	});
}

let loginData = reactive({
	name: "",
	password: "",
	email: "",
});

let signinData = reactive({
	name: "",
	email: "",
	countryCode: 91,
	address: "",
	password: "",
	DoB: new Date(),
	phoneNumber: "0",
	dateIsFocus: false,
});

let datePickerBtn = ref<null | VNodeRef>(null);
let otp = ref(0);
let otpRecieved = ref(false);
let otpInput = ref(0);
let isError = ref(false);
let otpGot = ref(false);

function mouseOutClick(e: MouseEvent) {
	if (!datePickerBtn.value) return;
	if (!(e.target instanceof HTMLElement)) return;
	if (datePickerBtn.value.contains(e.target)) signinData.dateIsFocus = false;
}

async function login(e: Event) {
	e.preventDefault();
	if (
		!(
			loginData.name.trim() &&
			loginData.email.trim() &&
			loginData.password.trim() &&
			/[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+/.test(loginData.email)
		)
	)
		return;
	let out: { otp: number; error: Error | null } = await $fetch(
		"/api/otp-generate/?email=" + loginData.email
	);
	if (out.error) isError.value = true;
	otp.value = out.otp;
	otpGot.value = true;
	otpRecieved.value = true;
}

async function signIn(e: Event) {
	e.preventDefault();
	if (
		!(
			signinData.name.trim() &&
			signinData.email.trim() &&
			signinData.email.match(/\w+@[a-zA-Z]+\.[a-zA-Z]+/) &&
			signinData.password.trim() &&
			signinData.address.trim() &&
			signinData.DoB &&
			signinData.countryCode &&
			!Number.isNaN(Number(signinData.phoneNumber))
		)
	)
		return;
	let out: { otp: number; error: Error | null } = await $fetch(
		"/api/otp-generate/?email=" + signinData.email
	);
	if (out.error) isError.value = true;
	otp.value = out.otp;
	otpGot.value = true;
	otpRecieved.value = true;
}
</script>

<style scoped>
#otp-modal {
	background: hsl(341, 82%, 89%);
	color: hsl(340, 100%, 70%);
}
#otp-modal button:disabled {
	background: hsl(340, 80%, 84%);
}
#otp-modal button {
	padding: 5px 10px;
	border-radius: 10px;
	background: hsl(340, 96%, 82%);
}
#otp-input {
	background: hsl(340, 89%, 83%);
	padding: 5px 10px;
	color: black;
	border-radius: 10px;
}
.login-form,
.login-form-tablet {
	background: transparent
		radial-gradient(circle at top, hsl(340, 100%, 89%), white);
	height: 100%;
	padding: 100px;
	width: 100%;
	margin: 5vh 5rem;
	box-shadow: 0px 0px 50px hsl(341, 23%, 84%);

	color: black;
	padding-bottom: 10rem;
}
.login-form form,
.login-form-tablet form {
	display: flex;
	width: 100%;
	min-height: 50vh;
	flex-direction: column;
	gap: 10px;
}
.login-form-mobile {
	background: transparent
		radial-gradient(circle at top, hsl(340, 100%, 89%), white);
	height: 100%;
	padding: 25px;
	width: 100%;
	margin: 5vh 1rem;
	box-shadow: 0px 0px 50px hsl(341, 23%, 84%);
	color: black;
}
.login-form-mobile form {
	display: flex;
	width: 100%;
	min-height: 50vh;
	flex-direction: column;
	gap: 10px;
}
#login-page {
	width: 100vw;
	height: 100vh;
	display: flex;
	padding-bottom: 10vh;
	background: hsla(342, 67%, 94%, 0.9);
	align-content: center;
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