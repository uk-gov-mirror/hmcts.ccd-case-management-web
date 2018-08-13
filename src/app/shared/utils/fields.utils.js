"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var date_pipe_1 = require("../palette/utils/date.pipe");
var FieldsUtils = /** @class */ (function () {
    function FieldsUtils() {
    }
    FieldsUtils_1 = FieldsUtils;
    FieldsUtils.toValuesMap = function (caseFields) {
        var valueMap = {};
        caseFields.forEach(function (field) {
            valueMap[field.id] = field.value;
        });
        return valueMap;
    };
    FieldsUtils.getMoneyGBP = function (fieldValue) {
        return fieldValue ? FieldsUtils_1.currencyPipe.transform(fieldValue / 100, 'GBP', 'symbol') : fieldValue;
    };
    FieldsUtils.getDate = function (fieldValue) {
        try {
            return FieldsUtils_1.datePipe.transform(fieldValue, 'dd-MM-yyyy');
        }
        catch (e) {
            return this.textForInvalidField('Date', fieldValue);
        }
    };
    FieldsUtils.getFixedListLabelByCodeOrEmpty = function (field, code) {
        var relevantItem = code ? field.field_type.fixed_list_items.find(function (item) { return item.code === code; }) : '';
        return relevantItem ? relevantItem.label : '';
    };
    FieldsUtils.textForInvalidField = function (type, invalidValue) {
        return "{ Invalid " + type + ": " + invalidValue + " }";
    };
    FieldsUtils.prototype.buildCanShowPredicate = function (eventTrigger, form) {
        var currentState = this.mergeCaseFieldsAndFormFields(eventTrigger.case_fields, form.controls['data'].value);
        return function (page) {
            return page.parsedShowCondition.match(currentState);
        };
    };
    FieldsUtils.prototype.mergeCaseFieldsAndFormFields = function (caseFields, formFields) {
        return this.mergeFields(caseFields, formFields, FieldsUtils_1.DEFAULT_MERGE_FUNCTION);
    };
    FieldsUtils.prototype.mergeLabelCaseFieldsAndFormFields = function (caseFields, formFields) {
        return this.mergeFields(caseFields, formFields, FieldsUtils_1.LABEL_MERGE_FUNCTION);
    };
    FieldsUtils.prototype.mergeFields = function (caseFields, formFields, mergeFunction) {
        var result = this.cloneObject(formFields);
        caseFields.forEach(function (field) {
            mergeFunction(field, result);
        });
        return result;
    };
    FieldsUtils.prototype.cloneObject = function (obj) {
        return Object.assign({}, obj);
    };
    FieldsUtils.currencyPipe = new common_1.CurrencyPipe('en-GB');
    FieldsUtils.datePipe = new date_pipe_1.DatePipe();
    FieldsUtils.LABEL_SUFFIX = '-LABEL';
    FieldsUtils.DEFAULT_MERGE_FUNCTION = function mergeFunction(field, result) {
        if (!result.hasOwnProperty(field.id)) {
            result[field.id] = field.value;
        }
    };
    FieldsUtils.LABEL_MERGE_FUNCTION = function mergeFunction(field, result) {
        if (!result.hasOwnProperty(field.id)) {
            result[field.id] = field.value;
        }
        switch (field.field_type.type) {
            case 'FixedList': {
                result[field.id] = FieldsUtils_1.getFixedListLabelByCodeOrEmpty(field, result[field.id] || field.value);
                break;
            }
            case 'MultiSelectList': {
                var fieldValue = result[field.id] || [];
                result[field.id + FieldsUtils_1.LABEL_SUFFIX] = [];
                fieldValue.forEach(function (code, idx) {
                    result[field.id + FieldsUtils_1.LABEL_SUFFIX][idx] = FieldsUtils_1.getFixedListLabelByCodeOrEmpty(field, code);
                });
                break;
            }
            case 'MoneyGBP': {
                var fieldValue = (result[field.id] || field.value);
                result[field.id] = FieldsUtils_1.getMoneyGBP(fieldValue);
                break;
            }
            case 'Date': {
                var fieldValue = (result[field.id] || field.value);
                result[field.id] = FieldsUtils_1.getDate(fieldValue);
                break;
            }
            case 'Collection': {
                var elements = (result[field.id] || field.value);
                if (elements) {
                    elements.forEach(function (elem) {
                        switch (field.field_type.collection_field_type.type) {
                            case 'MoneyGBP': {
                                elem.value = FieldsUtils_1.getMoneyGBP(elem.value);
                                break;
                            }
                            case 'Date': {
                                elem.value = FieldsUtils_1.getDate(elem.value);
                                break;
                            }
                        }
                    });
                }
                break;
            }
        }
    };
    FieldsUtils = FieldsUtils_1 = __decorate([
        core_1.Injectable()
    ], FieldsUtils);
    return FieldsUtils;
    var FieldsUtils_1;
}());
exports.FieldsUtils = FieldsUtils;
