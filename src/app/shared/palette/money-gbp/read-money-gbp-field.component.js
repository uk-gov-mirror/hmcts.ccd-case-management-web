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
var abstract_field_read_component_1 = require("../base-field/abstract-field-read.component");
var ReadMoneyGbpFieldComponent = /** @class */ (function (_super) {
    __extends(ReadMoneyGbpFieldComponent, _super);
    function ReadMoneyGbpFieldComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReadMoneyGbpFieldComponent.prototype.ngOnInit = function () {
        if (this.amount) {
            this.value = this.amount;
        }
        else if (this.caseField) {
            this.value = this.caseField.value;
        }
    };
    ReadMoneyGbpFieldComponent.prototype.isNumber = function () {
        return null !== this.value && !isNaN(this.value);
    };
    __decorate([
        core_1.Input()
    ], ReadMoneyGbpFieldComponent.prototype, "amount", void 0);
    ReadMoneyGbpFieldComponent = __decorate([
        core_1.Component({
            selector: 'ccd-read-money-gbp-field',
            template: "<ng-container *ngIf=\"isNumber()\">{{value / 100 | currency:'GBP':'symbol'}}</ng-container>"
        })
    ], ReadMoneyGbpFieldComponent);
    return ReadMoneyGbpFieldComponent;
}(abstract_field_read_component_1.AbstractFieldReadComponent));
exports.ReadMoneyGbpFieldComponent = ReadMoneyGbpFieldComponent;
