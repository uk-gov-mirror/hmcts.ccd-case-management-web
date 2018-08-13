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
var material_1 = require("@angular/material");
var remove_dialog_component_1 = require("../../remove-dialog/remove-dialog.component");
var WriteCollectionFieldComponent = /** @class */ (function (_super) {
    __extends(WriteCollectionFieldComponent, _super);
    function WriteCollectionFieldComponent(formValidatorsService, dialog) {
        var _this = _super.call(this) || this;
        _this.formValidatorsService = formValidatorsService;
        _this.dialog = dialog;
        return _this;
    }
    WriteCollectionFieldComponent.prototype.ngOnInit = function () {
        this.caseField.value = this.caseField.value || [];
        this.formArray = this.registerControl(new forms_1.FormArray([]));
    };
    WriteCollectionFieldComponent.prototype.buildCaseField = function (item, index) {
        return {
            id: index.toString(),
            field_type: this.caseField.field_type.collection_field_type,
            display_context: this.caseField.display_context,
            value: item.value,
            label: null
        };
    };
    WriteCollectionFieldComponent.prototype.buildControlRegistrer = function (id, index) {
        var _this = this;
        return function (control) {
            if (_this.formArray.at(index)) {
                return _this.formArray.at(index).get('value');
            }
            _this.formValidatorsService.addValidators(_this.caseField, control);
            _this.formArray.push(new forms_1.FormGroup({
                id: new forms_1.FormControl(id),
                value: control
            }));
            return control;
        };
    };
    WriteCollectionFieldComponent.prototype.buildIdPrefix = function (index) {
        if ('Complex' === this.caseField.field_type.collection_field_type.type) {
            return this.idPrefix + this.caseField.id + '_' + index + '_';
        }
        else {
            return this.idPrefix + this.caseField.id + '_';
        }
    };
    WriteCollectionFieldComponent.prototype.addItem = function () {
        // Manually resetting errors is required to prevent `ExpressionChangedAfterItHasBeenCheckedError`
        this.formArray.setErrors(null);
        this.caseField.value.push({ value: null });
    };
    WriteCollectionFieldComponent.prototype.removeItem = function (index) {
        this.caseField.value.splice(index, 1);
        this.formArray.removeAt(index);
    };
    WriteCollectionFieldComponent.prototype.itemLabel = function (index) {
        var displayIndex = index + 1;
        return index ? this.caseField.label + " " + displayIndex : this.caseField.label;
    };
    WriteCollectionFieldComponent.prototype.openModal = function (i) {
        var _this = this;
        var dialogConfig = new material_1.MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.ariaLabel = 'Label';
        dialogConfig.height = '220px';
        dialogConfig.width = '550px';
        dialogConfig.panelClass = 'dialog';
        dialogConfig.closeOnNavigation = false;
        dialogConfig.position = {
            top: window.innerHeight / 2 - 110 + 'px', left: window.innerWidth / 2 - 275 + 'px'
        };
        var dialogRef = this.dialog.open(remove_dialog_component_1.RemoveDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 'Remove') {
                _this.removeItem(i);
            }
        });
    };
    WriteCollectionFieldComponent = __decorate([
        core_1.Component({
            selector: 'ccd-write-collection-field',
            templateUrl: './write-collection-field.html',
            styleUrls: ['./collection-field.scss']
        })
    ], WriteCollectionFieldComponent);
    return WriteCollectionFieldComponent;
}(abstract_field_write_component_1.AbstractFieldWriteComponent));
exports.WriteCollectionFieldComponent = WriteCollectionFieldComponent;
