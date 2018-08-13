"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var fields_utils_1 = require("../utils/fields.utils");
var LabelSubstitutionService = /** @class */ (function () {
    function LabelSubstitutionService() {
    }
    LabelSubstitutionService_1 = LabelSubstitutionService;
    LabelSubstitutionService.prototype.substituteLabel = function (pageFormFields, label) {
        var startSubstitutionIndex = -1;
        var fieldIdToSubstitute = '';
        var isCollecting = false;
        if (label) {
            for (var scanIndex = 0; scanIndex < label.length; scanIndex++) {
                if (this.isStartPlaceholderAndNotCollecting(label, scanIndex, isCollecting)) {
                    startSubstitutionIndex = scanIndex;
                    isCollecting = true;
                }
                else if (isCollecting) {
                    if (this.isClosingPlaceholder(label, scanIndex)) {
                        if (this.isMatchingLabelIdPattern(fieldIdToSubstitute)
                            && this.isFieldIdInFormFields(fieldIdToSubstitute, pageFormFields)) {
                            label = this.substitute(pageFormFields, label, startSubstitutionIndex, fieldIdToSubstitute);
                            scanIndex = this.resetScanIndexAfterSubstitution(startSubstitutionIndex, pageFormFields, fieldIdToSubstitute);
                        }
                        isCollecting = false;
                        fieldIdToSubstitute = '';
                    }
                    else if (!this.isOpeningPlaceholder(label, scanIndex)) {
                        fieldIdToSubstitute += label.charAt(scanIndex);
                    }
                }
            }
        }
        return label;
    };
    LabelSubstitutionService.prototype.isMatchingLabelIdPattern = function (fieldIdToSubstitute) {
        return fieldIdToSubstitute.match(LabelSubstitutionService_1.LABEL_ID_PATTERN);
    };
    LabelSubstitutionService.prototype.isFieldIdInFormFields = function (fieldIdToSubstitute, pageFormFields) {
        var fieldValue = this.getFieldValue(pageFormFields, fieldIdToSubstitute);
        return fieldValue ? this.isSimpleTypeOrCollectionOfSimpleTypes(fieldValue) : fieldValue !== undefined;
    };
    LabelSubstitutionService.prototype.isSimpleTypeOrCollectionOfSimpleTypes = function (fieldValue) {
        return !this.isObject(fieldValue) && (this.isArray(fieldValue) ? this.isSimpleArray(fieldValue) : true);
    };
    LabelSubstitutionService.prototype.isSimpleArray = function (fieldValue) {
        return !this.isObject(fieldValue[0]) && !Array.isArray(fieldValue[0]) && fieldValue[0] !== undefined;
    };
    LabelSubstitutionService.prototype.isStartingPlaceholder = function (label, scanIndex) {
        return label.charAt(scanIndex) === LabelSubstitutionService_1.STARTING_PLACEHOLDER;
    };
    LabelSubstitutionService.prototype.isStartPlaceholderAndNotCollecting = function (label, scanIndex, isCollectingPlaceholder) {
        return this.isStartingPlaceholder(label, scanIndex) && !isCollectingPlaceholder;
    };
    LabelSubstitutionService.prototype.isClosingPlaceholder = function (label, scanIndex) {
        return label.charAt(scanIndex) === LabelSubstitutionService_1.CLOSING_PLACEHOLDER;
    };
    LabelSubstitutionService.prototype.isOpeningPlaceholder = function (label, scanIndex) {
        return label.charAt(scanIndex) === LabelSubstitutionService_1.OPENING_PLACEHOLDER;
    };
    LabelSubstitutionService.prototype.substitute = function (pageFormFields, label, startSubstitutionIndex, fieldIdToSubstitute) {
        var replacedString = label.substring(startSubstitutionIndex)
            .replace('${'.concat(fieldIdToSubstitute).concat('}'), this.getSubstitutionValueOrEmpty(pageFormFields, fieldIdToSubstitute));
        return label.substring(0, startSubstitutionIndex).concat(replacedString);
    };
    LabelSubstitutionService.prototype.resetScanIndexAfterSubstitution = function (startSubstitutionIndex, pageFormFields, fieldIdToSubstitute) {
        return startSubstitutionIndex + this.getSubstitutionValueLengthOrZero(pageFormFields, fieldIdToSubstitute);
    };
    LabelSubstitutionService.prototype.getSubstitutionValueOrEmpty = function (pageFormFields, fieldIdToSubstitute) {
        var fieldValue = this.getFieldValue(pageFormFields, fieldIdToSubstitute);
        if (fieldValue instanceof Array) {
            fieldValue = fieldValue.join(', ');
        }
        return fieldValue ? fieldValue : '';
    };
    LabelSubstitutionService.prototype.getFieldValue = function (pageFormFields, fieldIdToSubstitute) {
        var fieldIds = fieldIdToSubstitute.split('.');
        for (var index = 0; index < fieldIds.length; index++) {
            if (pageFormFields[fieldIds[index]] === undefined) {
                return undefined;
            }
            else {
                if (this.isNonEmptyArray(pageFormFields[fieldIds[index]]) && !this.isCollection(pageFormFields[fieldIds[index]])) {
                    pageFormFields = pageFormFields[fieldIds[index] + fields_utils_1.FieldsUtils.LABEL_SUFFIX];
                }
                else {
                    pageFormFields = pageFormFields[fieldIds[index]];
                }
            }
        }
        if (this.isNonEmptyArray(pageFormFields) && this.isCollection(pageFormFields)) {
            pageFormFields = pageFormFields.map(function (fieldValue) { return fieldValue['value']; });
        }
        return pageFormFields;
    };
    LabelSubstitutionService.prototype.isNonEmptyArray = function (pageFormFields) {
        return Array.isArray(pageFormFields) && pageFormFields[0];
    };
    LabelSubstitutionService.prototype.isCollection = function (pageFormFields) {
        return pageFormFields[0]['value'];
    };
    LabelSubstitutionService.prototype.getSubstitutionValueLengthOrZero = function (pageFormFields, fieldIdToSubstitute) {
        return pageFormFields[fieldIdToSubstitute] ? this.getSubstitutionValueOrEmpty(pageFormFields, fieldIdToSubstitute)
            .toString().length : 0;
    };
    LabelSubstitutionService.prototype.getType = function (elem) {
        return Object.prototype.toString.call(elem).slice(8, -1);
    };
    LabelSubstitutionService.prototype.isObject = function (elem) {
        return this.getType(elem) === 'Object';
    };
    ;
    LabelSubstitutionService.prototype.isArray = function (elem) {
        return this.getType(elem) === 'Array';
    };
    ;
    LabelSubstitutionService.LABEL_ID_PATTERN = /^[a-zA-Z0-9_.\]\[]+$/;
    LabelSubstitutionService.STARTING_PLACEHOLDER = '$';
    LabelSubstitutionService.OPENING_PLACEHOLDER = '{';
    LabelSubstitutionService.CLOSING_PLACEHOLDER = '}';
    LabelSubstitutionService = LabelSubstitutionService_1 = __decorate([
        core_1.Injectable()
    ], LabelSubstitutionService);
    return LabelSubstitutionService;
    var LabelSubstitutionService_1;
}());
exports.LabelSubstitutionService = LabelSubstitutionService;
