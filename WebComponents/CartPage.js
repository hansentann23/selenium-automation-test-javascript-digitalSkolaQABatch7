const { By, until } = require ('selenium-webdriver');

class CartPage {
    constructor(driver){
        this.driver = driver;
        this.title = By.className('title');
        this.checkOutButton = By.xpath("//button[@id='checkout']");
    }

    async isOnCartPage (){
        await this.driver.wait(until.elementLocated(this.title), 5000)
        const titleElement  = await this.driver.findElement(this.title);
        return titleElement.getText();
    }

    async clickCheckoutButton(){
        await this.driver.findElement(this.checkOutButton).click();
    }
}

module.exports = CartPage