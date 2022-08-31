<template>
	<div
		class="mobile-menu heading-l"
		@click="isMobileMenuOpen = !isMobileMenuOpen"
	>
		menu
	</div>

	<div
		:class="{
			'navigation': true,
			'navigation--has-active-link' : !!currentPageHref,
			'navigation--is-open': isMobileMenuOpen
		}"
	>
		<a
			v-for="{text, href} in links"
			:key="text"
			:href="href"
			:class="{'navigation__link': true, 'navigation__link--is-active' : href === currentPageHref}"
		>
			{{ text }}
		</a>
	</div>
</template>

<script setup lang="ts">
import { toRefs, computed, ref } from 'vue';

import type { Ref } from 'vue';

interface IProps {
	currentPageHref?: string;
}

const props = defineProps<IProps>();
const { currentPageHref } = toRefs(props);

interface ILink {
	href: string;
	text: string;
	isActive?: boolean;
}

const links = computed<Array<ILink>>(() => {
	const linkList = [
		{
			href: '/',
			text: 'edvinasba',
		},
		{
			href: '/experience',
			text: 'experience',
		},
		{
			href: '/photography',
			text: 'photography',
		},
		{
			href: '/contact',
			text: 'contact',
		},
	];
	return linkList.map((link) => ({ isActive: link.href === currentPageHref.value, ...link }));
});

const isMobileMenuOpen: Ref<boolean> = ref(false);
</script>

<style lang="scss">
@import '../styles/grid-columns.scss';
.mobile-menu {
	position: sticky;
	z-index: 999;
	top: 0;
	display: none;
	align-self: start;
	align-self: start;
	padding: 8px;
	font-weight: 600;
	grid-area: 1/1/-1/-1;
	justify-self: end;
	text-transform: uppercase;

	@include column-breakpoint() {
		display: block;
	}

}
.navigation {
	$this: &;
	display: flex;
	flex-direction: row;
	align-self: start;
	padding: 16px 40px;
	font-size: 18px;
	font-weight: 500;
	gap: 16px;
	grid-column: 1/-1;

	grid-row: 1/-1;
	isolation: isolate;
	pointer-events: none;

	@include column-breakpoint() {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		display: none;
		flex-direction: column;
		margin: var(--container-padding);

		background: var(--color-light);
		border-radius: var(--container-border-radius);
	}

	&--is-open {
		@include column-breakpoint() {
			display: block;
		}
	}

	&:hover {
		#{$this}__link {
			&:not(:first-child) {
				filter: blur(2px);
				opacity: 1.0;
			}
		}
	}

	&--has-active-link {
		#{$this}__link {
			opacity: 0.2;
		}
	}

	&__link {
		display: flex;
		align-items: center;
		color: var(--color-dark);
		pointer-events: all;
		text-decoration: none;
		transition: filter 0.2s linear, opacity 0.2s linear;

		@include column-breakpoint() {
			font-size: 24px;
		}

		&:first-child {
			margin-right: auto;
			opacity: 1;

			@include column-breakpoint() {
				margin-bottom: auto;
				font-size: 32px;
			}
		}

		&:last-child {
			@include column-breakpoint() {
				margin-bottom: 64px;
			}
		}

		&:hover:not(.s):not(:first-child) {
			filter: none;
			transform: skewX(-5deg);
		}

		&--is-active:not(.s) {
			opacity: 1.0;
		}

	}
}
</style>
