const { By, until } = require ('selenium-webdriver');

class CheckoutCompletePage {
    constructor(driver){
        this.driver = driver;
        this.title = By.xpath("//span[@class='title']");
        this.backToHomeButton = By.xpath("//button[@id='back-to-products']");
    }

    async isOnCheckoutCompletePage (){
        await this.driver.wait(until.elementLocated(this.title), 5000)
        const titleElement  = await this.driver.findElement(this.title);
        return titleElement.getText();
    }

    async clickBackToHomeButton(){
        await this.driver.findElement(this.backToHomeButton).click();
    }
}

module.exports = CheckoutCompletePage