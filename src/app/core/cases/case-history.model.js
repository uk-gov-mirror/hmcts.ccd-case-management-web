"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var case_tab_model_1 = require("./case-tab.model");
var case_view_event_model_1 = require("./case-view-event.model");
var class_transformer_1 = require("class-transformer");
var jurisdiction_model_1 = require("../../shared/domain/definition/jurisdiction.model");
var CaseHistoryCaseType = /** @class */ (function () {
    function CaseHistoryCaseType() {
    }
    __decorate([
        class_transformer_1.Type(function () { return jurisdiction_model_1.Jurisdiction; })
    ], CaseHistoryCaseType.prototype, "jurisdiction", void 0);
    return CaseHistoryCaseType;
}());
exports.CaseHistoryCaseType = CaseHistoryCaseType;
var CaseHistory = /** @class */ (function () {
    function CaseHistory() {
    }
    __decorate([
        class_transformer_1.Type(function () { return CaseHistoryCaseType; })
    ], CaseHistory.prototype, "caseType", void 0);
    __decorate([
        class_transformer_1.Type(function () { return case_tab_model_1.CaseTab; })
    ], CaseHistory.prototype, "tabs", void 0);
    __decorate([
        class_transformer_1.Type(function () { return case_view_event_model_1.CaseViewEvent; })
    ], CaseHistory.prototype, "event", void 0);
    return CaseHistory;
}());
exports.CaseHistory = CaseHistory;
