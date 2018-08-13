"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DUMMY_CASE_REFERENCE = '0';
var ActivityService = /** @class */ (function () {
    function ActivityService(http, appConfig) {
        this.http = http;
        this.appConfig = appConfig;
        this.DUMMY_CASE_REFERENCE = '0';
    }
    Object.defineProperty(ActivityService, "ACTIVITY_VIEW", {
        get: function () { return 'view'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActivityService, "ACTIVITY_EDIT", {
        get: function () { return 'edit'; },
        enumerable: true,
        configurable: true
    });
    ActivityService.prototype.getActivities = function () {
        var caseId = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            caseId[_i] = arguments[_i];
        }
        var url = this.activityUrl() + ("/cases/" + caseId.join(',') + "/activity");
        return this.http
            .get(url, null, false)
            .map(function (response) { return response.json(); });
    };
    ActivityService.prototype.postActivity = function (caseId, activityType) {
        var url = this.activityUrl() + ("/cases/" + caseId + "/activity");
        var body = { activity: activityType };
        return this.http
            .post(url, body, null, false)
            .map(function (response) { return response.json(); });
    };
    ActivityService.prototype.verifyUserIsAuthorized = function () {
        var _this = this;
        if (this.activityUrl() && this.userAuthorised === undefined) {
            this.getActivities(DUMMY_CASE_REFERENCE).subscribe(function (data) { return _this.userAuthorised = true; }, function (error) {
                if (error.status === 403) {
                    _this.userAuthorised = false;
                }
                else {
                    _this.userAuthorised = true;
                }
            });
        }
    };
    ActivityService.prototype.activityUrl = function () {
        return this.appConfig.getActivityUrl();
    };
    Object.defineProperty(ActivityService.prototype, "isEnabled", {
        get: function () {
            return this.activityUrl() && this.userAuthorised;
        },
        enumerable: true,
        configurable: true
    });
    ActivityService = __decorate([
        core_1.Injectable()
    ], ActivityService);
    return ActivityService;
}());
exports.ActivityService = ActivityService;
