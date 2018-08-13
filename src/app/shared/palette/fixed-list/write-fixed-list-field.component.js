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
var forms_1 = require("@angular/forms");
var abstract_field_write_component_1 = require("../base-field/abstract-field-write.component");
var WriteFixedListFieldComponent = /** @class */ (function (_super) {
    __extends(WriteFixedListFieldComponent, _super);
    function WriteFixedListFieldComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WriteFixedListFieldComponent.prototype.ngOnInit = function () {
        var notEmpty = this.caseField.value !== null && this.caseField.value !== undefined;
        this.fixedListControl = this.registerControl(new forms_1.FormControl(notEmpty ? this.caseField.value : ''));
    };
    WriteFixedListFieldComponent = __decorate([
        core_1.Component({
            selector: 'ccd-write-fixed-list-field',
            templateUrl: './write-fixed-list-field.html'
        })
    ], WriteFixedListFieldComponent);
    return WriteFixedListFieldComponent;
}(abstract_field_write_component_1.AbstractFieldWriteComponent));
exports.WriteFixedListFieldComponent = WriteFixedListFieldComponent;
