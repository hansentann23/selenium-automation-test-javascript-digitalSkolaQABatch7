const { By, until } = require ('selenium-webdriver');

class CheckoutOverviewPage {
    constructor(driver){
        this.driver = driver;
        this.title = By.xpath("//span[@class='title']");
        this.finishButton = By.xpath("//button[@id='finish']");
    }

    async isOnCheckoutOverviewPage (){
        await this.driver.wait(until.elementLocated(this.title), 5000)
        const titleElement  = await this.driver.findElement(this.title);
        return titleElement.getText();
    }

    async clickFinishButton(){
        await this.driver.findElement(this.finishButton).click();
    }
}

module.exports = CheckoutOverviewPage