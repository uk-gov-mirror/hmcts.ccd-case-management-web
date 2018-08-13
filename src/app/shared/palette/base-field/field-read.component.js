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
var abstract_field_read_component_1 = require("./abstract-field-read.component");
var FieldReadComponent = /** @class */ (function (_super) {
    __extends(FieldReadComponent, _super);
    function FieldReadComponent(resolver, paletteService) {
        var _this = _super.call(this) || this;
        _this.resolver = resolver;
        _this.paletteService = paletteService;
        _this.withLabel = false;
        return _this;
    }
    FieldReadComponent.prototype.ngOnInit = function () {
        var componentClass = this.paletteService.getFieldComponentClass(this.caseField, false);
        var injector = core_1.Injector.create([], this.fieldContainer.parentInjector);
        var component = this.resolver.resolveComponentFactory(componentClass).create(injector);
        // Provide component @Inputs
        component.instance['caseField'] = this.caseField;
        component.instance['context'] = this.context;
        this.fieldContainer.insert(component.hostView);
    };
    __decorate([
        core_1.Input()
    ], FieldReadComponent.prototype, "withLabel", void 0);
    __decorate([
        core_1.ViewChild('fieldContainer', { read: core_1.ViewContainerRef })
    ], FieldReadComponent.prototype, "fieldContainer", void 0);
    FieldReadComponent = __decorate([
        core_1.Component({
            selector: 'ccd-field-read',
            templateUrl: './field-read.html'
        })
    ], FieldReadComponent);
    return FieldReadComponent;
}(abstract_field_read_component_1.AbstractFieldReadComponent));
exports.FieldReadComponent = FieldReadComponent;
