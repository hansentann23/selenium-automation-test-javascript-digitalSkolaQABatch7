const{ Builder } = require ('selenium-webdriver');
const LoginPage = require ('../WebComponents/LoginPage');
const DashboardPage = require ('../WebComponents/DashboardPage');
const assert = require ('assert');
const fs = require ('fs');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const userName = process.env.USER_NAME;
const password = process.env.PASSWORD;

const screenshotDir = './screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive:true});
}

describe('Test Case 1 [login] #Regression', function (){
    this.timeout(40000);
    let driver;

    switch(browser.toLowerCase()){
        case 'firefox':
                const firefox = require('selenium-webdriver/firefox');
                options = new firefox.Options();
                options.addArguments('--headless');
                break;
        case 'edge':
                const edge = require('selenium-webdriver/edge');
                options = new edge.Options();
                options.addArguments('--headless');
        case 'chrome':
            default:
                const chrome = require('selenium-webdriver/chrome');
                options = new chrome.Options();
                options.addArguments('--headless');
                break;
    }
    

    //Run Setiap kali test, satu kali saja paling awal
    before(async function () {
        driver = await new Builder().forBrowser(browser).setFirefoxOptions(options).build();
    });

    //Test Suite dimulai dengan apa, setiap melakukan test
    beforeEach(async function () {
        const loginPage = new LoginPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.login(userName, password);
    });

    //Individual Test dan untuk Assertion atau validasi
    it('Login Succesfully and verify dashboard', async function (){
        const dashboardPage = new DashboardPage(driver);
        const title = await dashboardPage.isOnDashBoard();
        assert.strictEqual(title, 'Products', 'Expected dashboard title to be Products');
    });

    afterEach(async function(){
        const screenshot = await driver.takeScreenshot();
        const filePath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, ' ')}_${Date.now()}.png`
        fs.writeFileSync(filePath, screenshot, 'base64');
    });

    after(async function () {
        await driver.quit();
    });
});