<template>
	<form
		ref="formRef"
		class="form"
		data-netlify="true"
		name="Contact"
		@submit.prevent="handleSubmit"
	>
		<div class="form__input-wrapper">
			<label
				class="form__label"
				for="name"
			>Name</label>
			<input
				id="name"
				class="form__input"
				type="text"
				name="name"
				required
				minlength="5"
			>
		</div>
		<div class="form__input-wrapper">
			<label
				class="form__label"
				for="email"
			>Email</label>
			<input
				id="email"
				class="form__input"
				type="email"
				name="email"
				required
			>
		</div>
		<div class="form__input-wrapper">
			<label
				class="form__label"
				for="message"
			>Message</label>
			<textarea
				id="message"
				class="form__input"
				name="message"
				required
				minlength="100"
			/>
		</div>
		<div class="form__input-wrapper">
			<button
				class="form__submit"
				type="submit"
			>
				Hit me up
			</button>
		</div>
	</form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';

// https://docs.netlify.com/forms/setup/
const formRef: Ref<HTMLFormElement | null> = ref(null);

const handleSubmit = () => {
	const formData: FormData = new FormData(formRef.value);
	fetch('/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		// https://github.com/microsoft/TypeScript/issues/30584#issuecomment-890539686
		body: new URLSearchParams(formData as any).toString(),
	})
		.then(() => console.log('Form successfully submitted'))
		.catch((error) => console.log(error));
};
</script>

<style lang="scss" scoped>
.form {
	display: flex;
	flex-direction: column;
	padding: 32px;
	background: var(--color-light);
	gap: 32px;

	&__input-wrapper {
		display: flex;
		width: 100%;
		flex-direction: column;
		gap: 10px;
	}

	&__label {
		font-size: 16px;
		font-weight: 500;
		line-height: 1;
	}

	&__input {
		padding: 8px 16px;
		border: var(--solid-grid-border);
	}

	&__submit {
		align-self: start;
		padding: 8px 16px;
		border: none;
		appearance: none;
		background: var(--color-dark);
		color: var(--color-light);
		cursor: pointer;
		font-weight: 500;
	}
}
</style>
