"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CcdBrowserSupportComponent = /** @class */ (function () {
    function CcdBrowserSupportComponent(appConfig, deviceService) {
        this.appConfig = appConfig;
        this.deviceService = deviceService;
    }
    CcdBrowserSupportComponent.prototype.ngOnInit = function () {
        this.showUnsupportedBrowser = true;
    };
    CcdBrowserSupportComponent.prototype.getUnsupportedBrowserUrl = function () {
        return this.appConfig.getUnsupportedBrowserUrl();
    };
    CcdBrowserSupportComponent.prototype.hideUnsupportedBrowser = function () {
        this.showUnsupportedBrowser = false;
    };
    CcdBrowserSupportComponent.prototype.isUnsupportedBrowser = function () {
        var browser = this.deviceService.browser;
        // const browser_full_version: string = this.deviceService.browser_version;
        var browser_full_version = this.deviceService.getDeviceInfo().browser_version;
        console.log('browser_full_version ', browser_full_version);
        console.log(browser_full_version);
        var browser_version = parseInt(browser_full_version.substring(0, browser_full_version.indexOf('.')), 10);
        switch (browser) {
            case 'chrome':
                return browser_version < this.appConfig.getChromeMinRequiredVersion();
            case 'ie':
                return browser_version < this.appConfig.getIEMinRequiredVersion();
            case 'firefox':
                return browser_version < this.appConfig.getFirefoxMinRequiredVersion();
            case 'ms-edge':
                return browser_version < this.appConfig.getEdgeMinRequiredVersion();
            default:
                return false;
        }
    };
    __decorate([
        core_1.Input()
    ], CcdBrowserSupportComponent.prototype, "isSolicitor", void 0);
    CcdBrowserSupportComponent = __decorate([
        core_1.Component({
            selector: 'ccd-browser-support',
            templateUrl: './ccd-browser-support.component.html',
            styleUrls: ['./ccd-browser-support.component.scss']
        })
    ], CcdBrowserSupportComponent);
    return CcdBrowserSupportComponent;
}());
exports.CcdBrowserSupportComponent = CcdBrowserSupportComponent;
