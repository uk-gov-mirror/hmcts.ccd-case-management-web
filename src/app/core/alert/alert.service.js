"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
require("rxjs/operator/publish");
var Rx_1 = require("rxjs/Rx");
var AlertService = /** @class */ (function () {
    function AlertService(router) {
        var _this = this;
        this.router = router;
        this.preserveAlerts = false;
        this.alerts = Rx_1.Observable
            .create(function (observer) { return _this.observer = observer; })
            .publish();
        this.alerts.connect();
        this.router
            .events
            .subscribe(function (event) {
            if (event instanceof router_1.NavigationStart) {
                if (!_this.preserveAlerts) {
                    _this.clear();
                }
                _this.setPreserveAlerts(false);
            }
        });
    }
    AlertService.prototype.push = function (alert) {
        this.observer.next(alert);
    };
    AlertService.prototype.clear = function () {
        this.observer.next(null);
    };
    AlertService.prototype.error = function (message) {
        this.push({
            level: 'error',
            message: message
        });
    };
    AlertService.prototype.warning = function (message) {
        this.push({
            level: 'warning',
            message: message
        });
    };
    AlertService.prototype.success = function (message) {
        this.push({
            level: 'success',
            message: message
        });
    };
    AlertService.prototype.setPreserveAlerts = function (preserve) {
        this.preserveAlerts = preserve;
    };
    AlertService.prototype.isPreserveAlerts = function () {
        return this.preserveAlerts;
    };
    AlertService.prototype.message = function (message) {
        this.push({
            level: 'message',
            message: message
        });
    };
    AlertService = __decorate([
        core_1.Injectable()
    ], AlertService);
    return AlertService;
}());
exports.AlertService = AlertService;
