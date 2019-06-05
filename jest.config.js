module.exports = {
    globalSetup: './setup.js',
    globalTeardown: './teardown.js',
    testEnvironment: './puppeteer_environment.js',
    preset: "jest-puppeteer",
    setupFilesAfterEnv: ["jest-extended", "expect-puppeteer"],
    coverageReporters: ["text-summary", "html"],
    reporters: [ "default",
        [ "jest-junit", {
            suiteName: "SITE_TESTS",
            output: "./reports/junit-report/junit.xml"
        }],
        ["jest-html-reporters", {
            "publicPath": "./reports/html-report",
            "filename": "report.html",
            "expand": true
        }] ]
};
