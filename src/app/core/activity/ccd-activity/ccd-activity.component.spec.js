"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var createSpyObj = jasmine.createSpyObj;
var ccd_activity_component_1 = require("./ccd-activity.component");
var activity_polling_service_1 = require("../activity.polling.service");
var ng2_mock_component_1 = require("ng2-mock-component");
var activity_model_1 = require("../activity.model");
describe('CcdActivityComponent', function () {
    var BANNER = activity_model_1.DisplayMode.BANNER;
    var ICON = activity_model_1.DisplayMode.ICON;
    var CASE_ID = '1507217479821551';
    var activityPollingService;
    var fixture;
    var component;
    var de;
    var ACTIVITY_WOUT_EDITOR_AND_VIEWER = {
        caseId: CASE_ID,
        editors: [],
        unknownEditors: 0,
        viewers: [],
        unknownViewers: 0
    };
    var ACTIVITY_W_EDITOR = {
        caseId: CASE_ID,
        editors: [{ forename: 'Bob', surname: 'Ross' }],
        unknownEditors: 0,
        viewers: [],
        unknownViewers: 0
    };
    var ACTIVITY_W_MULTIPLE_EDITOR = {
        caseId: CASE_ID,
        editors: [{ forename: 'Bob', surname: 'Ross' },
            { forename: 'William', surname: 'Orange' }],
        unknownEditors: 0,
        viewers: [],
        unknownViewers: 0
    };
    var ACTIVITY_W_UNKNOWN_EDITOR = {
        caseId: CASE_ID,
        editors: [],
        unknownEditors: 1,
        viewers: [],
        unknownViewers: 0
    };
    var ACTIVITY_W_VIEWER = {
        caseId: CASE_ID,
        editors: [],
        unknownEditors: 0,
        viewers: [{ forename: 'Jamie', surname: 'Olivier' }],
        unknownViewers: 0
    };
    var ACTIVITY_W_MULTIPLE_VIEWER = {
        caseId: CASE_ID,
        editors: [],
        unknownEditors: 0,
        viewers: [{ forename: 'Jamie', surname: 'Olivier' },
            { forename: 'William', surname: 'Orange' },
            { forename: 'Jon', surname: 'Doe' }],
        unknownViewers: 0
    };
    var ACTIVITY_W_UNKNOWN_VIEWER = {
        caseId: CASE_ID,
        editors: [],
        unknownEditors: 0,
        viewers: [],
        unknownViewers: 1
    };
    var ACTIVITY_W_BOTH = {
        caseId: CASE_ID,
        editors: [{ forename: 'Bob', surname: 'Ross' }],
        unknownEditors: 0,
        viewers: [{ forename: 'Jamie', surname: 'Olivier' }],
        unknownViewers: 1
    };
    var CcdActivityIconComponent = ng2_mock_component_1.MockComponent({
        selector: 'ccd-activity-icon',
        inputs: ['description', 'imageLink']
    });
    var CcdActivityBannerComponent = ng2_mock_component_1.MockComponent({
        selector: 'ccd-activity-banner',
        inputs: ['description', 'imageLink', 'bannerType']
    });
    beforeEach(testing_1.async(function () {
        activityPollingService = createSpyObj('activityPollingService', ['subscribeToActivity', 'unsubscribeFromActivity']);
        activityPollingService.subscribeToActivity.and.returnValue();
        activityPollingService.unsubscribeFromActivity.and.returnValue();
        activityPollingService.isEnabled = true;
        testing_1.TestBed
            .configureTestingModule({
            imports: [],
            declarations: [
                ccd_activity_component_1.CcdActivityComponent,
                // Mocks
                CcdActivityIconComponent,
                CcdActivityBannerComponent
            ],
            providers: [
                { provide: activity_polling_service_1.ActivityPollingService, useValue: activityPollingService }
            ]
        })
            .compileComponents();
        fixture = testing_1.TestBed.createComponent(ccd_activity_component_1.CcdActivityComponent);
        fixture.detectChanges();
        component = fixture.componentInstance;
        component.caseId = CASE_ID;
        component.displayMode = BANNER;
        component.onActivityChange(ACTIVITY_W_VIEWER);
        de = fixture.debugElement;
        fixture.detectChanges();
    }));
    it('should render create when activity is disabled', function () {
        activityPollingService = fixture.debugElement.injector.get(activity_polling_service_1.ActivityPollingService);
        activityPollingService.isEnabled = false;
        fixture.detectChanges();
        var activityElement = de.query(platform_browser_1.By.css('.activityComponent'));
        expect(activityElement).toBeFalsy();
    });
    it('should render a case activity banner', function () {
        var banner = de.query(platform_browser_1.By.directive(CcdActivityBannerComponent));
        expect(activityPollingService.subscribeToActivity.toHaveBeenCalled);
        expect(banner).toBeTruthy();
    });
    it('should render single viewer banner', function () {
        var banner = de.queryAll(platform_browser_1.By.directive(CcdActivityBannerComponent));
        expect(banner).toBeTruthy();
        expect(banner.length).toEqual(1);
        expect(banner[0].componentInstance.bannerType).toBe('viewer');
    });
    it('should render single editor banner', function () {
        component.onActivityChange(ACTIVITY_W_EDITOR);
        fixture.detectChanges();
        var banner = de.queryAll(platform_browser_1.By.directive(CcdActivityBannerComponent));
        expect(banner).toBeTruthy();
        expect(banner.length).toEqual(1);
        expect(banner[0].componentInstance.bannerType).toBe('editor');
    });
    it('should render single editor banner FOR Unknown Editors', function () {
        component.onActivityChange(ACTIVITY_W_UNKNOWN_EDITOR);
        fixture.detectChanges();
        var banner = de.queryAll(platform_browser_1.By.directive(CcdActivityBannerComponent));
        expect(banner).toBeTruthy();
        expect(banner.length).toEqual(1);
        expect(banner[0].componentInstance.bannerType).toBe('editor');
    });
    it('should render single editor banner FOR Unknown Viewers', function () {
        component.onActivityChange(ACTIVITY_W_UNKNOWN_VIEWER);
        fixture.detectChanges();
        var banner = de.queryAll(platform_browser_1.By.directive(CcdActivityBannerComponent));
        expect(banner).toBeTruthy();
        expect(banner.length).toEqual(1);
        expect(banner[0].componentInstance.bannerType).toBe('viewer');
    });
    it('should render both banners', function () {
        component.onActivityChange(ACTIVITY_W_BOTH);
        fixture.detectChanges();
        var banner = de.queryAll(platform_browser_1.By.directive(CcdActivityBannerComponent));
        expect(banner).toBeTruthy();
        expect(banner.length).toEqual(2);
        expect(banner[0].componentInstance.bannerType).toBe('editor');
        expect(banner[1].componentInstance.bannerType).toBe('viewer');
    });
    it('should render single case VIEWER icon with the proper description', function () {
        component.displayMode = ICON;
        fixture.detectChanges();
        var icon = de.queryAll(platform_browser_1.By.directive(CcdActivityIconComponent));
        expect(icon).toBeTruthy();
        expect(icon[0].componentInstance.imageLink).toContain('viewer.png');
        expect(icon[0].componentInstance.description).toBe('Jamie Olivier is viewing this case');
    });
    it('should render multiple case VIEWER icon with the proper description', function () {
        component.displayMode = ICON;
        component.onActivityChange(ACTIVITY_W_MULTIPLE_VIEWER);
        fixture.detectChanges();
        var icon = de.queryAll(platform_browser_1.By.directive(CcdActivityIconComponent));
        expect(icon).toBeTruthy();
        expect(icon[0].componentInstance.imageLink).toContain('viewer.png');
        expect(icon[0].componentInstance.description).toBe('Jamie Olivier, William Orange and Jon Doe are viewing this case');
    });
    it('should render single case EDITOR icon with the proper description', function () {
        component.displayMode = ICON;
        component.onActivityChange(ACTIVITY_W_MULTIPLE_EDITOR);
        fixture.detectChanges();
        var icon = de.queryAll(platform_browser_1.By.directive(CcdActivityIconComponent));
        expect(icon).toBeTruthy();
        expect(icon[0].componentInstance.imageLink).toContain('editor.png');
        expect(icon[0].componentInstance.description).toBe('This case is being updated by Bob Ross and William Orange');
    });
    it('should render multiple case EDITOR icon with the proper description', function () {
        component.displayMode = ICON;
        component.onActivityChange(ACTIVITY_W_EDITOR);
        fixture.detectChanges();
        var icon = de.queryAll(platform_browser_1.By.directive(CcdActivityIconComponent));
        expect(icon).toBeTruthy();
        expect(icon[0].componentInstance.imageLink).toContain('editor.png');
        expect(icon[0].componentInstance.description).toBe('This case is being updated by Bob Ross');
    });
    it('should render both VIEWER & EDITOR icons', function () {
        component.displayMode = ICON;
        component.onActivityChange(ACTIVITY_W_BOTH);
        fixture.detectChanges();
        var icon = de.queryAll(platform_browser_1.By.directive(CcdActivityIconComponent));
        expect(icon).toBeTruthy();
        expect(icon[0].componentInstance.imageLink).toContain('editor.png');
        expect(icon[1].componentInstance.imageLink).toContain('viewer.png');
    });
});
