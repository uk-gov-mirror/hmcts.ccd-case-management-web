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
/**
 * `Oauth2Service` and `AuthService` cannot be merged as it creates a cyclic dependency on `AuthService` through `HttpErrorService`.
 */
var OAuth2Service = /** @class */ (function () {
    function OAuth2Service(http, appConfig, authService) {
        this.http = http;
        this.appConfig = appConfig;
        this.authService = authService;
    }
    OAuth2Service.prototype.getAccessToken = function (code) {
        if (code) {
            var url = this.appConfig.getOAuth2TokenEndpointUrl();
            var params = new http_1.URLSearchParams();
            params.set('code', code);
            // On successfully obtaining a token, the redirect should go back to the Angular application, i.e. ourselves.
            // Note: This *must not* include any query string.
            params.set('redirect_uri', this.authService.redirectUri().replace('https://', ''));
            return this.http
                .get(url, { search: params });
        }
        else {
            console.error('Error: Unable to obtain access token - no OAuth2 code provided');
        }
    };
    OAuth2Service.prototype.signOut = function () {
        var _this = this;
        this.http.get(this.appConfig.getLogoutUrl()).subscribe(function () { return _this.authService.signIn(); });
    };
    OAuth2Service = __decorate([
        core_1.Injectable()
    ], OAuth2Service);
    return OAuth2Service;
}());
exports.OAuth2Service = OAuth2Service;
