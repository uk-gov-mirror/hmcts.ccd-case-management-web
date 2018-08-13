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
var case_history_model_1 = require("./case-history.model");
var class_transformer_1 = require("class-transformer");
var CaseHistoryService = /** @class */ (function () {
    function CaseHistoryService(httpService, httpErrorService, appConfig) {
        this.httpService = httpService;
        this.httpErrorService = httpErrorService;
        this.appConfig = appConfig;
    }
    CaseHistoryService.prototype.get = function (jurisdictionId, caseTypeId, caseId, eventId) {
        var _this = this;
        var url = this.appConfig.getCaseHistoryUrl(jurisdictionId, caseTypeId, caseId, eventId);
        return this.httpService
            .get(url)
            .map(function (response) { return response.json(); })
            .catch(function (error) {
            _this.httpErrorService.setError(error);
            return rxjs_1.Observable.throw(error);
        })
            .map(function (caseHistory) { return class_transformer_1.plainToClass(case_history_model_1.CaseHistory, caseHistory); });
    };
    CaseHistoryService = __decorate([
        core_1.Injectable()
    ], CaseHistoryService);
    return CaseHistoryService;
}());
exports.CaseHistoryService = CaseHistoryService;
