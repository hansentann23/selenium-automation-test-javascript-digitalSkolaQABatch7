const{ Builder } = require ('selenium-webdriver');
const LoginPage = require ('./WebComponents/LoginPage');
const DashboardPage = require ('./WebComponents/DashboardPage');
const assert = require ('assert');

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
        await loginPage.login('haha', 'hihi');
    });

    //Assertion atau validasi
    it('Error message appear for invalid credentials', async function (){
        const loginPage = new LoginPage(driver);
        const errorMessage = await loginPage.getErrorMessage();
        assert.strictEqual(errorMessage, 'Epic sadface: Username and password do not match any user in this service', 'Expected Error Message Does not match ');
    });

    after(async function () {
        await driver.quit();
    });
});