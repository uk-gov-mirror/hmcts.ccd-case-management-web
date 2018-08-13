"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var app_config_1 = require("../../app.config");
var createSpyObj = jasmine.createSpyObj;
var ngx_device_detector_1 = require("ngx-device-detector");
var ccd_browser_support_component_1 = require("./ccd-browser-support.component");
fdescribe('CcdBrowserSupportComponent', function () {
    var component;
    var fixture;
    var appConfig;
    var deviceService: DeviceDetectorService;
    var deviceServiceArg;
    var UNSUPPORTED_BROWSER_URL = 'https://www.gov.uk/help/browsers';
    var CHROME_MIN_REQUIRED_VERSION = '67';
    var IE_MIN_REQUIRED_VERSION = 11;
    var EDGE_MIN_REQUIRED_VERSION = 17;
    var FIREFOX_MIN_REQUIRED_VERSION = 60;
    beforeEach(testing_1.async(function () {
        appConfig = createSpyObj('AppConfig', ['get', 'getUnsupportedBrowserUrl', 'getChromeMinRequiredVersion']);
        appConfig.getUnsupportedBrowserUrl.and.returnValue(UNSUPPORTED_BROWSER_URL);
        deviceService = createSpyObj('DeviceDetectorService', ['getDeviceInfo']);
        const deviceInfo = {
            'userAgent': 'nghcilwoy',
            'os': 'XJO',
            'browser': 'chrome',
            'device': 'green tea',
            'os_version': '10.5',
            'browser_version': '123.456'
        };
        deviceService.getDeviceInfo.and.returnValue(deviceInfo);
        testing_1.TestBed.configureTestingModule({
            declarations: [ccd_browser_support_component_1.CcdBrowserSupportComponent],
            providers: [
                { provide: app_config_1.AppConfig, useValue: appConfig },
                { provide: ngx_device_detector_1.DeviceDetectorService, useValue: deviceService },
            ]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(ccd_browser_support_component_1.CcdBrowserSupportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should display the unsupported browser url', function () {
        expect(component).toBeTruthy();
        expect(component.getUnsupportedBrowserUrl()).toEqual(UNSUPPORTED_BROWSER_URL);
    });
    it('should hide when hide link clicked', function () {
        expect(component).toBeTruthy();
        component.hideUnsupportedBrowser();
        expect(component.showUnsupportedBrowser).toBeFalsy();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
    it('should not display if unsupported browser', function () {
        expect(component).toBeTruthy();
        // deviceService.browser.and.returnValue('chrome');
        // deviceService.browser_version.and.returnValue('123.456');
        console.log('1');
        expect(component.isUnsupportedBrowser()).toBeTruthy();
    });
});
