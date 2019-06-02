module.exports = {
    globalSetup: './setup.js',
    globalTeardown: './teardown.js',
    testEnvironment: './puppeteer_environment.js',
    preset: "jest-puppeteer",
    setupFilesAfterEnv: ["jest-extended", "expect-puppeteer"],
    coverageReporters: ["text-summary", "html"],
    // reporters: [ "default", "jest-html-reporters" ],
    reporters: [ "default", "jest-junit" ]
};
