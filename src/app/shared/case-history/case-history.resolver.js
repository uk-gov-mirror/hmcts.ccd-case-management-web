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
require("rxjs/add/operator/catch");
var CaseHistoryResolver = /** @class */ (function () {
    function CaseHistoryResolver(caseHistoryService, router) {
        this.caseHistoryService = caseHistoryService;
        this.router = router;
    }
    CaseHistoryResolver_1 = CaseHistoryResolver;
    CaseHistoryResolver.prototype.resolve = function (route) {
        var _a = this.getParams(route.paramMap), jid = _a.jid, ctid = _a.ctid, cid = _a.cid, eid = _a.eid;
        return this.getCaseHistoryView(jid, ctid, cid, eid);
    };
    CaseHistoryResolver.prototype.getParams = function (pm) {
        var jid = pm.get(CaseHistoryResolver_1.PARAM_JURISDICTION_ID);
        var ctid = pm.get(CaseHistoryResolver_1.PARAM_CASE_TYPE_ID);
        var cid = pm.get(CaseHistoryResolver_1.PARAM_CASE_ID);
        var eid = pm.get(CaseHistoryResolver_1.PARAM_EVENT_ID);
        return { jid: jid, ctid: ctid, cid: cid, eid: eid };
    };
    CaseHistoryResolver.prototype.getCaseHistoryView = function (jid, ctid, cid, eid) {
        var _this = this;
        return this.caseHistoryService
            .get(jid, ctid, cid, eid)
            .catch(function (error) {
            console.error(error);
            if (error.status !== 401 && error.status !== 403) {
                _this.router.navigate(['/error']);
            }
            return Observable_1.Observable.throw(error);
        });
    };
    CaseHistoryResolver.PARAM_JURISDICTION_ID = 'jid';
    CaseHistoryResolver.PARAM_CASE_TYPE_ID = 'ctid';
    CaseHistoryResolver.PARAM_CASE_ID = 'cid';
    CaseHistoryResolver.PARAM_EVENT_ID = 'eid';
    CaseHistoryResolver = CaseHistoryResolver_1 = __decorate([
        core_1.Injectable()
    ], CaseHistoryResolver);
    return CaseHistoryResolver;
    var CaseHistoryResolver_1;
}());
exports.CaseHistoryResolver = CaseHistoryResolver;
