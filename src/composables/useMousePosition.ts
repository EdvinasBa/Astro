import {
	ref,
	onUnmounted,
	onMounted,
} from 'vue';

import type { Ref } from 'vue';

export const MOUSE_ANIMATION_REFRESH_RATE: number = 1000 / 60;

export const useMousePosition = () => {
	const mouseX: Ref<number> = ref(null);
	const mouseY: Ref<number> = ref(null);
	const rawMouseEvent: Ref<MouseEvent> = ref(null);

	let prevTimeStamp: number = null;

	const handleMoveMouse = (e: MouseEvent) => requestAnimationFrame((timeStamp) => {
		if (prevTimeStamp === timeStamp) {
			return;
		}

		if (!prevTimeStamp) {
			prevTimeStamp = timeStamp;
		}

		if (timeStamp - prevTimeStamp < MOUSE_ANIMATION_REFRESH_RATE) {
			return;
		}

		mouseX.value = e.clientX;
		mouseY.value = e.clientY + window.scrollY;

		rawMouseEvent.value = e;
	});

	onMounted(() => {
		document.addEventListener('mousemove', handleMoveMouse);
	});

	onUnmounted(() => {
		document.removeEventListener('mousemove', handleMoveMouse);
	});

	return {
		mouseX,
		mouseY,
		rawMouseEvent,
	};
};
