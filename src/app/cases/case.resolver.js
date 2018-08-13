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
var CaseResolver = /** @class */ (function () {
    function CaseResolver(casesService, router, alertService) {
        this.casesService = casesService;
        this.router = router;
        this.alertService = alertService;
    }
    CaseResolver_1 = CaseResolver;
    CaseResolver.prototype.resolve = function (route) {
        var _a = this.getParams(route.paramMap), jid = _a.jid, ctid = _a.ctid, cid = _a.cid;
        if (jid && ctid && !cid) {
            // when redirected to case view after a case created, and the user has no READ access,
            // the post returns no id
            this.navigateToCaseList();
        }
        else {
            return this.isCaseViewRoute(route) ? this.getAndCacheCaseView(jid, ctid, cid)
                : this.cachedCaseView ? Observable_1.Observable.of(this.cachedCaseView)
                    : this.getAndCacheCaseView(jid, ctid, cid);
        }
    };
    CaseResolver.prototype.getParams = function (pm) {
        var jid = pm.get(CaseResolver_1.PARAM_JURISDICTION_ID);
        var ctid = pm.get(CaseResolver_1.PARAM_CASE_TYPE_ID);
        var cid = pm.get(CaseResolver_1.PARAM_CASE_ID);
        return { jid: jid, ctid: ctid, cid: cid };
    };
    CaseResolver.prototype.navigateToCaseList = function () {
        var _this = this;
        this.router.navigate(['/list/case'])
            .then(function () { return _this.alertService.success(CaseResolver_1.CASE_CREATED_MSG); });
    };
    CaseResolver.prototype.isCaseViewRoute = function (route) {
        // this strategy to detect if route is the case view route is a bit fragile
        return !route.firstChild || !route.firstChild.url.length;
    };
    CaseResolver.prototype.getAndCacheCaseView = function (jid, ctid, cid) {
        var _this = this;
        return this.casesService
            .getCaseView(jid, ctid, cid)
            .do(function (caseView) { return _this.cachedCaseView = caseView; })
            .catch(function (error) {
            // TODO Should be logged to remote logging infrastructure
            console.error(error);
            if (error.status !== 401 && error.status !== 403) {
                _this.router.navigate(['/error']);
            }
            return Observable_1.Observable.throw(error);
        });
    };
    CaseResolver.PARAM_JURISDICTION_ID = 'jid';
    CaseResolver.PARAM_CASE_TYPE_ID = 'ctid';
    CaseResolver.PARAM_CASE_ID = 'cid';
    CaseResolver.CASE_CREATED_MSG = 'The case has been created successfully';
    CaseResolver = CaseResolver_1 = __decorate([
        core_1.Injectable()
    ], CaseResolver);
    return CaseResolver;
    var CaseResolver_1;
}());
exports.CaseResolver = CaseResolver;
