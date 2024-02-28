/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = api => {
	api.cache(false);
	return {
		presets: ['module:metro-react-native-babel-preset'],
		plugins: [
		[
		'module-resolver',
		{
			root: ['./src'],
			extensions: ['.js', '.json', '.ts', '.tsx', '.js', '.jsx'],
			alias: {
			navigation: './src/navigation',
			components: './src/components',
			hooks: './src/hooks',
			screens: './src/screens',
			services: './src/services',
			store: './src/store',
			theme: './src/theme',
			translations: './src/translations',
			types: './src/types',
			assets: './src/assets',
			utils: './src/utils',
			storage: './src/storage',
			},
		},
		],
		['module:react-native-dotenv', {
			moduleName: '@env',
			path: '.env',
			safe: true,
			allowUndefined: false,
			verbose: false,
			'allowlist': [
				'API_URL',
				'OPTIO_BANNERS',
				'PROD_URL',
			],
			blocklist: null,
		}],
		'react-native-reanimated/plugin', // needs to be last
		],
	};
};
