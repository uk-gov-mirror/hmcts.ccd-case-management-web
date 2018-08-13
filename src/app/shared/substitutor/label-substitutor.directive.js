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
var LabelSubstitutorDirective = /** @class */ (function () {
    function LabelSubstitutorDirective(fieldsUtils, labelSubstitutionService) {
        this.fieldsUtils = fieldsUtils;
        this.labelSubstitutionService = labelSubstitutionService;
        this.eventFields = [];
    }
    LabelSubstitutorDirective.prototype.ngOnInit = function () {
        if (this.caseField.label) {
            this.initialLabel = this.caseField.label;
            this.formGroup = this.formGroup || new forms_1.FormGroup({});
            // console.log('SubstitutorDirective FIELD: ' + this.caseField.id + ' init. Label: ' + this.caseField.label);
            // console.log('SubstitutorDirective EVENT_FIELDS: ', this.eventFields);
            this.caseField.label = this.getResolvedLabel(this.getReadOnlyAndFormFields());
        }
    };
    LabelSubstitutorDirective.prototype.ngOnDestroy = function () {
        this.caseField.label = this.initialLabel;
    };
    LabelSubstitutorDirective.prototype.getResolvedLabel = function (fields) {
        // console.log('SubstitutorDirective FIELD ' + this.caseField.id + ' updatingVisibility based on fields: ', fields);
        return this.labelSubstitutionService.substituteLabel(fields, this.caseField.label);
        // console.log('SubstitutorDirective RESOLVED LABEL ', this.caseField.label);
    };
    LabelSubstitutorDirective.prototype.getReadOnlyAndFormFields = function () {
        var formFields = this.getFormFieldsValuesIncludingDisabled();
        // console.log('SubstitutorDirective FIELD ' + this.caseField.id + ' current form values including disabled: ', formFields);
        return this.fieldsUtils.mergeLabelCaseFieldsAndFormFields(this.eventFields, formFields);
    };
    LabelSubstitutorDirective.prototype.getFormFieldsValuesIncludingDisabled = function () {
        return this.formGroup.getRawValue();
    };
    __decorate([
        core_1.Input()
    ], LabelSubstitutorDirective.prototype, "caseField", void 0);
    __decorate([
        core_1.Input()
    ], LabelSubstitutorDirective.prototype, "eventFields", void 0);
    __decorate([
        core_1.Input()
    ], LabelSubstitutorDirective.prototype, "formGroup", void 0);
    LabelSubstitutorDirective = __decorate([
        core_1.Directive({ selector: '[ccdLabelSubstitutor]' })
        /** Checks all labels and substitutes any that reference other ones.
        */
    ], LabelSubstitutorDirective);
    return LabelSubstitutorDirective;
}());
exports.LabelSubstitutorDirective = LabelSubstitutorDirective;
