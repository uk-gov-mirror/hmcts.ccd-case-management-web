"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var DocumentManagementService = /** @class */ (function () {
    function DocumentManagementService(http, appConfig) {
        this.http = http;
        this.appConfig = appConfig;
    }
    DocumentManagementService_1 = DocumentManagementService;
    DocumentManagementService.prototype.uploadFile = function (formData) {
        var url = this.appConfig.getDocumentManagementUrl();
        var headers = new http_1.Headers();
        headers.append(DocumentManagementService_1.HEADER_ACCEPT, null);
        // Content-Type header value needs to be null; HttpService will delete it, so that Angular can set it automatically
        // with the correct boundary
        headers.append(DocumentManagementService_1.HEADER_CONTENT_TYPE, null);
        return this.http
            .post(url, formData, { headers: headers })
            .map(function (response) { return response.json(); });
    };
    DocumentManagementService.HEADER_ACCEPT = 'Accept';
    DocumentManagementService.HEADER_CONTENT_TYPE = 'Content-Type';
    DocumentManagementService = DocumentManagementService_1 = __decorate([
        core_1.Injectable()
    ], DocumentManagementService);
    return DocumentManagementService;
    var DocumentManagementService_1;
}());
exports.DocumentManagementService = DocumentManagementService;
