"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var activity_model_1 = require("../activity.model");
var CcdActivityComponent = /** @class */ (function () {
    function CcdActivityComponent(activityPollingService) {
        this.activityPollingService = activityPollingService;
        this.VIEWERS_PREFIX = '';
        this.VIEWERS_SUFFIX = 'viewing this case';
        this.EDITORS_PREFIX = 'This case is being updated by ';
        this.EDITORS_SUFFIX = '';
        this.dspMode = activity_model_1.DisplayMode;
    }
    CcdActivityComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activity = new activity_model_1.Activity();
        this.activity.caseId = this.caseId;
        this.activity.editors = [];
        this.activity.unknownEditors = 0;
        this.activity.viewers = [];
        this.activity.unknownViewers = 0;
        this.viewersText = '';
        this.editorsText = '';
        this.subscription = this.activityPollingService.subscribeToActivity(this.caseId, function (newActivity) { return _this.onActivityChange(newActivity); });
    };
    CcdActivityComponent.prototype.onActivityChange = function (newActivity) {
        this.activity = newActivity;
        this.viewersText = this.generateDescription(this.VIEWERS_PREFIX, this.VIEWERS_SUFFIX, this.activity.viewers, this.activity.unknownViewers);
        this.editorsText = this.generateDescription(this.EDITORS_PREFIX, this.EDITORS_SUFFIX, this.activity.editors, this.activity.unknownEditors);
    };
    CcdActivityComponent.prototype.isActivityEnabled = function () {
        return this.activityPollingService.isEnabled;
    };
    CcdActivityComponent.prototype.isActiveCase = function () {
        return this.activity.editors.length || this.activity.viewers.length || this.activity.unknownEditors || this.activity.unknownViewers;
    };
    CcdActivityComponent.prototype.viewersPresent = function () {
        return (this.activity.viewers.length > 0 || this.activity.unknownViewers > 0);
    };
    CcdActivityComponent.prototype.editorsPresent = function () {
        return (this.activity.editors.length > 0 || this.activity.unknownEditors > 0);
    };
    CcdActivityComponent.prototype.ngOnDestroy = function () {
        this.subscription.complete();
        this.subscription.unsubscribe();
        this.activityPollingService.stopPolling();
    };
    CcdActivityComponent.prototype.generateDescription = function (prefix, suffix, namesArray, unknownCount) {
        var resultText = prefix;
        resultText += namesArray.map(function (activityInfo) { return activityInfo.forename + ' ' + activityInfo.surname; }).join(', ');
        if (unknownCount > 0) {
            resultText += (namesArray.length > 0 ? ' and ' + unknownCount + ' other' : unknownCount + ' user');
            resultText += (unknownCount > 1 ? 's' : '');
        }
        else {
            resultText = this.replaceLastCommaWithAnd(resultText);
        }
        if (suffix.length > 0) {
            if (namesArray.length + unknownCount > 1) {
                resultText += ' are ' + suffix;
            }
            else {
                resultText += ' is ' + suffix;
            }
        }
        return resultText;
    };
    CcdActivityComponent.prototype.replaceLastCommaWithAnd = function (str) {
        return str.replace(/(.*)\,(.*?)$/, '$1 and$2');
    };
    __decorate([
        core_1.Input()
    ], CcdActivityComponent.prototype, "caseId", void 0);
    __decorate([
        core_1.Input()
    ], CcdActivityComponent.prototype, "displayMode", void 0);
    CcdActivityComponent = __decorate([
        core_1.Component({
            selector: 'ccd-activity',
            templateUrl: './ccd-activity.component.html',
            styleUrls: ['./ccd-activity.component.css']
        })
    ], CcdActivityComponent);
    return CcdActivityComponent;
}());
exports.CcdActivityComponent = CcdActivityComponent;
