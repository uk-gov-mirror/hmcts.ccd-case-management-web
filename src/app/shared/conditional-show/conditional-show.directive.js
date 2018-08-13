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
var conditional_show_model_1 = require("./conditional-show.model");
var ConditionalShowDirective = /** @class */ (function () {
    function ConditionalShowDirective(el, fieldsUtils, registry) {
        this.el = el;
        this.fieldsUtils = fieldsUtils;
        this.registry = registry;
        this.eventFields = [];
    }
    ConditionalShowDirective.prototype.ngAfterViewInit = function () {
        if (this.caseField.show_condition) {
            this.condition = new conditional_show_model_1.ShowCondition(this.caseField.show_condition);
            // console.log('FIELD: ' + this.caseField.id + ' init. Show condition: ' + this.caseField.show_condition);
            this.formGroup = this.formGroup || new forms_1.FormGroup({});
            this.formField = this.formGroup.get(this.caseField.id);
            // console.log('FIELD: ' + this.caseField.id + '. Is form field:' + this.formField + '. Event fields:', this.eventFields);
            this.updateVisibility(this.getReadOnlyAndFormFields());
            this.subscribeToFormChanges();
            this.registry.register(this);
        }
    };
    ConditionalShowDirective.prototype.refreshVisibility = function () {
        // console.log('Refresh FIELD: ', this.caseField.id, '. field:', this.formField, '. eventFields:', this.eventFields);
        this.updateVisibility(this.getReadOnlyAndFormFields(), true);
        this.subscribeToFormChanges();
    };
    ConditionalShowDirective.prototype.ngOnDestroy = function () {
        this.unsubscribeFromFormChanges();
    };
    ConditionalShowDirective.prototype.subscribeToFormChanges = function () {
        var _this = this;
        this.unsubscribeFromFormChanges();
        // console.log('FIELD ' + this.caseField.id + ' subscribing to form changes');
        this.formChangesSubscription = this.formGroup.valueChanges.subscribe(function (_) {
            // console.log('FIELD ' + this.caseField.id + ' reacting to form change');
            _this.updateVisibility(_this.getReadOnlyAndFormFields());
        });
    };
    ConditionalShowDirective.prototype.updateVisibility = function (fields, forced) {
        if (forced === void 0) { forced = false; }
        // console.log('FIELD ' + this.caseField.id + ' updatingVisibility based on fields: ', fields, ' forced:', forced);
        if (this.shouldToggleToHide(fields, forced)) {
            this.onHide();
        }
        else if (this.shouldToggleToShow(fields)) {
            this.onShow();
        }
    };
    ConditionalShowDirective.prototype.onHide = function () {
        // console.log('on hide is form field', this.formField);
        if (this.formField) {
            this.unsubscribeFromFormChanges();
            // console.log('FIELD ' + this.caseField.id + ' disabling form field');
            this.formField.disable();
            this.subscribeToFormChanges();
        }
        this.hide();
    };
    ConditionalShowDirective.prototype.onShow = function () {
        if (this.formField) {
            this.unsubscribeFromFormChanges();
            // console.log('FIELD ' + this.caseField.id + ' enabling form field', this.formField);
            this.formField.enable();
            this.subscribeToFormChanges();
        }
        this.show();
        if (this.formField) {
            this.checkHideShowCondition(this.caseField.id, this.formField);
        }
    };
    ConditionalShowDirective.prototype.hide = function () {
        this.el.nativeElement.hidden = true;
    };
    ConditionalShowDirective.prototype.show = function () {
        this.el.nativeElement.hidden = false;
    };
    ConditionalShowDirective.prototype.shouldToggleToHide = function (fields, forced) {
        return (!this.isHidden() || forced) && !this.condition.match(fields);
    };
    ConditionalShowDirective.prototype.shouldToggleToShow = function (fields) {
        return this.isHidden() && this.condition.match(fields);
    };
    ConditionalShowDirective.prototype.getReadOnlyAndFormFields = function () {
        var formFields = this.getFormFieldsValuesIncludingDisabled();
        // console.log('FIELD ' + this.caseField.id + ' current form values including disabled: ', formFields);
        return this.fieldsUtils.mergeCaseFieldsAndFormFields(this.eventFields, formFields);
    };
    ConditionalShowDirective.prototype.getFormFieldsValuesIncludingDisabled = function () {
        return this.formGroup.getRawValue();
    };
    ConditionalShowDirective.prototype.isHidden = function () {
        return this.el.nativeElement.hidden;
    };
    ConditionalShowDirective.prototype.unsubscribeFromFormChanges = function () {
        if (this.formChangesSubscription) {
            this.formChangesSubscription.unsubscribe();
        }
    };
    // TODO This must be extracted to a generic service for traversing see RDM-2233
    ConditionalShowDirective.prototype.checkHideShowCondition = function (key, aControl) {
        var _this = this;
        if (aControl instanceof forms_1.FormArray) {
            // console.log('traversing array', aControl);
            aControl.controls.forEach(function (formControl, i) {
                // console.log('in array', formControl);
                _this.checkHideShowCondition('' + i, formControl);
            });
        }
        else if (aControl instanceof forms_1.FormGroup) {
            // console.log('met a FormGroup ', aControl, ' fromGroup.controls', aControl.controls);
            if (aControl.get('value')) {
                var complexControl_1 = aControl.get('value');
                Object.keys(complexControl_1.controls).forEach(function (controlKey) {
                    // console.log('traversing formGroup item', key, complexControl.get(key));
                    _this.checkHideShowCondition(controlKey, complexControl_1.get(controlKey));
                });
            }
            else if (aControl.controls) {
                Object.keys(aControl.controls).forEach(function (controlKey) {
                    // console.log('traversing formGroup item', key, aControl.get(key));
                    _this.checkHideShowCondition(controlKey, aControl.get(controlKey));
                });
            }
        }
        else if (aControl instanceof forms_1.FormControl) {
            if (aControl.invalid) {
                // console.log('met an invalid FormControl ', key, ' control:', aControl, ' is valid:', aControl.valid);
                this.registry.refresh();
            }
        }
    };
    __decorate([
        core_1.Input()
    ], ConditionalShowDirective.prototype, "caseField", void 0);
    __decorate([
        core_1.Input()
    ], ConditionalShowDirective.prototype, "eventFields", void 0);
    __decorate([
        core_1.Input()
    ], ConditionalShowDirective.prototype, "formGroup", void 0);
    ConditionalShowDirective = __decorate([
        core_1.Directive({ selector: '[ccdConditionalShow]' })
        /** Hides and shows the host element based on the show condition if the condition is not empty. Works on read only fields and form fields.
         *  The show condition is evaluated on all the fields of the page. i.e. read only and form fields. When a form field is hidden, if its
         *  initial value was changed then the field is cleared. Otherwise the original value is kept and will display next time the field is
         *  shown. Evaluation of the show condition includes disabled fields, which can be on their initial value or empty. And executes on the
         *  host field initialization and when any field of the form changes.
         */
        // export class ConditionalShowDirective implements OnInit, OnDestroy {
    ], ConditionalShowDirective);
    return ConditionalShowDirective;
}());
exports.ConditionalShowDirective = ConditionalShowDirective;
