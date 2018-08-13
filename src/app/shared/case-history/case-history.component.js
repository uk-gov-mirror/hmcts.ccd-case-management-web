"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var conditional_show_model_1 = require("../conditional-show/conditional-show.model");
var CaseHistoryComponent = /** @class */ (function () {
    function CaseHistoryComponent(route, orderService) {
        this.route = route;
        this.orderService = orderService;
    }
    CaseHistoryComponent.prototype.ngOnInit = function () {
        this.caseHistory = this.route.snapshot.data.caseHistory;
        this.tabs = this.sortTabFieldsAndFilterTabs(this.caseHistory.tabs);
    };
    CaseHistoryComponent.prototype.sortTabFieldsAndFilterTabs = function (tabs) {
        var _this = this;
        return tabs
            .map(function (tab) { return Object.assign({}, tab, { fields: _this.orderService.sort(tab.fields) }); })
            .filter(function (tab) { return new conditional_show_model_1.ShowCondition(tab.show_condition).matchByCaseFields(tab.fields); });
    };
    CaseHistoryComponent = __decorate([
        core_1.Component({
            templateUrl: './case-history.component.html',
            styleUrls: ['./case-history.component.scss']
        })
    ], CaseHistoryComponent);
    return CaseHistoryComponent;
}());
exports.CaseHistoryComponent = CaseHistoryComponent;
