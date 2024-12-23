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
    it('Login Succesfully and navigate to cart page', async function (){

        const dashboardPage = new DashboardPage(driver);
        const titleDashboardPage = await dashboardPage.isOnDashBoard();
        assert.strictEqual(titleDashboardPage, 'Products', 'Expected dashboard title to be Products');

        //Menambahkan Item ke Cart dan Validate Item Sudah di add
        dashboardPage.addBackPack();
        dashboardPage.addBikeLight();
        const removeBackPackButton = await dashboardPage.findRemoveBackPackButton();
        assert.strictEqual(await removeBackPackButton.isDisplayed(), true, "Remove Backpack Button is not Visible");
        const removeBikeLightButton = await dashboardPage.findRemoveBikeLightButton();
        assert.strictEqual(await removeBikeLightButton.isDisplayed(), true, "Remove Bike Light Button is not Visible");

        //Validate Shopping Cart Sudah ada 2 item
        const updatedShopCart = await dashboardPage.findUpdatedShoppingCartButton();
        assert.strictEqual(await updatedShopCart.includes('2'), true, "Shopping Cart is not updated");
        
        //Navigate ke cart page dan menghandle transition
        const cartPage = await dashboardPage.navigateToCartPage();
        const titleCartPage = await cartPage.isOnCartPage();
        assert.strictEqual(titleCartPage, 'Your Cart', 'Title is expected to be Your Cart');
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