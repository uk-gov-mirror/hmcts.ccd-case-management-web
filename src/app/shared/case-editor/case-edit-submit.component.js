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
var callback_errors_component_1 = require("../error/callback-errors.component");
var confirmation_model_1 = require("./confirmation.model");
var palette_context_enum_1 = require("../palette/base-field/palette-context.enum");
var CaseEditSubmitComponent = /** @class */ (function () {
    function CaseEditSubmitComponent(caseEdit, formValueService, formErrorService, fieldsUtils, caseFieldService, route, orderService) {
        this.caseEdit = caseEdit;
        this.formValueService = formValueService;
        this.formErrorService = formErrorService;
        this.fieldsUtils = fieldsUtils;
        this.caseFieldService = caseFieldService;
        this.route = route;
        this.orderService = orderService;
        this.callbackErrorsSubject = new Subject_1.Subject();
        this.ignoreWarning = false;
        this.paletteContext = palette_context_enum_1.PaletteContext.CHECK_YOUR_ANSWER;
    }
    CaseEditSubmitComponent_1 = CaseEditSubmitComponent;
    CaseEditSubmitComponent.prototype.ngOnInit = function () {
        this.eventTrigger = this.caseEdit.eventTrigger;
        this.triggerText = this.eventTrigger.end_button_label || callback_errors_component_1.CallbackErrorsComponent.TRIGGER_TEXT_SUBMIT;
        this.editForm = this.caseEdit.form;
        this.wizard = this.caseEdit.wizard;
        this.profile = this.getProfile(this.route);
        this.showSummaryFields = this.sortFieldsByShowSummaryContent(this.eventTrigger.case_fields);
    };
    CaseEditSubmitComponent.prototype.submit = function () {
        var _this = this;
        var caseEventData = this.formValueService.sanitise(this.editForm.value);
        caseEventData.event_token = this.eventTrigger.event_token;
        caseEventData.ignore_warning = this.ignoreWarning;
        this.caseEdit.submit(caseEventData)
            .subscribe(function (response) {
            var confirmation = _this.buildConfirmation(response);
            if (confirmation && (confirmation.getHeader() || confirmation.getBody())) {
                _this.caseEdit.confirm(confirmation);
            }
            else {
                _this.caseEdit.submitted.emit({ caseId: response['id'], status: response['callback_response_status'] });
            }
        }, function (error) {
            _this.error = error;
            _this.callbackErrorsSubject.next(_this.error);
            if (_this.error.details) {
                _this.formErrorService
                    .mapFieldErrors(_this.error.details.field_errors, _this.editForm.controls['data'], 'validation');
            }
        });
    };
    CaseEditSubmitComponent.prototype.isDisabled = function () {
        return !this.editForm.valid || this.hasErrors();
    };
    CaseEditSubmitComponent.prototype.hasErrors = function () {
        return this.error
            && this.error.callbackErrors
            && this.error.callbackErrors.length;
    };
    CaseEditSubmitComponent.prototype.navigateToPage = function (pageId) {
        this.caseEdit.navigateToPage(pageId);
    };
    CaseEditSubmitComponent.prototype.callbackErrorsNotify = function (errorContext) {
        this.ignoreWarning = errorContext.ignore_warning;
        this.triggerText = errorContext.trigger_text;
    };
    CaseEditSubmitComponent.prototype.summaryCaseField = function (field) {
        var cloneField = Object.assign({}, field);
        if (null == this.editForm.get('data').get(field.id)) {
            // If not in form, return field itself
            return field;
        }
        cloneField.value = this.editForm.get('data').get(field.id).value;
        return cloneField;
    };
    CaseEditSubmitComponent.prototype.cancel = function () {
        this.caseEdit.cancel();
    };
    CaseEditSubmitComponent.prototype.isChangeAllowed = function (field) {
        return !this.caseFieldService.isReadOnly(field);
    };
    CaseEditSubmitComponent.prototype.checkYourAnswerFieldsToDisplayExists = function () {
        if (!this.eventTrigger.show_summary) {
            return false;
        }
        for (var _i = 0, _a = this.wizard.pages; _i < _a.length; _i++) {
            var page = _a[_i];
            if (this.isShown(page)) {
                for (var _b = 0, _c = page.case_fields; _b < _c.length; _b++) {
                    var field = _c[_b];
                    if (this.canShowFieldInCYA(field)) {
                        // at least one field needs showing
                        return true;
                    }
                }
            }
        }
        // found no fields to show in CYA summary page
        return false;
    };
    CaseEditSubmitComponent.prototype.readOnlySummaryFieldsToDisplayExists = function () {
        return this.eventTrigger.case_fields.some(function (field) { return field.show_summary_content_option >= 0; });
    };
    CaseEditSubmitComponent.prototype.showEventNotes = function () {
        return this.eventTrigger.show_event_notes !== false;
    };
    CaseEditSubmitComponent.prototype.getLastPageShown = function () {
        var _this = this;
        var lastPage;
        this.wizard.reverse().forEach(function (page) {
            if (!lastPage && _this.isShown(page)) {
                lastPage = page;
            }
        });
        // noinspection JSUnusedAssignment
        return lastPage;
    };
    CaseEditSubmitComponent.prototype.previous = function () {
        if (this.hasPrevious()) {
            this.navigateToPage(this.getLastPageShown().id);
        }
    };
    CaseEditSubmitComponent.prototype.hasPrevious = function () {
        return !!this.getLastPageShown();
    };
    CaseEditSubmitComponent.prototype.isShown = function (page) {
        var fields = this.fieldsUtils
            .mergeCaseFieldsAndFormFields(this.eventTrigger.case_fields, this.editForm.controls['data'].value);
        return page.parsedShowCondition.match(fields);
    };
    CaseEditSubmitComponent.prototype.canShowFieldInCYA = function (field) {
        return field.show_summary_change_option;
    };
    CaseEditSubmitComponent.prototype.isSolicitor = function () {
        return this.profile.isSolicitor();
    };
    CaseEditSubmitComponent.prototype.getProfile = function (route) {
        return route.snapshot.pathFromRoot[1].data.profile;
    };
    CaseEditSubmitComponent.prototype.buildConfirmation = function (response) {
        if (response['after_submit_callback_response']) {
            return new confirmation_model_1.Confirmation(response['id'], response['callback_response_status'], response['after_submit_callback_response']['confirmation_header'], response['after_submit_callback_response']['confirmation_body']);
        }
        else {
            return null;
        }
    };
    CaseEditSubmitComponent.prototype.sortFieldsByShowSummaryContent = function (fields) {
        return this.orderService
            .sort(fields, CaseEditSubmitComponent_1.SHOW_SUMMARY_CONTENT_COMPARE_FUNCTION)
            .filter(function (cf) { return cf.show_summary_content_option; });
    };
    CaseEditSubmitComponent.prototype.getCaseId = function () {
        return (this.caseEdit.caseDetails ? this.caseEdit.caseDetails.case_id : '');
    };
    CaseEditSubmitComponent.SHOW_SUMMARY_CONTENT_COMPARE_FUNCTION = function (a, b) {
        var aCaseField = a.show_summary_content_option === 0 || a.show_summary_content_option;
        var bCaseField = b.show_summary_content_option === 0 || b.show_summary_content_option;
        if (!aCaseField) {
            return !bCaseField ? 0 : 1;
        }
        if (!bCaseField) {
            return -1;
        }
        return a.show_summary_content_option - b.show_summary_content_option;
    };
    CaseEditSubmitComponent = CaseEditSubmitComponent_1 = __decorate([
        core_1.Component({
            selector: 'ccd-case-edit-submit',
            templateUrl: 'case-edit-submit.html',
            styleUrls: ['./case-edit.scss']
        })
    ], CaseEditSubmitComponent);
    return CaseEditSubmitComponent;
    var CaseEditSubmitComponent_1;
}());
exports.CaseEditSubmitComponent = CaseEditSubmitComponent;
