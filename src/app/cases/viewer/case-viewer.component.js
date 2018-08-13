"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var callback_errors_component_1 = require("../../shared/error/callback-errors.component");
var activity_model_1 = require("../../core/activity/activity.model");
var conditional_show_model_1 = require("../../shared/conditional-show/conditional-show.model");
var CaseViewerComponent = /** @class */ (function () {
    function CaseViewerComponent(route, router, orderService, activityPollingService) {
        this.route = route;
        this.router = router;
        this.orderService = orderService;
        this.activityPollingService = activityPollingService;
        this.BANNER = activity_model_1.DisplayMode.BANNER;
        this.triggerText = callback_errors_component_1.CallbackErrorsComponent.TRIGGER_TEXT_GO;
        this.ignoreWarning = false;
        this.callbackErrorsSubject = new Subject_1.Subject();
    }
    CaseViewerComponent.prototype.ngOnInit = function () {
        this.caseDetails = this.route.snapshot.data.case;
        // Clone and sort tabs array
        this.sortedTabs = this.orderService.sort(this.caseDetails.tabs);
        this.caseFields = this.getTabFields();
        this.sortedTabs = this.sortTabFieldsAndFilterTabs(this.sortedTabs);
        this.subscription = this.postViewActivity().subscribe(function (_resolved) {
            // console.log('Posted VIEW activity and result is: ' + JSON.stringify(resolved));
        });
    };
    CaseViewerComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    CaseViewerComponent.prototype.postViewActivity = function () {
        return this.activityPollingService.postViewActivity(this.caseDetails.case_id);
    };
    CaseViewerComponent.prototype.sortTabFieldsAndFilterTabs = function (tabs) {
        var _this = this;
        return tabs
            .map(function (tab) { return Object.assign({}, tab, { fields: _this.orderService.sort(tab.fields) }); })
            .filter(function (tab) { return new conditional_show_model_1.ShowCondition(tab.show_condition).matchByCaseFields(_this.caseFields); });
    };
    CaseViewerComponent.prototype.clearErrorsAndWarnings = function () {
        this.error = null;
        this.ignoreWarning = false;
        this.triggerText = callback_errors_component_1.CallbackErrorsComponent.TRIGGER_TEXT_GO;
    };
    CaseViewerComponent.prototype.applyTrigger = function (trigger) {
        var _this = this;
        this.error = null;
        var queryParams = {};
        if (this.ignoreWarning) {
            queryParams['ignoreWarning'] = this.ignoreWarning;
        }
        return this.router.navigate(['trigger', trigger.id], {
            queryParams: queryParams,
            relativeTo: this.route
        }).catch(function (error) {
            if (error.status !== 401 && error.status !== 403) {
                _this.error = error;
                console.log('error during triggering event:', trigger.id);
                console.log(error);
                _this.callbackErrorsSubject.next(_this.error);
            }
        });
    };
    CaseViewerComponent.prototype.callbackErrorsNotify = function (callbackErrorsContext) {
        this.ignoreWarning = callbackErrorsContext.ignore_warning;
        this.triggerText = callbackErrorsContext.trigger_text;
    };
    CaseViewerComponent.prototype.getTabFields = function () {
        var caseDataFields = this.sortedTabs.reduce(function (acc, tab) {
            return acc.concat(tab.fields);
        }, []);
        return caseDataFields.concat(this.caseDetails.metadataFields);
    };
    CaseViewerComponent = __decorate([
        core_1.Component({
            templateUrl: './case-viewer.component.html',
            styleUrls: ['./case-viewer.scss']
        })
    ], CaseViewerComponent);
    return CaseViewerComponent;
}());
exports.CaseViewerComponent = CaseViewerComponent;
