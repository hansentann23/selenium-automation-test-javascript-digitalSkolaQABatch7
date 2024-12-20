const { Builder, By, Key, until} = require('selenium-webdriver');
const assert = require('assert');

async function sauceDemoLoginTest() {
    //Membuat Koneksi Dengan Browser Driver
    let driver = await new Builder().forBrowser('chrome').build();

    try{
        await driver.get('https://www.saucedemo.com');

        //Masukkan Username dan Password
        await driver.findElement(By.xpath("//input[@id='user-name']")).sendKeys('standard_user');
        await driver.findElement(By.id('password')).sendKeys('secret_sauce');

        //Click Button Login
        await driver.findElement(By.xpath("//input[@id='login-button']")).click();

        //Memastikan di dashboard dengan mencari judul SwagLabs
        let titleText = await driver.findElement(By.xpath("//div[@class='app_logo']")).getText();
        assert.strictEqual(titleText.includes('Swag Labs'), true, "Title Does Not Contains 'Swag Labs'");

        //Memastikan di dashboard dengan mencari burger button
        let menuButton = await driver.findElement(By.xpath("//button[@id='react-burger-menu-btn']"));
        assert.strictEqual(await menuButton.isDisplayed(), true, "Menu Button is not visible");

        //Add Item to Cart
        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']")).click();
        let removeBackPackButton = await driver.findElement(By.xpath("//button[@id='remove-sauce-labs-backpack']"));
        let shoppingCartButton = await driver.findElement(By.xpath("//span[@class='shopping_cart_badge']")).getText();

        //Validate Item Added to cart
        assert.strictEqual(await removeBackPackButton.isDisplayed(), true, "Remove Button is not visible");
        assert.strictEqual(await shoppingCartButton.includes('1'), true, "Shopping Cart is not updated");

    } finally{
        await driver.quit();
    }
}

sauceDemoLoginTest();