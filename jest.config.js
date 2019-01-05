const { defaults } = require('jest-config');

module.exports = {
	testMatch: ['**/__tests__/**/*.test.js'],
	modulePathIgnorePatterns: ['<rootDir>/dist', '<rootDir>/node_modules/'],
	transform: {
		'^.+\\.jsx?$': 'babel-jest'
	},
	testEnvironment: 'node',
	collectCoverageFrom: ['<rootDir>/src/**/*.js'],
	coveragePathIgnorePatterns: [
		'<rootDir>/node_modules/',
		'<rootDir>/__tests__/',
		'<rootDir>/src/lib/env',
		'<rootDir>/src/bin',
		'<rootDir>/src/models',
		'<rootDir>/dist/'
	],
	moduleFileExtensions: [...defaults.moduleFileExtensions, 'js', 'jsx']
};
