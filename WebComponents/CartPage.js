const { By, until } = require ('selenium-webdriver');

class CartPage {
    constructor(driver){
        this.driver = driver;
        this.title = By.className('title');
    }

    async isOnCartPage (){
        await this.driver.wait(until.elementLocated(this.title), 5000)
        const titleElement  = await this.driver.findElement(this.title);
        return titleElement.getText();
    }
}

module.exports = CartPage