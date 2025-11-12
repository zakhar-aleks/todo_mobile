module.exports = {
	root: true,
	extends: "@react-native",

	...tseslint.configs.recommended,

	rules: {
		"@typescript-eslint/no-explicit-any": "warn",
		"@typescript-eslint/consistent-type-definitions": [
			"error",
			"interface",
		],
		"@typescript-eslint/no-unused-vars": [
			"warn",
			{
				argsIgnorePattern: "^_",
				varsIgnorePattern: "^_",
			},
		],
		eqeqeq: "error",
		"no-console": ["warn", { allow: ["warn", "error"] }],
	},

	eslintConfigPrettier,
};
