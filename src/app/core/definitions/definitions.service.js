"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DefinitionsService = /** @class */ (function () {
    function DefinitionsService(http, appConfig) {
        this.http = http;
        this.appConfig = appConfig;
    }
    DefinitionsService.prototype.getCaseTypes = function (jurisdictionId, access) {
        var url = this.appConfig.getApiUrl()
            + "/caseworkers/:uid"
            + ("/jurisdictions/" + jurisdictionId)
            + ("/case-types?access=" + access);
        return this.http
            .get(url)
            .map(function (response) { return response.json(); });
    };
    DefinitionsService = __decorate([
        core_1.Injectable()
    ], DefinitionsService);
    return DefinitionsService;
}());
exports.DefinitionsService = DefinitionsService;
