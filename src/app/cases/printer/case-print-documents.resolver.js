"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var http_error_model_1 = require("../../core/http/http-error.model");
var core_1 = require("@angular/core");
var CasePrintDocumentsResolver = /** @class */ (function () {
    function CasePrintDocumentsResolver(casesService, alertService) {
        this.casesService = casesService;
        this.alertService = alertService;
    }
    CasePrintDocumentsResolver_1 = CasePrintDocumentsResolver;
    CasePrintDocumentsResolver.prototype.resolve = function (route) {
        var _this = this;
        var caseDetails = route.parent.data.case;
        return this.casesService
            .getPrintDocuments(caseDetails.case_type.jurisdiction.id, caseDetails.case_type.id, caseDetails.case_id)
            .map(function (documents) {
            if (!documents || !documents.length) {
                var error = new http_error_model_1.HttpError();
                error.message = CasePrintDocumentsResolver_1.ERROR_MESSAGE;
                throw error;
            }
            return documents;
        })
            .catch(function (error) {
            _this.alertService.error(error.message);
            return Observable_1.Observable.throw(error);
        });
    };
    CasePrintDocumentsResolver.ERROR_MESSAGE = 'No documents to print';
    CasePrintDocumentsResolver = CasePrintDocumentsResolver_1 = __decorate([
        core_1.Injectable()
    ], CasePrintDocumentsResolver);
    return CasePrintDocumentsResolver;
    var CasePrintDocumentsResolver_1;
}());
exports.CasePrintDocumentsResolver = CasePrintDocumentsResolver;
