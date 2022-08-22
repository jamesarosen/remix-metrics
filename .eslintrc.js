const prettierConfig = require('./prettier.config')

module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'@remix-run/eslint-config',
		'@remix-run/eslint-config/node',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 'latest',
	},
	plugins: ['@typescript-eslint', 'prettier'],
	root: true,
	rules: {
		'prettier/prettier': ['error', prettierConfig],
		semi: 'off',
	},

	overrides: [
		{
			files: [
				'.eslintrc.js',
				'prettier.config.js',
				'remix.config.js',
				'tailwind.config.js',
			],
			rules: {
				'@typescript-eslint/no-var-requires': 'off',
			},
		},
	],
}
