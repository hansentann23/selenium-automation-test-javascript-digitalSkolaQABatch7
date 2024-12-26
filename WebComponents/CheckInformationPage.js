const { By, until } = require ('selenium-webdriver');

class CheckInformationPage {
    constructor(driver){
        this.driver = driver;
        this.title = By.xpath("//span[@class='title']");
        this.firstNameField = By.xpath("//input[@id='first-name']");
        this.lastNameField = By.xpath("//input[@id='last-name']");
        this.zipCodeField = By.xpath("//input[@id='postal-code']");
        this.continueButton = By.xpath("//input[@id='continue']");
    }

    async waitAndClick(element) {
        try {
            await this.driver.wait(until.elementLocated(element), this.timeout);
            await this.driver.findElement(element).click();
        } catch (error) {
            console.error(`Error in waitAndClick: Could not click the element.`, error);
        }
    }

    async isOnCheckInformationPage (){
        await this.driver.wait(until.elementLocated(this.title), 5000)
        const titleElement  = await this.driver.findElement(this.title);
        return titleElement.getText();
    }

    async fillInformationData(firstName, lastName, zipCode){
        await this.driver.findElement(this.firstNameField).sendKeys(firstName);
        await this.driver.findElement(this.lastNameField).sendKeys(lastName);
        await this.driver.findElement(this.zipCodeField).sendKeys(zipCode);
        await this.waitAndClick(this.continueButton);
    }
}

module.exports = CheckInformationPage