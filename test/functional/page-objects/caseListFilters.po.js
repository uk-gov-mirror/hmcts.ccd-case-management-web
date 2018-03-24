BrowserUtils = require('../utils/browser.utils.js')

class CaseListFilters {

    constructor() {

       this.browserUtils = new BrowserUtils

       this._clfJurisdiction = by.css('#wb-jurisdiction');
       this._clfJurisdictionCss = '#wb-jurisdiction'
       this._clfJurisdictionOptions = by.css('#wb-jurisdiction option')

       this._clfCaseType = by.css('#wb-case-type');
       this._clfCaseTypeCss = '#wb-case-type'
       this._clfCaseTypeOptions = by.css('#wb-case-type option')

       this._clfState = by.css('#wb-case-state');
       this._clfStateCss = '#wb-case-state'
       this._clfStateOptions = by.css('#wb-case-state option')

       this._clfApplyButton = by.css('.global-display .display-left button');

    }

    isLoaded() {

        browser.waitForAngular

    }

    getSelectedOption(dropDownCss) {

        let valueOfSelectedOption =
        this.browserUtils.getValueByElementId(this._clfJurisdictionCss)

        let cssForOption = valueOfSelectedOption
                  .then(function(css){return dropDownCss + ' option[value="' +  css + '"]'})

        return cssForOption
                  .then(function(css) { return element(by.css(css)).getText()})

    }



    getJurisdictionSelectedOptionText() {

         return this.getSelectedOption(this._clfJurisdictionCss).then(function(v) {  return v } )

    }

    getCaseTypeSelectedOptionText() {

         return this.getSelectedOption(this._clfCaseTypeCss).then(function(v) {  return v } )

    }

    getCaseStateSelectedOptionText() {

         return this.getSelectedOption(this._clfStateCss).then(function(v) {  return v } )

    }

    selectJurisdictionOptionByText(optionText) {

         this.browserUtils.selectOption(this._clfJurisdictionOptions, optionText)

    }

    selectCaseTypeOptionByText(optionText) {

         this.browserUtils.selectOption(this._clfCaseTypeOptions, optionText)

    }

    selectStateOptionByText(optionText) {

         this.browserUtils.selectOption(this._clfStateOptions, optionText)

    }

    clickApplyButton() {

         browser.waitForAngular
         element(this._clfApplyButton).click()
         browser.waitForAngular

    }

}

module.exports = CaseListFilters

