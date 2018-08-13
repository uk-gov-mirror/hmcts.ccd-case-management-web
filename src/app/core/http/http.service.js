"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/catch");
var HttpService = /** @class */ (function () {
    function HttpService(http, httpErrorService) {
        this.http = http;
        this.httpErrorService = httpErrorService;
    }
    HttpService_1 = HttpService;
    /**
     *
     * @param url Url resolved using UrlResolverService
     * @param options
     * @returns {Observable<Response>}
     * @see UrlResolverService
     */
    HttpService.prototype.get = function (url, options, redirectIfNotAuthorised) {
        var _this = this;
        if (redirectIfNotAuthorised === void 0) { redirectIfNotAuthorised = true; }
        return this.http
            .get(url, this.sanitiseOptions(options))
            .catch(function (res) { return _this.httpErrorService.handle(res, redirectIfNotAuthorised); });
    };
    /**
     *
     * @param url Url resolved using UrlResolverService
     * @param body
     * @param options
     * @returns {Observable<Response>}
     * @see UrlResolverService
     */
    HttpService.prototype.post = function (url, body, options, redirectIfNotAuthorised) {
        var _this = this;
        if (redirectIfNotAuthorised === void 0) { redirectIfNotAuthorised = true; }
        return this.http
            .post(url, body, this.sanitiseOptions(options))
            .catch(function (res) { return _this.httpErrorService.handle(res, redirectIfNotAuthorised); });
    };
    /**
     *
     * @param url Url resolved using UrlResolverService
     * @param body
     * @param options
     * @returns {Observable<Response>}
     * @see UrlResolverService
     */
    HttpService.prototype.put = function (url, body, options) {
        var _this = this;
        return this.http
            .put(url, body, this.sanitiseOptions(options))
            .catch(function (res) { return _this.httpErrorService.handle(res); });
    };
    /**
     *
     * @param url Url resolved using UrlResolverService
     * @param options
     * @returns {Observable<Response>}
     * @see UrlResolverService
     */
    HttpService.prototype.delete = function (url, options) {
        var _this = this;
        return this.http
            .delete(url, this.sanitiseOptions(options))
            .catch(function (res) { return _this.httpErrorService.handle(res); });
    };
    HttpService.prototype.sanitiseOptions = function (options) {
        options = options || {};
        options.withCredentials = true;
        this.sanitiseHeaders(options);
        return options;
    };
    HttpService.prototype.sanitiseHeaders = function (options) {
        if (!options.headers) {
            options.headers = new http_1.Headers();
        }
        if (!options.headers.has(HttpService_1.HEADER_ACCEPT)) {
            options.headers.set(HttpService_1.HEADER_ACCEPT, 'application/json');
        }
        if (!options.headers.has(HttpService_1.HEADER_CONTENT_TYPE)) {
            options.headers.set(HttpService_1.HEADER_CONTENT_TYPE, 'application/json');
        }
        if (null === options.headers.get(HttpService_1.HEADER_CONTENT_TYPE)) {
            options.headers.delete(HttpService_1.HEADER_CONTENT_TYPE);
        }
    };
    HttpService.HEADER_ACCEPT = 'Accept';
    HttpService.HEADER_CONTENT_TYPE = 'Content-Type';
    HttpService = HttpService_1 = __decorate([
        core_1.Injectable()
    ], HttpService);
    return HttpService;
    var HttpService_1;
}());
exports.HttpService = HttpService;
