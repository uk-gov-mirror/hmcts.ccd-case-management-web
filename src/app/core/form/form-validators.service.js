"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var FormValidatorsService = /** @class */ (function () {
    function FormValidatorsService() {
        this.CUSTOM_VALIDATED_TYPES = [
            'Date', 'MoneyGBP'
        ];
    }
    FormValidatorsService_1 = FormValidatorsService;
    FormValidatorsService.prototype.addValidators = function (caseField, control) {
        if (caseField.display_context === FormValidatorsService_1.MANDATORY
            && this.CUSTOM_VALIDATED_TYPES.indexOf(caseField.field_type.type) === -1) {
            var validators = [forms_1.Validators.required];
            if (control.validator) {
                validators.push(control.validator);
            }
            control.setValidators(validators);
        }
        return control;
    };
    FormValidatorsService.MANDATORY = 'MANDATORY';
    FormValidatorsService = FormValidatorsService_1 = __decorate([
        core_1.Injectable()
    ], FormValidatorsService);
    return FormValidatorsService;
    var FormValidatorsService_1;
}());
exports.FormValidatorsService = FormValidatorsService;
