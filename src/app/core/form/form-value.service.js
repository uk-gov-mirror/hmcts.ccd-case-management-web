"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FormValueService = /** @class */ (function () {
    function FormValueService() {
    }
    FormValueService.prototype.sanitise = function (rawValue) {
        return this.sanitiseObject(rawValue);
    };
    FormValueService.prototype.sanitiseObject = function (rawObject) {
        var _this = this;
        if (!rawObject) {
            return rawObject;
        }
        var sanitisedObject = {};
        Object.keys(rawObject).forEach(function (key) {
            sanitisedObject[key] = _this.sanitiseValue(rawObject[key]);
        });
        return sanitisedObject;
    };
    FormValueService.prototype.sanitiseArray = function (rawArray) {
        var _this = this;
        if (!rawArray) {
            return rawArray;
        }
        rawArray.forEach(function (item) {
            if (item.hasOwnProperty('value')) {
                item.value = _this.sanitiseValue(item.value);
            }
        });
        return rawArray;
    };
    FormValueService.prototype.sanitiseValue = function (rawValue) {
        if (Array.isArray(rawValue)) {
            return this.sanitiseArray(rawValue);
        }
        switch (typeof rawValue) {
            case 'object':
                return this.sanitiseObject(rawValue);
            case 'string':
                return rawValue.trim();
            case 'number':
                return String(rawValue);
            default:
                return rawValue;
        }
    };
    FormValueService.prototype.filterCurrentPageFields = function (caseFields, editFrom) {
        var cloneForm = JSON.parse(JSON.stringify(editFrom));
        Object.keys(cloneForm['data']).forEach(function (key) {
            if (caseFields.findIndex(function (element) { return element.id === key; }) < 0) {
                delete cloneForm['data'][key];
            }
        });
        return cloneForm;
    };
    FormValueService = __decorate([
        core_1.Injectable()
    ], FormValueService);
    return FormValueService;
}());
exports.FormValueService = FormValueService;
