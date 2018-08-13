"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("zone.js/dist/zone-node");
require("reflect-metadata");
var core_1 = require("@angular/core");
// Express Engine
var express_engine_1 = require("@nguniversal/express-engine");
// Import module map for lazy loading
var module_map_ngfactory_loader_1 = require("@nguniversal/module-map-ngfactory-loader");
var express = require("express");
var path_1 = require("path");
// Faster server renders w/ Prod mode (dev mode never needed)
core_1.enableProdMode();
// Express server
var app = express();
var PORT = process.env.PORT || 3451;
var DIST_FOLDER = path_1.join(process.cwd());
var CONFIG = {
    'login_url': process.env['IDAM_LOGIN_URL'] || 'https://localhost:3501/login',
    'logout_url': process.env['CCD_GW_LOGOUT_URL'] || 'http://localhost:3453/logout',
    'api_url': process.env['CCD_API_URL'] || 'http://localhost:3453/aggregated',
    'case_data_url': process.env['CCD_DATA_URL'] || 'http://localhost:3453/data',
    'document_management_url': process.env['DM_URL'] || 'http://localhost:3453/documents',
    'remote_document_management_url': process.env['DM_URL_REMOTE'] || 'https://api-gateway.dev.dm.reform.hmcts.net/documents',
    'pagination_page_size': parseInt(process.env['CCD_PAGE_SIZE'], 10) || 25,
    'postcode_lookup_url': process.env['POSTCODE_LOOKUP_URL'] || 'http://localhost:3453/addresses?postcode=${postcode}',
    'oauth2_token_endpoint_url': process.env['CCD_GW_OAUTH2_URL'] || 'http://localhost:3453/oauth2',
    'oauth2_client_id': process.env['CCD_GW_OAUTH2_CLIENT_ID'] || 'ccd_gateway',
    'print_service_url': process.env['PRINT_SERVICE_URL'] || 'http://localhost:3453/print',
    'remote_print_service_url': process.env['PRINT_SERVICE_URL_REMOTE'] || 'https://return-case-doc.dev.ccd.reform.hmcts.net',
    'smart_survey_url': process.env['SMART_SURVEY_URL'] || 'https://www.smartsurvey.co.uk/s/CCDfeedback/',
    'activity_url': process.env['CCD_ACTIVITY_URL'] || '',
    'activity_next_poll_request_ms': parseInt(process.env['CCD_ACTIVITY_NEXT_POLL_REQUEST_MS'], 10) || 5000,
    'activity_retry': parseInt(process.env['CCD_ACTIVITY_RETRY'], 10) || 5,
    'activity_batch_collection_delay_ms': parseInt(process.env['CCD_ACTIVITY_BATCH_COLLECTION_DELAY_MS'], 10) || 1,
    'activity_max_request_per_batch': parseInt(process.env['CCD_ACTIVITY_MAX_REQUEST_PER_BATCH'], 10) || 25
};
// * NOTE :: leave this as require() since this file is built Dynamically from webpack
var _a = require('./dist/server/main'), AppServerModuleNgFactory = _a.AppServerModuleNgFactory, LAZY_MODULE_MAP = _a.LAZY_MODULE_MAP;
var app_config_1 = require("./src/app/app.config");
var app_server_config_1 = require("./src/app/app.server.config");
app.engine('html', express_engine_1.ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
        module_map_ngfactory_loader_1.provideModuleMap(LAZY_MODULE_MAP),
        { provide: app_config_1.AppConfig, useValue: new app_server_config_1.AppServerConfig(CONFIG) },
    ]
}));
app.set('view engine', 'html');
app.set('views', path_1.join(DIST_FOLDER, 'browser'));
app.get('/health', function (req, res) {
    res.status(200).json({
        'status': 'UP',
        'buildInfo': {
            'environment': 'development',
            'project': 'ccd',
            'name': 'case-management-web',
            'version': '1.2.0'
        }
    });
});
app.get('/config', function (req, res) {
    res.status(200).json(CONFIG);
});
// Server static files from /browser
app.get('*.*', express.static(path_1.join(DIST_FOLDER, 'browser'), {
    maxAge: '1y'
}));
// All regular routes use the Universal engine
app.get('*', function (req, res) {
    res.render('index', { req: req });
});
// Start up the Node server
app.listen(PORT, function () {
    console.log("Node Express server listening on http://localhost:" + PORT);
});
