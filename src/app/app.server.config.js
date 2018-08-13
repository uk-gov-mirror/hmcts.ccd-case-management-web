"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var app_config_1 = require("./app.config");
var AppServerConfig = /** @class */ (function (_super) {
    __extends(AppServerConfig, _super);
    function AppServerConfig(config) {
        var _this = _super.call(this, null) || this;
        _this.config = config;
        return _this;
    }
    AppServerConfig.prototype.load = function () {
        console.log('Config already loaded', this.config);
        return Promise.resolve();
    };
    return AppServerConfig;
}(app_config_1.AppConfig));
exports.AppServerConfig = AppServerConfig;
