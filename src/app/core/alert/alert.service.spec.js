"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var alert_service_1 = require("./alert.service");
var router_1 = require("@angular/router");
describe('AlertService', function () {
    var ALERT = {
        level: 'error',
        message: 'This is an error'
    };
    var OTHER_ALERT = {
        level: 'success',
        message: 'This is a success'
    };
    var MESSAGE_ALERT = {
        level: 'message',
        message: 'This is a success with a warning'
    };
    var routerObserver;
    var router;
    var alertService;
    beforeEach(function () {
        router = {
            events: {
                subscribe: function (observer) { return routerObserver = observer; }
            }
        };
        alertService = new alert_service_1.AlertService(router);
    });
    it('should offer observable alert stream', function () {
        expect(alertService.alerts.subscribe).toBeTruthy();
    });
    it('should publish alert to observable when push method used', function (done) {
        alertService
            .alerts
            .subscribe(function (alert) {
            expect(alert).toEqual(ALERT);
            done();
        });
        alertService.push(ALERT);
    });
    it('should publish null to observable when clear method used', function (done) {
        alertService
            .alerts
            .subscribe(function (alert) {
            expect(alert).toBeFalsy();
            done();
        });
        alertService.clear();
    });
    it('should clear alerts when route navigation starts if no preserve alerts', function () {
        spyOn(alertService, 'clear');
        alertService.setPreserveAlerts(false);
        routerObserver(new router_1.NavigationStart(0, ''));
        expect(alertService.clear).toHaveBeenCalled();
    });
    it('should not clear alerts when route navigation starts if preserve alerts', function () {
        spyOn(alertService, 'clear');
        alertService.setPreserveAlerts(true);
        routerObserver(new router_1.NavigationStart(0, ''));
        expect(alertService.clear).not.toHaveBeenCalled();
    });
    it('should reset preserve alerts after navigation has completed', function () {
        alertService.setPreserveAlerts(true);
        routerObserver(new router_1.NavigationStart(0, ''));
        var preserve = alertService.isPreserveAlerts();
        expect(preserve).toBe(false);
    });
    it('should not clear alerts when route navigation ends', function () {
        spyOn(alertService, 'clear');
        routerObserver(new router_1.NavigationEnd(0, '', ''));
        expect(alertService.clear).not.toHaveBeenCalled();
    });
    it('should be a hot alert observable', function (done) {
        alertService.push(OTHER_ALERT);
        alertService
            .alerts
            .subscribe(function (alert) {
            expect(alert).toEqual(ALERT);
            done();
        });
        alertService.push(ALERT);
    });
    it('should call `push` with error alert when using `error` method', function () {
        spyOn(alertService, 'push');
        alertService.error(ALERT.message);
        expect(alertService.push).toHaveBeenCalledWith(ALERT);
    });
    it('should call `push` with success alert when using `success` method', function () {
        spyOn(alertService, 'push');
        alertService.success(OTHER_ALERT.message);
        expect(alertService.push).toHaveBeenCalledWith(OTHER_ALERT);
    });
    it('should call `push` with warning alert when using `warn` method', function () {
        spyOn(alertService, 'push');
        alertService.message(MESSAGE_ALERT.message);
        expect(alertService.push).toHaveBeenCalledWith(MESSAGE_ALERT);
    });
});
