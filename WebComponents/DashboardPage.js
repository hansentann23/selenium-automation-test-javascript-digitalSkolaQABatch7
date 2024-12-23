const { By, until } = require ('selenium-webdriver');

class DashboardPage {
    constructor(driver){
        this.driver = driver;
        this.title = By.className('title');
        this.cartButton = By.xpath("//div[@id='shopping_cart_container']/a[1]");
        this.addBackpackButton = By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']");
        this.addBikeLightButton = By.xpath("//button[@id='add-to-cart-sauce-labs-bike-light']");
        this.addBoldTShirt = By.xpath("//button[@id='add-to-cart-sauce-labs-bolt-t-shirt']");
        this.addFleeceJacket = By.xpath("//button[@id='add-to-cart-sauce-labs-fleece-jacket']");
        this.addOnesie = By.xpath("//button[@id='add-to-cart-sauce-labs-onesie']");
        this.addRedShirt = By.xpath("//button[@id='add-to-cart-test.allthethings()-t-shirt-(red)']");
        this.removeBackPackButton = By.xpath("//button[@id='remove-sauce-labs-backpack']");
        this.removeBikeLightButton = By.xpath("//button[@id='remove-sauce-labs-bike-light']");
        this.updatedShoppingCartButton = By.xpath("//span[@class='shopping_cart_badge']");
    }

    async isOnDashBoard (){
        //Wait untuk menampilkan title page
        await this.driver.wait(until.elementLocated(this.title), 5000);
        const titleElement  = await this.driver.findElement(this.title);
        return titleElement.getText();
    }

    async navigateToCartPage(){
        await this.driver.findElement(this.cartButton).click();
        //Return sebuah page baru yaitu cart page untuk transisi
        return new (require('./CartPage'))(this.driver);
    }

    async addBackPack(){
        await this.driver.findElement(this.addBackpackButton).click();
    }

    async addBikeLight(){
        await this.driver.findElement(this.addBikeLightButton).click();
    }

    async findRemoveBackPackButton(){
        await this.driver.wait(until.elementLocated(this.removeBackPackButton), 5000);
        return this.driver.findElement(this.removeBackPackButton);
    }

    async findRemoveBikeLightButton(){
        await this.driver.wait(until.elementLocated(this.removeBikeLightButton), 5000);
        return this.driver.findElement(this.removeBikeLightButton);
    }

    async findUpdatedShoppingCartButton(){
        await this.driver.wait(until.elementLocated(this.updatedShoppingCartButton), 5000);
        return this.driver.findElement(this.updatedShoppingCartButton).getText();
    }

}

module.exports = DashboardPage