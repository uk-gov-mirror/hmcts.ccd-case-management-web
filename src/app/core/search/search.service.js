"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var SearchService = /** @class */ (function () {
    function SearchService(appConfig, httpService, requestOptionsBuilder) {
        this.appConfig = appConfig;
        this.httpService = httpService;
        this.requestOptionsBuilder = requestOptionsBuilder;
    }
    SearchService.prototype.search = function (jurisdictionId, caseTypeId, metaCriteria, caseCriteria, view) {
        var url = this.appConfig.getApiUrl() + "/caseworkers/:uid"
            + ("/jurisdictions/" + jurisdictionId)
            + ("/case-types/" + caseTypeId)
            + "/cases";
        var options = this.requestOptionsBuilder.buildOptions(metaCriteria, caseCriteria, view);
        return this.httpService
            .get(url, options)
            .map(function (response) { return response.json(); });
    };
    SearchService.prototype.getSearchInputUrl = function (jurisdictionId, caseTypeId) {
        return this.appConfig.getApiUrl() + "/caseworkers/:uid/jurisdictions/" + jurisdictionId + "/case-types/" + caseTypeId + "/inputs";
    };
    SearchService.prototype.getSearchInputs = function (jurisdictionId, caseTypeId) {
        var url = this.getSearchInputUrl(jurisdictionId, caseTypeId);
        return this.httpService
            .get(url)
            .map(function (response) {
            var searchInputs = response.json();
            searchInputs
                .forEach(function (item) { item.field.label = item.label; });
            return searchInputs;
        });
    };
    SearchService.VIEW_SEARCH = 'SEARCH';
    SearchService.VIEW_WORKBASKET = 'WORKBASKET';
    SearchService.FIELD_PREFIX = 'case.';
    SearchService = __decorate([
        core_1.Injectable()
    ], SearchService);
    return SearchService;
}());
exports.SearchService = SearchService;
