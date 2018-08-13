"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_error_model_1 = require("./http-error.model");
var Observable_1 = require("rxjs/Observable");
var http_1 = require("@angular/http");
var HttpErrorService = /** @class */ (function () {
    function HttpErrorService(authService) {
        this.authService = authService;
    }
    HttpErrorService_1 = HttpErrorService;
    HttpErrorService.prototype.setError = function (error) {
        this.error = error;
    };
    HttpErrorService.prototype.removeError = function () {
        var error = this.error;
        this.error = null;
        return error;
    };
    HttpErrorService.prototype.handle = function (error, redirectIfNotAuthorised) {
        if (redirectIfNotAuthorised === void 0) { redirectIfNotAuthorised = true; }
        var httpError = new http_error_model_1.HttpError();
        if (error instanceof http_1.Response) {
            if (error.headers
                && error.headers.get(HttpErrorService_1.CONTENT_TYPE)
                && error.headers.get(HttpErrorService_1.CONTENT_TYPE).startsWith(HttpErrorService_1.APPLICATION_JSON)) {
                try {
                    httpError = http_error_model_1.HttpError.from(error.json() || {});
                }
                catch (e) {
                    console.error(e, e.message);
                }
            }
            if (!httpError.status) {
                httpError.status = error.status;
            }
        }
        else if (error) {
            if (error.message) {
                httpError.message = error.message;
            }
            if (error.status) {
                httpError.status = error.status;
            }
        }
        if (redirectIfNotAuthorised && (httpError.status === 401 || httpError.status === 403)) {
            this.authService.signIn();
        }
        return Observable_1.Observable.throw(httpError);
    };
    HttpErrorService.CONTENT_TYPE = 'Content-Type';
    HttpErrorService.APPLICATION_JSON = 'application/json';
    HttpErrorService = HttpErrorService_1 = __decorate([
        core_1.Injectable()
    ], HttpErrorService);
    return HttpErrorService;
    var HttpErrorService_1;
}());
exports.HttpErrorService = HttpErrorService;
