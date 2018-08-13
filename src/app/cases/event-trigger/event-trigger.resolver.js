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
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
var EventTriggerResolver = /** @class */ (function () {
    function EventTriggerResolver(casesService, alertService) {
        this.casesService = casesService;
        this.alertService = alertService;
    }
    EventTriggerResolver_1 = EventTriggerResolver;
    EventTriggerResolver.prototype.resolve = function (route) {
        return this.isTriggerEventRoute(route) ? this.getAndCacheEventTrigger(route)
            : this.cachedEventTrigger ? Observable_1.Observable.of(this.cachedEventTrigger)
                : this.getAndCacheEventTrigger(route);
    };
    EventTriggerResolver.prototype.isTriggerEventRoute = function (route) {
        // if route is 'trigger/:eid'
        // this strategy to detect if route is the trigger event route is a bit fragile
        return !route.firstChild || !route.firstChild.url.length;
    };
    EventTriggerResolver.prototype.getAndCacheEventTrigger = function (route) {
        var _this = this;
        var caseDetails = route.parent.data.case;
        var eventTriggerId = route.paramMap.get(EventTriggerResolver_1.PARAM_EVENT_ID);
        var ignoreWarning = route.queryParamMap.get(EventTriggerResolver_1.IGNORE_WARNING);
        if (-1 === EventTriggerResolver_1.IGNORE_WARNING_VALUES.indexOf(ignoreWarning)) {
            ignoreWarning = 'false';
        }
        return this.casesService
            .getEventTrigger(caseDetails.case_type.jurisdiction.id, caseDetails.case_type.id, eventTriggerId, caseDetails.case_id, ignoreWarning)
            .do(function (eventTrigger) { return _this.cachedEventTrigger = eventTrigger; })
            .catch(function (error) {
            _this.alertService.error(error.message);
            return Observable_1.Observable.throw(error);
        });
    };
    EventTriggerResolver.PARAM_EVENT_ID = 'eid';
    EventTriggerResolver.IGNORE_WARNING = 'ignoreWarning';
    EventTriggerResolver.IGNORE_WARNING_VALUES = ['true', 'false'];
    EventTriggerResolver = EventTriggerResolver_1 = __decorate([
        core_1.Injectable()
    ], EventTriggerResolver);
    return EventTriggerResolver;
    var EventTriggerResolver_1;
}());
exports.EventTriggerResolver = EventTriggerResolver;
