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
var abstract_field_write_component_1 = require("../base-field/abstract-field-write.component");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var form_validators_service_1 = require("../../../core/form/form-validators.service");
var WriteComplexFieldComponent = /** @class */ (function (_super) {
    __extends(WriteComplexFieldComponent, _super);
    function WriteComplexFieldComponent(isCompoundPipe, formValidatorsService) {
        var _this = _super.call(this) || this;
        _this.isCompoundPipe = isCompoundPipe;
        _this.formValidatorsService = formValidatorsService;
        _this.renderLabel = false;
        _this.ignoreMandatory = false;
        return _this;
    }
    WriteComplexFieldComponent.prototype.ngOnInit = function () {
        this.complexGroup = this.registerControl(new forms_1.FormGroup({}));
    };
    WriteComplexFieldComponent.prototype.buildControlRegistrer = function (caseField) {
        var _this = this;
        return function (control) {
            if (_this.complexGroup.get(caseField.id)) {
                return _this.complexGroup.get(caseField.id);
            }
            // checks validators are required before calling formValidatorsService
            var validatorsRequired = function () {
                return ['AddressLine1'].some(function (x) { return x === caseField.id; })
                    && 'TextMax150' === caseField.field_type.id
                    && form_validators_service_1.FormValidatorsService.MANDATORY === caseField.display_context
                    || !this.ignoreMandatory;
            };
            if (validatorsRequired.call(_this)) {
                // console.log('WriteComplexFieldComponent add validators for caseField', caseField);
                _this.formValidatorsService.addValidators(caseField, control);
            }
            _this.complexGroup.addControl(caseField.id, control);
            return control;
        };
    };
    WriteComplexFieldComponent.prototype.buildIdPrefix = function (field) {
        return this.isCompoundPipe.transform(field) ? "" + this.idPrefix + field.id + "_" : "" + this.idPrefix;
    };
    __decorate([
        core_1.Input()
    ], WriteComplexFieldComponent.prototype, "renderLabel", void 0);
    __decorate([
        core_1.Input()
    ], WriteComplexFieldComponent.prototype, "ignoreMandatory", void 0);
    WriteComplexFieldComponent = __decorate([
        core_1.Component({
            selector: 'ccd-write-complex-type-field',
            templateUrl: './write-complex-field.html',
            styleUrls: ['./read-complex-field-table.scss']
        })
    ], WriteComplexFieldComponent);
    return WriteComplexFieldComponent;
}(abstract_field_write_component_1.AbstractFieldWriteComponent));
exports.WriteComplexFieldComponent = WriteComplexFieldComponent;
