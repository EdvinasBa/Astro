<template>
	<Teleport to="#popup-target">
		<div
			class="popup"
		>
			<button
				class="popup__previous-button"
				title="Go to previous"
				@click="$emit('click-previous')"
			/>
			<slot />
			<button
				class="popup__next-button"
				title="Go to next"
				@click="$emit('click-next')"
			/>
			<button
				class="popup__close-button heading-l"
				title="Close popup"
				@click="$emit('click-close')"
			>
				close
			</button>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

const emit = defineEmits(['click-next', 'click-previous', 'click-close']);

const handleNavigation = (event: KeyboardEvent) => {
	switch (event.key) {
	case 'ArrowLeft':
		emit('click-previous');
		break;
	case 'ArrowRight':
		emit('click-next');
		break;
	case 'Escape':
		emit('click-close');
		break;
	default:
		break;
	}
};

onMounted(() => {
	document.addEventListener('keydown', handleNavigation);
});

onUnmounted(() => {
	document.removeEventListener('keydown', handleNavigation);
});
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
	grid-template-columns: 1fr auto 1fr;
	grid-template-rows: 100%;
	place-content: center;

	$this: &;

	&__close-button {
		align-self: start;
		cursor: pointer;
		grid-column: 1/-1;
		justify-self: end;
	}

	&__previous-button, &__next-button, &__close-button {
		border: none;
		appearance: none;
		background: none;
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
