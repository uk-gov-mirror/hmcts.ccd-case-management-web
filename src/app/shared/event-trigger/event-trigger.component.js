"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var Subject_1 = require("rxjs/Subject");
var EventTriggerComponent = /** @class */ (function () {
    function EventTriggerComponent(fb, orderService, alertService) {
        this.fb = fb;
        this.orderService = orderService;
        this.alertService = alertService;
        this.callbackErrorsSubject = new Subject_1.Subject();
        this.onTrigger = new core_1.EventEmitter();
    }
    EventTriggerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.triggers = this.orderService.sort(this.triggers);
        this.triggerForm = this.fb.group({
            'trigger': [this.getDefault(), forms_1.Validators.required]
        });
        this.changeSubscription = this.triggerForm
            .valueChanges
            .subscribe(function () {
            _this.resetErrors();
        });
        this.callbackErrorsSubject.subscribe(function (errorEvent) {
            _this.error = errorEvent;
        });
    };
    EventTriggerComponent.prototype.ngOnDestroy = function () {
        this.changeSubscription.unsubscribe();
    };
    EventTriggerComponent.prototype.isDisabled = function () {
        return !this.triggerForm.valid || this.hasErrors() || this.hasInvalidData();
    };
    EventTriggerComponent.prototype.getDefault = function () {
        return this.triggers.length === 1 ? this.triggers[0] : '';
    };
    EventTriggerComponent.prototype.resetErrors = function () {
        this.error = null;
        this.callbackErrorsSubject.next(null);
        this.alertService.clear();
    };
    EventTriggerComponent.prototype.hasErrors = function () {
        return this.error
            && this.error.callbackErrors
            && this.error.callbackErrors.length;
    };
    EventTriggerComponent.prototype.hasInvalidData = function () {
        return this.error
            && this.error.details
            && this.error.details.field_errors
            && this.error.details.field_errors.length;
    };
    __decorate([
        core_1.Input()
    ], EventTriggerComponent.prototype, "triggers", void 0);
    __decorate([
        core_1.Input()
    ], EventTriggerComponent.prototype, "triggerText", void 0);
    __decorate([
        core_1.Input()
    ], EventTriggerComponent.prototype, "callbackErrorsSubject", void 0);
    __decorate([
        core_1.Output()
    ], EventTriggerComponent.prototype, "onTrigger", void 0);
    EventTriggerComponent = __decorate([
        core_1.Component({
            selector: 'ccd-event-trigger',
            templateUrl: './event-trigger.html',
            styleUrls: ['./event-trigger.scss']
        })
    ], EventTriggerComponent);
    return EventTriggerComponent;
}());
exports.EventTriggerComponent = EventTriggerComponent;
