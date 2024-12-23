const{ Builder } = require ('selenium-webdriver');
const LoginPage = require ('./WebComponents/LoginPage');
const DashboardPage = require ('./WebComponents/DashboardPage');
const assert = require ('assert');
const fs = require ('fs');

const screenshotDir = './screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive:true});
}

describe('Test Case 1', function (){
    this.timeout(40000);
    let driver;

    //Run Setiap kali test, satu kali saja paling awal
    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    //Test Suite dimulai dengan apa, setiap melakukan test
    beforeEach(async function () {
        const loginPage = new LoginPage(driver);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
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