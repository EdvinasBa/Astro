<template>
	<Teleport to="#popup-target">
		<div
			class="popup"
		>
			<div
				class="popup__previous-button"
				@click="$emit('click-previous')"
			>
				previous
			</div>
			<slot />
			<div
				class="popup__next-button"
				@click="$emit('click-next')"
			>
				next
			</div>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
defineEmits(['click-next', 'click-previous', 'close']);
</script>

<style lang="scss" scoped>
.popup {
	position: fixed;
	z-index: 1;
	top: 0;
	left: 0;
	display: grid;
	width: 100%;
	height: 100%;
	padding: 64px;
	background: rgba(255,255,255,1);
	cursor: zoom-out;
	grid-template-columns: 1fr auto 1fr;
	grid-template-rows: 100%;
	place-content: center;

	$this: &;

	&:where(.img,#{$this}__previous-button,.next) {
		grid-row: 1/-1;
	}

	&__previous-button {
		cursor: w-resize;
		grid-column: 1/2;
	}

	&__next-button {
		cursor: e-resize;
		grid-column: 3/4;
	}
}
</style>
