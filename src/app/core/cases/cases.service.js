"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var conditional_show_model_1 = require("../../shared/conditional-show/conditional-show.model");
var CasesService = /** @class */ (function () {
    function CasesService(http, appConfig, orderService, errorService) {
        this.http = http;
        this.appConfig = appConfig;
        this.orderService = orderService;
        this.errorService = errorService;
        /**
         *
         * @type {(caseId:string)=>"../../Observable".Observable<Case>}
         * @deprecated Use `CasesService::getCaseView` instead
         */
        this.get = this.getCaseView;
    }
    CasesService.prototype.getCaseView = function (jurisdictionId, caseTypeId, caseId) {
        var _this = this;
        // console.log('retrieving case');
        var url = this.appConfig.getApiUrl()
            + "/caseworkers/:uid"
            + ("/jurisdictions/" + jurisdictionId)
            + ("/case-types/" + caseTypeId)
            + ("/cases/" + caseId);
        return this.http
            .get(url)
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            _this.errorService.setError(error);
            return rxjs_1.Observable.throw(error);
        });
    };
    CasesService.prototype.getEventTrigger = function (jurisdictionId, caseTypeId, eventTriggerId, caseId, ignoreWarning) {
        var _this = this;
        // console.log('retrieve event trigger');
        ignoreWarning = undefined !== ignoreWarning ? ignoreWarning : 'false';
        var url = this.appConfig.getApiUrl()
            + "/caseworkers/:uid"
            + ("/jurisdictions/" + jurisdictionId)
            + ("/case-types/" + caseTypeId)
            + ("/cases/" + caseId)
            + ("/event-triggers/" + eventTriggerId)
            + ("?ignore-warning=" + ignoreWarning);
        if (caseId === undefined || caseId === null) {
            url = this.appConfig.getApiUrl()
                + "/caseworkers/:uid"
                + ("/jurisdictions/" + jurisdictionId)
                + ("/case-types/" + caseTypeId)
                + ("/event-triggers/" + eventTriggerId)
                + ("?ignore-warning=" + ignoreWarning);
        }
        return this.http
            .get(url)
            .map(function (response) { return response.json(); })
            .do(function (eventTrigger) {
            if (!eventTrigger.wizard_pages) {
                eventTrigger.wizard_pages = [];
            }
            /* FIXME: we need to move this code and provide a better way to map json response to our
            domain objects. We should call WizardPage constructor instead of manually assigning methods
            and properties */
            eventTrigger.wizard_pages.forEach(function (wizardPage) {
                wizardPage.parsedShowCondition = new conditional_show_model_1.ShowCondition(wizardPage.show_condition);
                var orderedWPFields = _this.orderService.sort(wizardPage.wizard_page_fields);
                wizardPage.case_fields = orderedWPFields.map(function (wizardField) {
                    var case_field = eventTrigger.case_fields.find(function (cf) { return cf.id === wizardField.case_field_id; });
                    case_field.wizardProps = wizardField;
                    return case_field;
                });
                wizardPage.getCol1Fields = function () {
                    return wizardPage.case_fields.filter(function (f) {
                        return !f.wizardProps.page_column_no || f.wizardProps.page_column_no === 1;
                    });
                };
                wizardPage.getCol2Fields = function () {
                    return wizardPage.case_fields.filter(function (f) { return f.wizardProps.page_column_no === 2; });
                };
                wizardPage.isMultiColumn = function () { return wizardPage.getCol2Fields().length > 0; };
            });
        })
            .catch(function (error) {
            _this.errorService.setError(error);
            return rxjs_1.Observable.throw(error);
        });
    };
    CasesService.prototype.createEvent = function (caseDetails, eventData) {
        var _this = this;
        var jid = caseDetails.case_type.jurisdiction.id;
        var ctid = caseDetails.case_type.id;
        var caseId = caseDetails.case_id;
        var url = this.appConfig.getCaseDataUrl() + ("/caseworkers/:uid/jurisdictions/" + jid + "/case-types/" + ctid + "/cases/" + caseId + "/events");
        return this.http
            .post(url, eventData)
            .map(function (response) { return _this.processResponse(response); })
            .catch(function (error) {
            _this.errorService.setError(error);
            return rxjs_1.Observable.throw(error);
        });
    };
    CasesService.prototype.validateCase = function (jid, ctid, eventData) {
        var _this = this;
        var url = this.appConfig.getCaseDataUrl()
            + ("/caseworkers/:uid/jurisdictions/" + jid + "/case-types/" + ctid + "/validate");
        return this.http
            .post(url, eventData)
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            _this.errorService.setError(error);
            return rxjs_1.Observable.throw(error);
        });
    };
    CasesService.prototype.createCase = function (jid, ctid, eventData) {
        var _this = this;
        var ignoreWarning = 'false';
        if (eventData.ignore_warning) {
            ignoreWarning = 'true';
        }
        var url = this.appConfig.getCaseDataUrl()
            + ("/caseworkers/:uid/jurisdictions/" + jid + "/case-types/" + ctid + "/cases?ignore-warning=" + ignoreWarning);
        return this.http
            .post(url, eventData)
            .map(function (response) { return _this.processResponse(response); })
            .catch(function (error) {
            _this.errorService.setError(error);
            return rxjs_1.Observable.throw(error);
        });
    };
    CasesService.prototype.getPrintDocuments = function (jurisdictionId, caseTypeId, caseId) {
        var _this = this;
        var url = this.appConfig.getCaseDataUrl()
            + "/caseworkers/:uid"
            + ("/jurisdictions/" + jurisdictionId)
            + ("/case-types/" + caseTypeId)
            + ("/cases/" + caseId)
            + "/documents";
        return this.http
            .get(url)
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            _this.errorService.setError(error);
            return rxjs_1.Observable.throw(error);
        });
    };
    CasesService.prototype.processResponse = function (response) {
        if (response.headers && response.headers.get('content-type') === 'application/json;charset=UTF-8') {
            return response.json();
        }
        return { 'id': '' };
    };
    CasesService = __decorate([
        core_1.Injectable()
    ], CasesService);
    return CasesService;
}());
exports.CasesService = CasesService;
