"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var activity_model_1 = require("../../core/activity/activity.model");
var event_status_service_1 = require("../../core/cases/event-status.service");
var CaseEventTriggerComponent = /** @class */ (function () {
    function CaseEventTriggerComponent(casesService, router, alertService, route, caseReferencePipe, activityPollingService) {
        this.casesService = casesService;
        this.router = router;
        this.alertService = alertService;
        this.route = route;
        this.caseReferencePipe = caseReferencePipe;
        this.activityPollingService = activityPollingService;
        this.BANNER = activity_model_1.DisplayMode.BANNER;
    }
    CaseEventTriggerComponent.prototype.ngOnInit = function () {
        this.caseDetails = this.route.snapshot.data.case;
        this.eventTrigger = this.route.snapshot.data.eventTrigger;
        this.subscription = this.postEditActivity().subscribe(function (_resolved) {
            // console.log('Posted EDIT activity and result is: ' + JSON.stringify(resolved));
        });
    };
    CaseEventTriggerComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    CaseEventTriggerComponent.prototype.postEditActivity = function () {
        return this.activityPollingService.postEditActivity(this.caseDetails.case_id);
    };
    CaseEventTriggerComponent.prototype.submit = function () {
        var _this = this;
        return function (sanitizedEditForm) { return _this.casesService.createEvent(_this.caseDetails, sanitizedEditForm); };
    };
    CaseEventTriggerComponent.prototype.validate = function () {
        var _this = this;
        return function (sanitizedEditForm) { return _this.casesService.validateCase(_this.caseDetails.case_type.jurisdiction.id, _this.caseDetails.case_type.id, sanitizedEditForm); };
    };
    CaseEventTriggerComponent.prototype.submitted = function (event) {
        var _this = this;
        var eventStatus = event['status'];
        this.router
            .navigate(['case', this.caseDetails.case_type.jurisdiction.id, this.caseDetails.case_type.id, this.caseDetails.case_id])
            .then(function () {
            var caseReference = _this.caseReferencePipe.transform(_this.caseDetails.case_id.toString());
            if (event_status_service_1.EventStatusService.isIncomplete(eventStatus)) {
                _this.alertService.warning("Case #" + caseReference + " has been updated with event: " + _this.eventTrigger.name + " "
                    + "but the callback service cannot be completed");
            }
            else {
                _this.alertService.success("Case #" + caseReference + " has been updated with event: " + _this.eventTrigger.name);
            }
        });
    };
    CaseEventTriggerComponent.prototype.cancel = function () {
        return this.router.navigate(['/case', this.caseDetails.case_type.jurisdiction.id, this.caseDetails.case_type.id,
            this.caseDetails.case_id]);
    };
    CaseEventTriggerComponent = __decorate([
        core_1.Component({
            selector: 'ccd-case-event-trigger',
            templateUrl: './case-event-trigger.html'
        })
    ], CaseEventTriggerComponent);
    return CaseEventTriggerComponent;
}());
exports.CaseEventTriggerComponent = CaseEventTriggerComponent;
