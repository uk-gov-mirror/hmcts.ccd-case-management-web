"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpError = /** @class */ (function () {
    function HttpError() {
        this.timestamp = new Date().toISOString();
        this.error = HttpError.DEFAULT_ERROR;
        this.message = HttpError.DEFAULT_MESSAGE;
        this.status = null;
        this.exception = null;
        this.path = null;
        this.details = null;
        this.callbackErrors = null;
        this.callbackWarnings = null;
    }
    HttpError.from = function (data) {
        var error = new HttpError();
        Object
            .keys(error)
            .forEach(function (key) { return error[key] = data.hasOwnProperty(key) && data[key] ? data[key] : error[key]; });
        return error;
    };
    HttpError.DEFAULT_ERROR = 'Unknown error';
    HttpError.DEFAULT_MESSAGE = 'Something unexpected happened, our technical staff have been automatically notified';
    return HttpError;
}());
exports.HttpError = HttpError;
