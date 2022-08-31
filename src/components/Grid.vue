<template>
	<div class="grid-container">
		<div class="grid__background">
			<div
				v-for="index in Array(12)"
				:key="`${index}-guide`"
				class="grid__guide"
			/>
		</div>
		<div class="grid">
			<slot />
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import '../styles/grid-columns';

.grid-container {
	display: grid;
	min-height: 100%;
	padding: var(--container-padding);
	background: var(--color-dark);
}

.grid {
	height: 100%;
	@include grid-columns();

	&,
	&__background {
		display: grid;
		grid-area: 1/1/-1/-1;
	}

	&__background {
		background: var(--color-light);
		border-radius: var(--container-border-radius);
		pointer-events: none;
		transition: all 0.05s ease-out;
		@include grid-columns();
	}

	&__guide {
		$border: 1px dashed rgba(0, 0, 0, 0.2);
		border-right: $border;

		&:last-child {
			border-right: none;
		}
	}
}
</style>
