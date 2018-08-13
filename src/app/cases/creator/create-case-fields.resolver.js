"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
var CreateCaseFieldsResolver = /** @class */ (function () {
    function CreateCaseFieldsResolver(casesService, alertService) {
        this.casesService = casesService;
        this.alertService = alertService;
    }
    CreateCaseFieldsResolver_1 = CreateCaseFieldsResolver;
    CreateCaseFieldsResolver.prototype.resolve = function (route) {
        var _this = this;
        var jurisdictionId = route.paramMap.get(CreateCaseFieldsResolver_1.PARAM_JURISDICTION_ID);
        var caseTypeId = route.paramMap.get(CreateCaseFieldsResolver_1.PARAM_CASE_TYPE_ID);
        var eventTriggerId = route.paramMap.get(CreateCaseFieldsResolver_1.PARAM_EVENT_ID);
        var ignoreWarning = route.queryParamMap.get(CreateCaseFieldsResolver_1.QUERY_PARAM_IGNORE_WARNING);
        if (-1 === CreateCaseFieldsResolver_1.IGNORE_WARNING_VALUES.indexOf(ignoreWarning)) {
            ignoreWarning = 'false';
        }
        return this.casesService
            .getEventTrigger(jurisdictionId, caseTypeId, eventTriggerId, undefined, ignoreWarning)
            .catch(function (error) {
            _this.alertService.error(error.message);
            return Observable_1.Observable.throw(error);
        });
    };
    CreateCaseFieldsResolver.PARAM_JURISDICTION_ID = 'jid';
    CreateCaseFieldsResolver.PARAM_CASE_TYPE_ID = 'ctid';
    CreateCaseFieldsResolver.PARAM_EVENT_ID = 'eid';
    CreateCaseFieldsResolver.QUERY_PARAM_IGNORE_WARNING = 'ignoreWarning';
    CreateCaseFieldsResolver.IGNORE_WARNING_VALUES = ['true', 'false'];
    CreateCaseFieldsResolver = CreateCaseFieldsResolver_1 = __decorate([
        core_1.Injectable()
    ], CreateCaseFieldsResolver);
    return CreateCaseFieldsResolver;
    var CreateCaseFieldsResolver_1;
}());
exports.CreateCaseFieldsResolver = CreateCaseFieldsResolver;
