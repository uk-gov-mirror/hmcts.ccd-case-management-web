let RandomUtils = require('../../../utils/ccdDataGenerationUtils.js');
TextField = require('../../webdriver-components/textField.js');


/**
 * CCD date field component, encapsulated all interactions with the Date field
 */
class CcdDateField{

  /**
   * Must take the parent css tag for the ccd date field component: ccd-write-date-field
   *
   * @param css
   */
  constructor(css){
    this.css = css;
    this.dayCss = new TextField(`${css} #DateField-day`);
    this.monthCss = new TextField(`${css} #DateField-month`);
    this.yearCss = new TextField(`${css} #DateField-year`);

    this.label = null;
    this.inputValue = null;
    this.checkYourAnswersValue = null;
  }

  async enterDate(){
    let day = await RandomUtils.generateRandomInt(1,28);
    let month = await RandomUtils.generateRandomInt(1,12);
    let year = await RandomUtils.generateRandomInt(1950, 2000);
    await this.enterDateWithParams(day, month, year);
  }

  async enterDateWithParams(day, month, year){
      await this.dayCss.enterText(day);
      await this.monthCss.enterText(month);
      await this.yearCss.enterText(year);
      await this.setCheckYourAnswersValue(day, month, year)
      this.label = await this.getLabel();
  }

  async setCheckYourAnswersValue(day, month, year){
    if (month.toString().startsWith('0')){
      month = await month.substring(1);
    }

    this.checkYourAnswersValue = `${day} ${MONTH[month]} ${year}`;
  }

  async getLabel(){
    return await $(`${this.css} .form-label`).getText();
  }

}

const MONTH = Object.freeze({
  1:  'Jan',
  2:  'Feb',
  3:  'Mar',
  4:  'Apr',
  5:  'May',
  6:  'Jun',
  7:  'Jul',
  8:  'Aug',
  9:  'Sep',
  10:  'Oct',
  11:  'Nov',
  12:  'Dec'
});

module.exports = CcdDateField;