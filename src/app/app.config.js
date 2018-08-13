"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var environment_1 = require("../environments/environment");
var AppConfig = /** @class */ (function () {
    function AppConfig(http) {
        this.http = http;
    }
    AppConfig.prototype.load = function () {
        var _this = this;
        console.log('Loading app config...');
        var configUrl = environment_1.environment.configUrl;
        return new Promise(function (resolve, reject) {
            _this.http
                .get(configUrl)
                .map(function (response) { return response.json(); })
                .catch(function (error) {
                console.error("Configuration " + configUrl + " could not be read", error);
                reject();
                return rxjs_1.Observable.throw(error.json().error || 'Server error');
            })
                .subscribe(function (config) {
                _this.config = config;
                console.log('Loading app config: OK');
                resolve();
            });
        });
    };
    AppConfig.prototype.getLoginUrl = function () {
        return this.config.login_url;
    };
    AppConfig.prototype.getLogoutUrl = function () {
        return this.config.logout_url;
    };
    AppConfig.prototype.getApiUrl = function () {
        return this.config.api_url;
    };
    AppConfig.prototype.getCaseDataUrl = function () {
        return this.config.case_data_url;
    };
    AppConfig.prototype.getDocumentManagementUrl = function () {
        return this.config.document_management_url;
    };
    AppConfig.prototype.getRemoteDocumentManagementUrl = function () {
        return this.config.remote_document_management_url;
    };
    AppConfig.prototype.getPaginationPageSize = function () {
        return this.config.pagination_page_size;
    };
    AppConfig.prototype.getPostcodeLookupUrl = function () {
        return this.config.postcode_lookup_url;
    };
    AppConfig.prototype.getOAuth2TokenEndpointUrl = function () {
        return this.config.oauth2_token_endpoint_url;
    };
    AppConfig.prototype.getOAuth2ClientId = function () {
        return this.config.oauth2_client_id;
    };
    AppConfig.prototype.getPrintServiceUrl = function () {
        return this.config.print_service_url;
    };
    AppConfig.prototype.getRemotePrintServiceUrl = function () {
        return this.config.remote_print_service_url;
    };
    AppConfig.prototype.getSmartSurveyUrl = function () {
        return this.config.smart_survey_url;
    };
    AppConfig.prototype.getUnsupportedBrowserUrl = function () {
        return this.config.unsupported_browser_url;
    };
    AppConfig.prototype.getActivityUrl = function () {
        return this.config.activity_url;
    };
    AppConfig.prototype.getActivityNexPollRequestMs = function () {
        return this.config.activity_next_poll_request_ms;
    };
    AppConfig.prototype.getActivityRetry = function () {
        return this.config.activity_retry;
    };
    AppConfig.prototype.getActivityBatchCollectionDelayMs = function () {
        return this.config.activity_batch_collection_delay_ms;
    };
    AppConfig.prototype.getActivityMaxRequestPerBatch = function () {
        return this.config.activity_max_request_per_batch;
    };
    AppConfig.prototype.getChromeMinRequiredVersion = function () {
        return this.config.chrome_min_required_version;
    };
    AppConfig.prototype.getIEMinRequiredVersion = function () {
        return this.config.ie_min_required_version;
    };
    AppConfig.prototype.getEdgeMinRequiredVersion = function () {
        return this.config.edge_min_required_version;
    };
    AppConfig.prototype.getFirefoxMinRequiredVersion = function () {
        return this.config.firefox_min_required_version;
    };
    AppConfig.prototype.getCaseHistoryUrl = function (jurisdictionId, caseTypeId, caseId, eventId) {
        return this.getApiUrl()
            + "/caseworkers/:uid"
            + ("/jurisdictions/" + jurisdictionId)
            + ("/case-types/" + caseTypeId)
            + ("/cases/" + caseId)
            + ("/events/" + eventId)
            + "/case-history";
    };
    AppConfig = __decorate([
        core_1.Injectable()
    ], AppConfig);
    return AppConfig;
}());
exports.AppConfig = AppConfig;
var Config = /** @class */ (function () {
    function Config() {
    }
    return Config;
}());
exports.Config = Config;
