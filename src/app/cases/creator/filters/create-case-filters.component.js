"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var Subject_1 = require("rxjs/Subject");
var callback_errors_component_1 = require("../../../shared/error/callback-errors.component");
var access_types_model_1 = require("../../../shared/domain/case-view/access-types.model");
var CreateCaseFiltersComponent = /** @class */ (function () {
    function CreateCaseFiltersComponent(router, definitionsService, orderService, alertService) {
        this.router = router;
        this.definitionsService = definitionsService;
        this.orderService = orderService;
        this.alertService = alertService;
        this.formGroup = new forms_1.FormGroup({});
        this.callbackErrorsSubject = new Subject_1.Subject();
        this.triggerText = callback_errors_component_1.CallbackErrorsComponent.TRIGGER_TEXT_START;
        this.ignoreWarning = false;
    }
    CreateCaseFiltersComponent.prototype.ngOnInit = function () {
        this.selected = {};
        this.initControls();
        this.selectJurisdiction(this.jurisdictions, this.filterJurisdictionControl);
    };
    CreateCaseFiltersComponent.prototype.onJurisdictionIdChange = function () {
        var _this = this;
        this.resetCaseType();
        this.resetEvent();
        if (this.filterJurisdictionControl.value !== '') {
            this.formGroup.controls['caseType'].enable();
            this.selected.jurisdiction = this.findJurisdiction(this.jurisdictions, this.filterJurisdictionControl.value);
            this.definitionsService.getCaseTypes(this.selected.jurisdiction.id, access_types_model_1.CREATE_ACCESS)
                .subscribe(function (caseTypes) {
                _this.selectedJurisdictionCaseTypes = caseTypes;
                _this.selectCaseType(_this.selectedJurisdictionCaseTypes, _this.filterCaseTypeControl);
            });
        }
    };
    CreateCaseFiltersComponent.prototype.onCaseTypeIdChange = function () {
        this.resetEvent();
        if (this.filterCaseTypeControl.value !== '') {
            this.selected.caseType = this.findCaseType(this.selectedJurisdictionCaseTypes, this.filterCaseTypeControl.value);
            this.formGroup.controls['event'].enable();
            this.selectedCaseTypeEvents = this.sortEvents(this.selected.caseType.events);
            this.selectEvent(this.selectedCaseTypeEvents, this.filterEventControl);
        }
    };
    CreateCaseFiltersComponent.prototype.onEventIdChange = function () {
        this.resetErrors();
        if (this.filterEventControl.value !== '') {
            this.selected.event = this.findEvent(this.selectedCaseTypeEvents, this.filterEventControl.value);
        }
        else {
            this.selected.event = null;
        }
    };
    CreateCaseFiltersComponent.prototype.isCreatable = function () {
        return !this.isEmpty(this.selected) &&
            !this.isEmpty(this.selected.jurisdiction) &&
            !this.isEmpty(this.selected.caseType) &&
            !this.isEmpty(this.selected.event) &&
            !this.hasCallbackErrors() &&
            !this.hasInvalidData();
    };
    CreateCaseFiltersComponent.prototype.apply = function () {
        var _this = this;
        var queryParams = {};
        if (this.ignoreWarning) {
            queryParams['ignoreWarning'] = this.ignoreWarning;
        }
        return this.router.navigate(['/create/case', this.selected.jurisdiction.id, this.selected.caseType.id, this.selected.event.id], {
            queryParams: queryParams
        }).catch(function (error) {
            _this.error = error;
            _this.callbackErrorsSubject.next(error);
        });
    };
    CreateCaseFiltersComponent.prototype.callbackErrorsNotify = function (errorContext) {
        this.ignoreWarning = errorContext.ignore_warning;
        this.triggerText = errorContext.trigger_text;
    };
    CreateCaseFiltersComponent.prototype.sortEvents = function (events) {
        return this.orderService.sort(this.retainEventsWithNoPreStates(events));
    };
    CreateCaseFiltersComponent.prototype.retainEventsWithNoPreStates = function (events) {
        return events.filter(function (event) { return event.pre_states.length === 0; });
    };
    CreateCaseFiltersComponent.prototype.selectJurisdiction = function (jurisdictions, filterJurisdictionControl) {
        if (jurisdictions.length === 1) {
            filterJurisdictionControl.setValue(jurisdictions[0].id);
            this.onJurisdictionIdChange();
        }
    };
    CreateCaseFiltersComponent.prototype.selectCaseType = function (jurisdictions, filterCaseTypeControl) {
        if (jurisdictions.length === 1) {
            filterCaseTypeControl.setValue(jurisdictions[0].id);
            this.onCaseTypeIdChange();
        }
    };
    CreateCaseFiltersComponent.prototype.selectEvent = function (events, filterEventControl) {
        if (events.length === 1) {
            filterEventControl.setValue(events[0].id);
            this.onEventIdChange();
        }
    };
    CreateCaseFiltersComponent.prototype.findJurisdiction = function (jurisdictions, id) {
        return jurisdictions.find(function (j) { return j.id === id; });
    };
    CreateCaseFiltersComponent.prototype.findCaseType = function (caseTypes, id) {
        return caseTypes.find(function (caseType) { return caseType.id === id; });
    };
    CreateCaseFiltersComponent.prototype.findEvent = function (events, id) {
        return events.find(function (event) { return event.id === id; });
    };
    CreateCaseFiltersComponent.prototype.initControls = function () {
        this.filterJurisdictionControl = new forms_1.FormControl('');
        this.formGroup.addControl('jurisdiction', this.filterJurisdictionControl);
        this.filterCaseTypeControl = new forms_1.FormControl({ value: '', disabled: true });
        this.formGroup.addControl('caseType', this.filterCaseTypeControl);
        this.filterEventControl = new forms_1.FormControl({ value: '', disabled: true });
        this.formGroup.addControl('event', this.filterEventControl);
    };
    CreateCaseFiltersComponent.prototype.resetCaseType = function () {
        this.resetErrors();
        this.filterCaseTypeControl.setValue('');
        this.selected.caseType = null;
        this.selectedJurisdictionCaseTypes = [];
        this.formGroup.controls['caseType'].disable();
    };
    CreateCaseFiltersComponent.prototype.resetEvent = function () {
        this.resetErrors();
        this.filterEventControl.setValue('');
        this.selected.event = null;
        this.selectedCaseTypeEvents = [];
        this.formGroup.controls['event'].disable();
    };
    CreateCaseFiltersComponent.prototype.resetErrors = function () {
        this.error = null;
        this.callbackErrorsSubject.next(null);
        this.alertService.clear();
    };
    CreateCaseFiltersComponent.prototype.hasCallbackErrors = function () {
        return this.error
            && this.error.callbackErrors
            && this.error.callbackErrors.length;
    };
    CreateCaseFiltersComponent.prototype.hasInvalidData = function () {
        return this.error
            && this.error.details
            && this.error.details.field_errors
            && this.error.details.field_errors.length;
    };
    CreateCaseFiltersComponent.prototype.isEmpty = function (value) {
        return value === null || value === undefined;
    };
    __decorate([
        core_1.Input()
    ], CreateCaseFiltersComponent.prototype, "jurisdictions", void 0);
    __decorate([
        core_1.Input()
    ], CreateCaseFiltersComponent.prototype, "formGroup", void 0);
    CreateCaseFiltersComponent = __decorate([
        core_1.Component({
            selector: 'ccd-create-case-filters',
            templateUrl: './create-case-filters.html',
            styleUrls: ['./create-case-filters.scss']
        })
    ], CreateCaseFiltersComponent);
    return CreateCaseFiltersComponent;
}());
exports.CreateCaseFiltersComponent = CreateCaseFiltersComponent;
