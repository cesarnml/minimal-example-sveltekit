module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'airbnb-base',
		'prettier'
	],
	plugins: ['svelte3', '@typescript-eslint'],
	ignorePatterns: ['*.cjs'],
	overrides: [
		{
			files: ['*.svelte'],
			processor: 'svelte3/svelte3',
			rules: {
				'import/no-extraneous-dependencies': 0,
				'import/extensions': 0,
				'import/newline-after-import': 0,
				'import/first': 0,
				'import/no-duplicates': 0,
				'import/no-mutable-exports': 0,
				'import/no-unresolved': 0,
				'import/prefer-default-export': 0,
				'import/order': 0,
				'@typescript-eslint/no-use-before-define': 0
			}
		}
	],
	settings: {
		'svelte3/typescript': () => require('typescript')
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
}
