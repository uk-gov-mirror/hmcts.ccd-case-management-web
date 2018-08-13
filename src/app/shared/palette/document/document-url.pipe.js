"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DocumentUrlPipe = /** @class */ (function () {
    function DocumentUrlPipe(appConfig) {
        this.appConfig = appConfig;
    }
    DocumentUrlPipe.prototype.transform = function (value) {
        var remoteDocumentManagementPattern = new RegExp(this.appConfig.getRemoteDocumentManagementUrl());
        return value.replace(remoteDocumentManagementPattern, this.appConfig.getDocumentManagementUrl());
    };
    DocumentUrlPipe = __decorate([
        core_1.Pipe({
            name: 'ccdDocumentUrl'
        })
    ], DocumentUrlPipe);
    return DocumentUrlPipe;
}());
exports.DocumentUrlPipe = DocumentUrlPipe;
