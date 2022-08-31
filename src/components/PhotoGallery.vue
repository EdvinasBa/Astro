<!-- eslint-disable vue/no-v-html -->
<template>
	<div class="photos">
		<div class="photos__inner">
			<div
				v-for="(image, index) in images"
				:key="index"
				class="photos__photo"
				:style="{
					left:
						isDragging && index === movedImageIndex
							? percentageFromScreenLeft
							: remappedImageData[index]?.left || imageData[index].left + '%',
					top:
						isDragging && index === movedImageIndex
							? percentageFromScreenTop
							: remappedImageData[index]?.top || imageData[index].top + '%',
					width:
						(remappedImageData[index]?.width || imageData[index].width )+ '%',
				}"
				data-is-zoomable="true"
				@dragstart.prevent
				@click="openImageIndex = index"
				v-html="image.style + image.img"
			/>
		</div>
	</div>

	<template v-if="!!openImageIndex">
		<Popup
			@click-next="openNextImage"
			@click-previous="openPreviousImage"
			@click-close="closePopup"
		>
			<div
				class="popup-image"
				v-html="images[openImageIndex].img"
			/>
		</Popup>
	</template>
</template>

<script setup lang="ts">
import {
	ref, computed, onMounted, toRefs,
} from 'vue';
import type { Ref } from 'vue';

import Popup from './Popup.vue';

import { useDrag } from '../composables/useDrag';
import { useMousePosition } from '../composables/useMousePosition';

interface IProps {
	images: Array<string>;
	imageData: Array<Object>;
}

const props = defineProps<IProps>();
const { images, imageData } = toRefs(props);

// #region Mouse move animations
const { mouseX, mouseY } = useMousePosition();
const screenWidth: Ref<number> = ref(null);
const screenHeight: Ref<number> = ref(null);

const scale: Ref<number> = ref(1);

onMounted(() => {
	screenWidth.value = window.innerWidth;
	screenHeight.value = window.innerHeight;
	scale.value = 2;
});

// Default percentages to top right corner of screen since when you enter the page
// The mouse is most likely to be in that position
// And this prevents janky animation
const percentageFromScreenLeft = computed<string>(() => {
	const hasUserInteracted = screenWidth.value && mouseX.value;

	return hasUserInteracted
		? `${Math.round((mouseX.value / screenWidth.value) * 100)}%`
		: '50%';
});

const percentageFromScreenTop = computed<string>(() => {
	const hasUserInteracted = screenHeight.value && mouseY.value;

	return hasUserInteracted
		? `${Math.round((mouseY.value / screenHeight.value) * 100)}%`
		: '50%';
});

// #endregion

// #region Popup logic
const openImageIndex: Ref<number> = ref(null);

const openNextImage = () => {
	openImageIndex.value += 1;
};

const openPreviousImage = () => {
	openImageIndex.value -= 1;
};

const closePopup = () => {
	openImageIndex.value = null;
};

// #endregion

// #region Dragging images for placement, used for development only
const { startDragging, isDragging } = useDrag();
const movedImageIndex: Ref<number> = ref(null);
const remappedImageData: Ref<Array<object>> = ref([]);

// eslint-disable-next-line no-unused-vars
const startMovingImage = (index) => {
	if (remappedImageData.value.length === 0) {
		remappedImageData.value = JSON.parse(JSON.stringify(imageData.value));
	}
	movedImageIndex.value = index;

	startDragging({
		onDragEnd: () => {
			remappedImageData.value[movedImageIndex.value] = {
				...remappedImageData.value[movedImageIndex.value],
				left: parseInt(percentageFromScreenLeft.value, 10),
				top: parseInt(percentageFromScreenTop.value, 10),
			};
			movedImageIndex.value = null;
		},
	});
};
// #endregion
</script>

<style lang="scss">
@import '../styles/grid-columns.scss';

.popup-image {
	grid-column: 2/3;
	grid-row: 1/-1;
	user-select: none;

	img {
		width: auto;
		height: 100% !important;
		padding: 64px;
		object-fit: contain;
	}
}

// Design references:
// https://palette.supply/
// https://www.davidwilliambaum.com/ - check numbers on hover
// https://www.guillaumetomasi.com/
// https://stills.mauer.co/
.photos {
	// position: relative;
	display: grid;
	overflow: hidden;
	max-width: 90vw;
	height: 100%;
	height: 100%;
	max-height: 100vh;
	gap: 16px;
	grid-area: 1/1/-1/-1;
	pointer-events: none;

	&__inner {
		grid-area: 1/1/-1/-1;
		transform: scale(v-bind(scale));
		transform-origin: v-bind(percentageFromScreenLeft)
			v-bind(percentageFromScreenTop);
		transition: transform-origin 0.5s ease-out, transform 0.25s ease-out 0s;
	}

	&__photo {
		position: absolute;
		cursor: none;
		pointer-events: all;
		// filter: brightness(0.2);
		// transition: filter 0.2s linear;
		transition: all 0.2s linear;
		&:hover {
			filter: brightness(1.1);
			// transform: scale(1.2);
		}
		img {
			pointer-events: none;
		}
	}
}
</style>
