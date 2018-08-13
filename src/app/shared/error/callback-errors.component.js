"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var error_context_1 = require("./error-context");
var CallbackErrorsComponent = /** @class */ (function () {
    function CallbackErrorsComponent() {
        this.callbackErrorsSubject = new Subject_1.Subject();
        this.callbackErrorsContext = new core_1.EventEmitter();
    }
    CallbackErrorsComponent_1 = CallbackErrorsComponent;
    CallbackErrorsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.callbackErrorsSubject.subscribe(function (errorEvent) {
            _this.error = errorEvent;
            if (_this.hasWarnings() || _this.hasErrors() || _this.hasInvalidData()) {
                var callbackErrorsContext = _this.buildCallbackErrorsContext();
                _this.callbackErrorsContext.emit(callbackErrorsContext);
            }
        });
    };
    CallbackErrorsComponent.prototype.ngOnDestroy = function () {
        this.callbackErrorsSubject.unsubscribe();
    };
    CallbackErrorsComponent.prototype.buildCallbackErrorsContext = function () {
        var errorContext = new error_context_1.CallbackErrorsContext();
        if (this.hasWarnings() && !this.hasErrors() && !this.hasInvalidData()) {
            errorContext.ignore_warning = true;
            errorContext.trigger_text = CallbackErrorsComponent_1.TRIGGER_TEXT_IGNORE;
        }
        else {
            errorContext.ignore_warning = false;
            errorContext.trigger_text = CallbackErrorsComponent_1.TRIGGER_TEXT_SUBMIT;
        }
        return errorContext;
    };
    CallbackErrorsComponent.prototype.hasErrors = function () {
        return this.error
            && this.error.callbackErrors
            && this.error.callbackErrors.length;
    };
    CallbackErrorsComponent.prototype.hasWarnings = function () {
        return this.error
            && this.error.callbackWarnings
            && this.error.callbackWarnings.length;
    };
    CallbackErrorsComponent.prototype.hasInvalidData = function () {
        return this.error
            && this.error.details
            && this.error.details.field_errors
            && this.error.details.field_errors.length;
    };
    CallbackErrorsComponent.TRIGGER_TEXT_SUBMIT = 'Submit';
    CallbackErrorsComponent.TRIGGER_TEXT_START = 'Start';
    CallbackErrorsComponent.TRIGGER_TEXT_GO = 'Go';
    CallbackErrorsComponent.TRIGGER_TEXT_IGNORE = 'Ignore Warning and Go';
    __decorate([
        core_1.Input()
    ], CallbackErrorsComponent.prototype, "callbackErrorsSubject", void 0);
    __decorate([
        core_1.Output()
    ], CallbackErrorsComponent.prototype, "callbackErrorsContext", void 0);
    CallbackErrorsComponent = CallbackErrorsComponent_1 = __decorate([
        core_1.Component({
            selector: 'ccd-callback-errors',
            templateUrl: './callback-errors.html'
        })
    ], CallbackErrorsComponent);
    return CallbackErrorsComponent;
    var CallbackErrorsComponent_1;
}());
exports.CallbackErrorsComponent = CallbackErrorsComponent;
