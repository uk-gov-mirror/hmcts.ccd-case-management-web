"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var activity_service_1 = require("./activity.service");
var rxjs_1 = require("rxjs");
var rxjs_2 = require("rxjs");
var rx_polling_1 = require("rx-polling");
var ActivityPollingService = /** @class */ (function () {
    function ActivityPollingService(activityService, ngZone, config) {
        this.activityService = activityService;
        this.ngZone = ngZone;
        this.config = config;
        this.pendingRequests = new Map();
        this.pollConfig = {
            interval: config.getActivityNexPollRequestMs(),
            attempts: config.getActivityRetry(),
        };
        this.batchCollectionDelayMs = config.getActivityBatchCollectionDelayMs();
        this.maxRequestsPerBatch = config.getActivityMaxRequestPerBatch();
    }
    ActivityPollingService.prototype.subscribeToActivity = function (caseId, done) {
        var _this = this;
        if (!this.isEnabled) {
            return new rxjs_2.Subject();
        }
        var subject = this.pendingRequests.get(caseId);
        if (subject) {
            subject.subscribe(done);
        }
        else {
            subject = new rxjs_2.Subject();
            subject.subscribe(done);
            this.pendingRequests.set(caseId, subject);
        }
        if (this.pendingRequests.size === 1) {
            this.ngZone.runOutsideAngular(function () {
                _this.currentTimeoutHandle = setTimeout(function () { return _this.ngZone.run(function () {
                    // console.log('timeout: flushing requests')
                    _this.flushRequests();
                }); }, _this.batchCollectionDelayMs);
            });
        }
        if (this.pendingRequests.size >= this.maxRequestsPerBatch) {
            // console.log('max pending hit: flushing requests');
            this.flushRequests();
        }
        return subject;
    };
    ActivityPollingService.prototype.stopPolling = function () {
        if (this.pollActivitiesSubscription) {
            this.pollActivitiesSubscription.unsubscribe();
        }
    };
    ActivityPollingService.prototype.flushRequests = function () {
        if (this.currentTimeoutHandle) {
            clearTimeout(this.currentTimeoutHandle);
            this.currentTimeoutHandle = undefined;
        }
        var requests = new Map(this.pendingRequests);
        this.pendingRequests.clear();
        this.performBatchRequest(requests);
    };
    ActivityPollingService.prototype.pollActivities = function () {
        var caseIds = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            caseIds[_i] = arguments[_i];
        }
        if (!this.isEnabled) {
            return rxjs_1.Observable.empty();
        }
        return rx_polling_1.default((_a = this.activityService).getActivities.apply(_a, caseIds), this.pollConfig);
        var _a;
    };
    ActivityPollingService.prototype.performBatchRequest = function (requests) {
        var caseIds = Array.from(requests.keys()).join();
        // console.log('issuing batch request for cases: ' + caseIds);
        this.pollActivitiesSubscription = this.pollActivities(caseIds).subscribe(function (activities) {
            activities.forEach(function (activity) {
                // console.log('pushing activity: ' + activity.caseId);
                requests.get(activity.caseId).next(activity);
            });
        }, function (err) {
            console.log('error: ' + err);
            Array.from(requests.values()).forEach(function (subject) { return subject.error(err); });
        });
    };
    ActivityPollingService.prototype.postViewActivity = function (caseId) {
        return this.postActivity(caseId, activity_service_1.ActivityService.ACTIVITY_VIEW);
    };
    ActivityPollingService.prototype.postEditActivity = function (caseId) {
        return this.postActivity(caseId, activity_service_1.ActivityService.ACTIVITY_EDIT);
    };
    ActivityPollingService.prototype.postActivity = function (caseId, activityType) {
        if (!this.isEnabled) {
            return rxjs_1.Observable.empty();
        }
        return rx_polling_1.default(this.activityService.postActivity(caseId, activityType), this.pollConfig);
    };
    Object.defineProperty(ActivityPollingService.prototype, "isEnabled", {
        get: function () {
            return this.activityService.isEnabled;
        },
        enumerable: true,
        configurable: true
    });
    ActivityPollingService = __decorate([
        core_1.Injectable()
    ], ActivityPollingService);
    return ActivityPollingService;
}());
exports.ActivityPollingService = ActivityPollingService;
