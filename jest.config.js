module.exports = {
    moduleDirectories: [
        'node_modules',
        'src'
    ],
    preset: 'jest-playwright-preset',
    reporters: [
        'default',
        ['jest-junit', {
            'suiteName': 'automated-testing-jest-playwright-ts',
            'outputDirectory': './reports',
            'outputName': 'jest-playwright-test-automation-results.xml'
        }],
        ['jest-html-reporters', {
            'publicPath': './reports',
            'filename': 'jest-playwright-test-automation-report.html'
        }]
    ],
    roots: [
        '<rootDir>/src'
    ],
    testEnvironment: './custom.config.js',
    testMatch: [
        '**/?(*.)+(test).[t]s'
    ],
    transform: { '^.+\\.ts$': 'ts-jest' },
    verbose: true,
    testTimeout: 75000
}
