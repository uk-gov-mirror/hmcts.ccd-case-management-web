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
/**
 * Display a complex type fields as a list of values without labels.
 * This is intended for rendering of Check Your Answer page.
 */
var ReadComplexFieldRawComponent = /** @class */ (function (_super) {
    __extends(ReadComplexFieldRawComponent, _super);
    function ReadComplexFieldRawComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReadComplexFieldRawComponent = __decorate([
        core_1.Component({
            selector: 'ccd-read-complex-field-raw',
            templateUrl: './read-complex-field-raw.html',
            styleUrls: [
                './read-complex-field-raw.scss'
            ],
        })
    ], ReadComplexFieldRawComponent);
    return ReadComplexFieldRawComponent;
}(abstract_field_read_component_1.AbstractFieldReadComponent));
exports.ReadComplexFieldRawComponent = ReadComplexFieldRawComponent;
