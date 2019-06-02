const chalk = require('chalk');
const puppeteer = require('puppeteer');
const fs = require('fs');
const mkdirp = require('mkdirp');
const os = require('os');
const path = require('path');
const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');
import {config} from './infra/config';

module.exports = async function() {
    console.log(chalk.green('Setup Puppeteer'));
    const browser = await puppeteer.launch(config);
    global.__BROWSER_GLOBAL__ = browser;
    mkdirp.sync(DIR);
    fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());
};
