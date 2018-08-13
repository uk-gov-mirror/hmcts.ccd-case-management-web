"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var callback_errors_component_1 = require("../error/callback-errors.component");
var Subject_1 = require("rxjs/Subject");
var CaseEditPageComponent = /** @class */ (function () {
    function CaseEditPageComponent(caseEdit, route, formValueService, formErrorService, cdRef, pageValidationService) {
        this.caseEdit = caseEdit;
        this.route = route;
        this.formValueService = formValueService;
        this.formErrorService = formErrorService;
        this.cdRef = cdRef;
        this.pageValidationService = pageValidationService;
        this.callbackErrorsSubject = new Subject_1.Subject();
        this.ignoreWarning = false;
        this.triggerText = callback_errors_component_1.CallbackErrorsComponent.TRIGGER_TEXT_SUBMIT;
        this.isSubmitting = false;
    }
    CaseEditPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.eventTrigger = this.caseEdit.eventTrigger;
        this.editForm = this.caseEdit.form;
        this.route.params.subscribe(function (params) {
            var pageId = params['page'];
            if (!_this.currentPage || pageId !== _this.currentPage.id) {
                var page = _this.caseEdit.getPage(pageId);
                if (page) {
                    _this.currentPage = page;
                }
                else {
                    if (_this.currentPage) {
                        return _this.next();
                    }
                    else {
                        return _this.first();
                    }
                }
            }
        });
    };
    CaseEditPageComponent.prototype.ngAfterViewChecked = function () {
        this.cdRef.detectChanges();
    };
    CaseEditPageComponent.prototype.first = function () {
        return this.caseEdit.first();
    };
    CaseEditPageComponent.prototype.currentPageIsNotValid = function () {
        return !this.pageValidationService.isPageValid(this.currentPage, this.editForm);
    };
    CaseEditPageComponent.prototype.submit = function () {
        var _this = this;
        if (!this.isSubmitting) {
            this.isSubmitting = true;
            this.error = null;
            var currentPageFields = this.formValueService.filterCurrentPageFields(this.currentPage.case_fields, this.editForm.value);
            var caseEventData = this.formValueService.sanitise(currentPageFields);
            caseEventData.event_token = this.eventTrigger.event_token;
            caseEventData.ignore_warning = this.ignoreWarning;
            this.caseEdit.validate(caseEventData)
                .subscribe(function () { return _this.next(); }, function (error) {
                _this.isSubmitting = false;
                _this.error = error;
                _this.callbackErrorsSubject.next(_this.error);
                if (_this.error.details) {
                    _this.formErrorService
                        .mapFieldErrors(_this.error.details.field_errors, _this.editForm.controls['data'], 'validation');
                }
            });
            this.scrollToTop();
        }
    };
    CaseEditPageComponent.prototype.callbackErrorsNotify = function (errorContext) {
        this.ignoreWarning = errorContext.ignore_warning;
        this.triggerText = errorContext.trigger_text;
    };
    CaseEditPageComponent.prototype.next = function () {
        this.isSubmitting = false;
        return this.caseEdit.next(this.currentPage.id);
    };
    CaseEditPageComponent.prototype.previous = function () {
        this.error = null;
        return this.caseEdit.previous(this.currentPage.id);
    };
    CaseEditPageComponent.prototype.hasPrevious = function () {
        return this.caseEdit.hasPrevious(this.currentPage.id);
    };
    CaseEditPageComponent.prototype.cancel = function () {
        this.caseEdit.cancel();
    };
    CaseEditPageComponent.prototype.submitting = function () {
        return this.isSubmitting;
    };
    CaseEditPageComponent.prototype.scrollToTop = function () {
        window.scrollTo(0, 0);
    };
    CaseEditPageComponent.prototype.getCaseId = function () {
        return (this.caseEdit.caseDetails ? this.caseEdit.caseDetails.case_id : '');
    };
    CaseEditPageComponent = __decorate([
        core_1.Component({
            selector: 'ccd-case-edit-page',
            templateUrl: 'case-edit-page.html',
            styleUrls: ['./case-edit-page.scss']
        })
    ], CaseEditPageComponent);
    return CaseEditPageComponent;
}());
exports.CaseEditPageComponent = CaseEditPageComponent;
