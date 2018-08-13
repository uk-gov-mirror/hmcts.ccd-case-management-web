"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CcdActivityBannerComponent = /** @class */ (function () {
    function CcdActivityBannerComponent() {
    }
    CcdActivityBannerComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input()
    ], CcdActivityBannerComponent.prototype, "bannerType", void 0);
    __decorate([
        core_1.Input()
    ], CcdActivityBannerComponent.prototype, "description", void 0);
    __decorate([
        core_1.Input()
    ], CcdActivityBannerComponent.prototype, "imageLink", void 0);
    CcdActivityBannerComponent = __decorate([
        core_1.Component({
            selector: 'ccd-activity-banner',
            templateUrl: './ccd-activity-banner.component.html',
            styleUrls: ['./ccd-activity-banner.component.css']
        })
    ], CcdActivityBannerComponent);
    return CcdActivityBannerComponent;
}());
exports.CcdActivityBannerComponent = CcdActivityBannerComponent;
