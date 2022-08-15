module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:vue/vue3-recommended',
		'airbnb-base',
		'plugin:astro/recommended',
	],
	overrides: [
		{
			// Define the configuration for `.astro` file.
			files: ['*.astro'],
			// Allows Astro components to be parsed.
			parser: 'astro-eslint-parser',
			// Parse the script in `.astro` as TypeScript by adding the following configuration.
			// It's the setting you need when using TypeScript.
			parserOptions: {
				parser: '@typescript-eslint/parser',
				extraFileExtensions: ['.astro'],
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser',
		sourceType: 'module',
	},
	plugins: [
		'vue',
		'@typescript-eslint',
	],
	rules: {
		indent: [2, 'tab'],
		'no-tabs': 0,
		'vue/multi-word-component-names': 0,
		'vue/html-indent': ['error', 'tab', {
			attribute: 1,
			baseIndent: 1,
			closeBracket: 0,
			alignAttributesVertically: true,
			ignores: [],
		}],
		'import/prefer-default-export': 0,
		'import/extensions': 0,
		'import/no-unresolved': 0,
	},
};
