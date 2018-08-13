"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var event_status_service_1 = require("../../core/cases/event-status.service");
var CaseCreatorSubmitComponent = /** @class */ (function () {
    function CaseCreatorSubmitComponent(casesService, router, alertService, route, caseReferencePipe) {
        this.casesService = casesService;
        this.router = router;
        this.alertService = alertService;
        this.route = route;
        this.caseReferencePipe = caseReferencePipe;
        this.eventTrigger = route.snapshot.data.eventTrigger;
    }
    CaseCreatorSubmitComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.jurisdictionId = params['jid'];
            _this.caseTypeId = params['ctid'];
        });
    };
    CaseCreatorSubmitComponent.prototype.submit = function () {
        var _this = this;
        return function (sanitizedEditForm) { return _this.casesService.createCase(_this.jurisdictionId, _this.caseTypeId, sanitizedEditForm); };
    };
    CaseCreatorSubmitComponent.prototype.validate = function () {
        var _this = this;
        return function (sanitizedEditForm) { return _this.casesService.validateCase(_this.jurisdictionId, _this.caseTypeId, sanitizedEditForm); };
    };
    CaseCreatorSubmitComponent.prototype.submitted = function (event) {
        var _this = this;
        var caseId = event['caseId'];
        var eventStatus = event['status'];
        this.router
            .navigate(['case', this.jurisdictionId, this.caseTypeId, caseId])
            .then(function () {
            var caseReference = _this.caseReferencePipe.transform(String(caseId));
            if (event_status_service_1.EventStatusService.isIncomplete(eventStatus)) {
                _this.alertService.warning("Case #" + caseReference + " has been created with event: " + _this.eventTrigger.name + " "
                    + "but the callback service cannot be completed");
            }
            else {
                _this.alertService.success("Case #" + caseReference + " has been created with event: " + _this.eventTrigger.name);
            }
        });
    };
    CaseCreatorSubmitComponent.prototype.cancel = function () {
        return this.router.navigate(['/create/case']);
    };
    CaseCreatorSubmitComponent = __decorate([
        core_1.Component({
            selector: 'ccd-case-creator-submit',
            templateUrl: 'case-creator-submit.component.html'
        })
    ], CaseCreatorSubmitComponent);
    return CaseCreatorSubmitComponent;
}());
exports.CaseCreatorSubmitComponent = CaseCreatorSubmitComponent;
