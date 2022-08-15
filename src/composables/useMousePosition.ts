import {
	ref,
	onUnmounted,
	onMounted,
} from 'vue';

import type { Ref } from 'vue';

export const useMousePosition = () => {
	const mouseX: Ref<number> = ref(null);
	const mouseY: Ref<number> = ref(null);
	const rawMouseEvent: Ref<MouseEvent> = ref(null);

	const handleMoveMouse = (e) => {
		mouseX.value = e.clientX;
		mouseY.value = e.clientY + window.scrollY;

		rawMouseEvent.value = e;
	};

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
