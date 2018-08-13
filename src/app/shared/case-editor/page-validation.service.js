"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var conditional_show_model_1 = require("../conditional-show/conditional-show.model");
var PageValidationService = /** @class */ (function () {
    function PageValidationService(caseFieldService) {
        this.caseFieldService = caseFieldService;
    }
    PageValidationService.prototype.isPageValid = function (page, editForm) {
        var _this = this;
        return page.case_fields
            .filter(function (caseField) { return !_this.caseFieldService.isReadOnly(caseField); })
            .filter(function (caseField) { return !_this.isHidden(caseField, editForm.getRawValue()); })
            .every(function (caseField) {
            var theControl = editForm.controls['data'].get(caseField.id);
            return _this.checkDocumentField(caseField, theControl) && _this.checkOptionalField(caseField, theControl);
        });
    };
    PageValidationService.prototype.checkDocumentField = function (caseField, theControl) {
        if (caseField.field_type.id !== 'Document') {
            return true;
        }
        return !(this.checkMandatoryField(caseField, theControl));
    };
    PageValidationService.prototype.isHidden = function (caseField, formFields) {
        var condition = new conditional_show_model_1.ShowCondition(caseField.show_condition);
        return !condition.match(formFields.data);
    };
    PageValidationService.prototype.checkOptionalField = function (caseField, theControl) {
        return (!theControl && this.caseFieldService.isOptional(caseField)) || theControl.valid || theControl.disabled;
    };
    PageValidationService.prototype.checkMandatoryField = function (caseField, theControl) {
        return this.caseFieldService.isMandatory(caseField) && theControl === null;
    };
    PageValidationService = __decorate([
        core_1.Injectable()
    ], PageValidationService);
    return PageValidationService;
}());
exports.PageValidationService = PageValidationService;
