import {
	ref,
	computed,
} from 'vue';
import type { Ref } from 'vue';
import { useMousePosition } from './useMousePosition';

export const useDrag = () => {
	const {
		mouseX,
		mouseY,
	} = useMousePosition();

	const initialMouseX: Ref<number> = ref(null);
	const initialMouseY: Ref<number> = ref(null);
	const isDragging: Ref<boolean> = ref(false);
	const hasMouseMoved: Ref<boolean> = ref(false);

	const startDragging = ({ onDragEnd = null } = {}) => {
		isDragging.value = true;
		initialMouseX.value = mouseX.value;
		initialMouseY.value = mouseY.value;

		document.addEventListener('mouseup', () => {
			onDragEnd?.();
			initialMouseX.value = null;
			initialMouseY.value = null;

			hasMouseMoved.value = false;

			isDragging.value = false;
		}, {
			once: true,
		});

		document.addEventListener('mousemove', () => {
			// Check if dragging action is still active
			// It can be inactive when this fires if the user e.g.: clicked on an element
			if (isDragging.value) {
				hasMouseMoved.value = true;
			}
		}, {
			once: true,
		});
	};

	const mouseDeltaX = computed<number>(
		() => (hasMouseMoved.value ? mouseX.value - initialMouseX.value : 0),
	);
	const mouseDeltaY = computed<number>(
		() => (hasMouseMoved.value ? mouseY.value - initialMouseY.value : 0),
	);

	return {
		startDragging,
		mouseDeltaX,
		mouseDeltaY,
		isDragging,
		hasMouseMoved,
	};
};
