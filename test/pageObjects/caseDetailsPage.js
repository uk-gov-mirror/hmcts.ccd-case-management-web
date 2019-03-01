BasePage = require('./basePage.js');
Dropdown = require('./webdriver-components/dropdown.js');
Button = require('./webdriver-components/button.js');


class CaseDetailsPage extends BasePage {

  constructor() {
    super();

    this._latestHistoryEventLink = '.EventLogTable tbody > tr:nth-of-type(1) a';
    this._endStateValue = '.EventLogDetails tbody > tr:nth-of-type(3) > td > span';
    this._actionsDropdown = new Dropdown('ccd-event-trigger select');
    this._goButton = new Button('ccd-event-trigger button');
    this._detailsBox = '.EventLog-DetailsPanel';
    this._tabs = '.tabs-list li';
    this._currentTabFieldKeys = '.tabs-panel:not(.js-hidden) tr > th';

  }


  async waitForPageToLoad(){
    await this.waitForElementToBeVisibleWithTimeout($('ccd-case-header'),10000)
  }

  /**
   * Get text value for the latest event in the History tab
   * @returns {Promise<String>}
   */
  async getLatestHistoryEvent(){
    let text = await $(this._latestHistoryEventLink).getText();
    return text
  }

  /**
   * Get the value for 'End State' as listed in the Details box of the History tab
   * @returns {Promise<void>}
   */
  async getEndStateValue(){
    let text = await $(this._endStateValue).getText();
    return text
  }

  /**
   * Get available actions from the 'Next Step' dropdown box
   * @returns String Array
   */
  async getActions(){
    let options = await this._actionsDropdown.getOptionsTextValues()
    return options
  }

  /**
   * Select event from the actions dropdown and click go button
   * @param event
   * @returns {Promise<void>}
   */
  async startEvent(event){
    await this._actionsDropdown.selectFromDropdownByText(event);
    await this._goButton.click()
  }


  async clickTab(tabName){
    let element = await this.getElementWithText(await $$(this._tabs),tabName);
    await element.click();
  }

  /**
   * Get list of tabs
   * @returns Array of Strings
   */
  async getTabsText(){
    let tabs = await $$(this._tabs);
    return await this.getElementsText(tabs);
  }

  /**
   * Get list of the fields displayed on the currency viewed tab
   * @returns Array of Strings
   */
  async getTabFields(){
    return await this.getElementsText(await $$(this._currentTabFieldKeys))
  }

}

module.exports = CaseDetailsPage;