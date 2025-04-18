<script setup lang="ts" generic="T = string">
defineProps<{
	// @ts-ignore
	items: T[];
	bgColor?: string;
	class?: string;
}>();

let currentPage = ref(0);

function changePage(page: number) {
	currentPage.value = page;
}
</script>

<template>
	<div>
		<div :class="($props.class ?? '') + (bgColor ? ' bg-' + bgColor : '')">
			<template v-for="(item, i) in items">
				<slot name="default" :item="item" v-if="i == currentPage" />
			</template>
		</div>
		<div class="flex flex-row justify-center gap-x-5">
			<template v-for="(item, i) in items">
				<slot
					name="indicator"
					:page="i"
					:onClick="changePage"
					:active="i == currentPage"
				></slot>
			</template>
		</div>
	</div>
</template>