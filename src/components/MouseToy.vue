<template>
	<div
		class="mouse-toy"
		:class="{
			'mouse-toy--is-hovering-clickable': isHoveringClickable,
			'mouse-toy--is-hovering-zoomable': isHoveringZoomable,
		}"
	>
		<div
			v-if="!isHoveringZoomable"
			class="mouse-toy__dot"
		/>
		<svg
			v-else
			class="mouse-toy__zoom-icon"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M15.3431 15.2426C17.6863 12.8995 17.6863 9.1005 15.3431 6.75736C13 4.41421 9.20101 4.41421 6.85786 6.75736C4.51472 9.1005 4.51472 12.8995 6.85786 15.2426C9.20101 17.5858 13 17.5858 15.3431 15.2426ZM16.7574 5.34315C19.6425 8.22833 19.8633 12.769 17.4195 15.9075C17.4348 15.921 17.4498 15.9351 17.4645 15.9497L21.7071 20.1924C22.0976 20.5829 22.0976 21.2161 21.7071 21.6066C21.3166 21.9971 20.6834 21.9971 20.2929 21.6066L16.0503 17.364C16.0356 17.3493 16.0215 17.3343 16.008 17.319C12.8695 19.7628 8.32883 19.542 5.44365 16.6569C2.31946 13.5327 2.31946 8.46734 5.44365 5.34315C8.56785 2.21895 13.6332 2.21895 16.7574 5.34315ZM10.1005 7H12.1005V10H15.1005V12H12.1005V15H10.1005V12H7.10052V10H10.1005V7Z"
				fill="currentColor"
			/>
		</svg>
	</div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import { computed, watch, ref } from 'vue';
import { useMousePosition } from '../composables/useMousePosition';
import { clamp } from '../utils/clamp';

const { mouseX, mouseY, rawMouseEvent } = useMousePosition();

const left = computed<string>(() => `${mouseX.value}px`);
const top = computed<string>(() => `${mouseY.value}px`);

const yDelta: Ref<number> = ref(0);
const xDelta: Ref<number> = ref(0);

let mouseMoveTimeout = null;
watch([mouseX, mouseY], ([x, y], [oldX, oldY]) => {
	yDelta.value = y - oldY;
	xDelta.value = x - oldX;

	// Clear delta when mouse isn't moved for 100ms
	// If we don't the center dot stays offset
	// TODO: Check performance on low end devices
	clearTimeout(mouseMoveTimeout);
	mouseMoveTimeout = setTimeout(() => {
		xDelta.value = 0;
		yDelta.value = 0;
	}, 100);
});

const isHoveringClickable = computed<boolean>(() => {
	const target = rawMouseEvent.value?.target as HTMLElement;
	return !!target?.closest('a') || !!target?.closest('button');
});

const isHoveringZoomable = computed<boolean>(() => {
	const target = rawMouseEvent.value?.target as HTMLElement;
	return !!target?.dataset.isZoomable;
});

// The bigger the value the less sensitive it is
const OFFSET_SENSITIVITY = 5;

const MAX_OFFSET = 1.0;
const MIN_OFFSET = -MAX_OFFSET;
const verticalDotOffset = computed<string>(
	() => `${clamp(MIN_OFFSET, yDelta.value / OFFSET_SENSITIVITY, MAX_OFFSET) * 100}%`,
);
const horizontalDotOffset = computed<string>(
	() => `${clamp(MIN_OFFSET, xDelta.value / OFFSET_SENSITIVITY, MAX_OFFSET) * 100}%`,
);
</script>
<style lang="scss" scoped>
.mouse-toy {
	$size: 20px;
	position: absolute;
	top: v-bind(top);
	left: v-bind(left);
	display: flex;
	width: $size;
	height: $size;
	align-items: center;
	justify-content: center;
	backdrop-filter: invert(1);
	border-radius: $size;
	border-radius: 999px;
	outline: 1px solid var(--color-light);
	pointer-events: none;
	// Center on mouse pointer
	transform: translate(-50%, -50%);
	transition: left 0.2s ease-out, top 0.2s ease-out, width 0.1s linear,
		height 0.1s linear, opacity 0.1s linear;

	&--is-hovering-clickable {
		$hoverSize: 60px;
		width: $hoverSize;
		height: $hoverSize;
		opacity: 0.9;
	}

	&--is-hovering-zoomable {
		$hoverSize: 60px;
		width: $hoverSize;
		height: $hoverSize;
		background: rgba(0,0,0,0.8);
		outline: none;
		transition: left 0.1s ease-out, top 0.1s ease-out, width 0.1s linear,
			height 0.1s linear, opacity 0.1s linear;
	}

	&__zoom-icon {
		color: var(--color-light);
	}

	&__dot {
		$size: 5px;
		width: $size;
		height: $size;
		background: var(--color-light);
		border-radius: $size;
		transform: translate(
			v-bind(horizontalDotOffset),
			v-bind(verticalDotOffset)
		);
		transition: transform 0.2s ease-out;
	}
}
</style>
