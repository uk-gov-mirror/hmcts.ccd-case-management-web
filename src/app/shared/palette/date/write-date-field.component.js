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
var WriteDateFieldComponent = /** @class */ (function (_super) {
    __extends(WriteDateFieldComponent, _super);
    function WriteDateFieldComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WriteDateFieldComponent.prototype.ngOnInit = function () {
        this.dateControl = this.registerControl(new forms_1.FormControl(this.caseField.value));
    };
    WriteDateFieldComponent.prototype.isDateTime = function () {
        return this.caseField.field_type.id === 'DateTime';
    };
    WriteDateFieldComponent = __decorate([
        core_1.Component({
            selector: 'ccd-write-date-field',
            templateUrl: './write-date-field.html'
        })
    ], WriteDateFieldComponent);
    return WriteDateFieldComponent;
}(abstract_field_write_component_1.AbstractFieldWriteComponent));
exports.WriteDateFieldComponent = WriteDateFieldComponent;
