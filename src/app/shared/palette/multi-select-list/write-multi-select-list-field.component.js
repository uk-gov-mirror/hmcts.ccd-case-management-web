"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var abstract_field_write_component_1 = require("../base-field/abstract-field-write.component");
var forms_1 = require("@angular/forms");
var WriteMultiSelectListFieldComponent = /** @class */ (function (_super) {
    __extends(WriteMultiSelectListFieldComponent, _super);
    function WriteMultiSelectListFieldComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WriteMultiSelectListFieldComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.checkboxes = new forms_1.FormArray([]);
        // Initialise array with existing values
        if (this.caseField.value && Array.isArray(this.caseField.value)) {
            var values = this.caseField.value;
            values.forEach(function (value) {
                _this.checkboxes.push(new forms_1.FormControl(value));
            });
        }
        this.checkboxes = this.registerControl(this.checkboxes);
    };
    WriteMultiSelectListFieldComponent.prototype.onCheckChange = function (event) {
        var _this = this;
        if (!this.isSelected(event.target.value)) {
            // Add a new control in the FormArray
            this.checkboxes.push(new forms_1.FormControl(event.target.value));
        }
        else {
            // Remove the control form the FormArray
            this.checkboxes.controls.forEach(function (ctrl, i) {
                if (ctrl.value === event.target.value) {
                    _this.checkboxes.removeAt(i);
                    return;
                }
            });
        }
    };
    WriteMultiSelectListFieldComponent.prototype.isSelected = function (code) {
        return this.checkboxes.controls.find(function (control) { return control.value === code; });
    };
    WriteMultiSelectListFieldComponent = __decorate([
        core_1.Component({
            selector: 'ccd-write-multi-select-list-field',
            templateUrl: './write-multi-select-list-field.html'
        })
    ], WriteMultiSelectListFieldComponent);
    return WriteMultiSelectListFieldComponent;
}(abstract_field_write_component_1.AbstractFieldWriteComponent));
exports.WriteMultiSelectListFieldComponent = WriteMultiSelectListFieldComponent;
