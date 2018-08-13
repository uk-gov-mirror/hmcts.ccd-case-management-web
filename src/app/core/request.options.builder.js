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
var RequestOptionsBuilder = /** @class */ (function () {
    function RequestOptionsBuilder() {
    }
    RequestOptionsBuilder_1 = RequestOptionsBuilder;
    RequestOptionsBuilder.prototype.buildOptions = function (metaCriteria, caseCriteria, view) {
        var params = new http_1.URLSearchParams();
        if (view) {
            params.set('view', view);
        }
        if (metaCriteria) {
            for (var _i = 0, _a = Object.keys(metaCriteria); _i < _a.length; _i++) {
                var criterion = _a[_i];
                params.set(criterion, metaCriteria[criterion]);
            }
        }
        if (caseCriteria) {
            for (var _b = 0, _c = Object.keys(caseCriteria); _b < _c.length; _b++) {
                var criterion = _c[_b];
                if (caseCriteria[criterion] && caseCriteria[criterion].trim().length > 0) {
                    params.set(RequestOptionsBuilder_1.FIELD_PREFIX + criterion, caseCriteria[criterion].trim());
                }
            }
        }
        var options = { params: params };
        return options;
    };
    RequestOptionsBuilder.FIELD_PREFIX = 'case.';
    RequestOptionsBuilder = RequestOptionsBuilder_1 = __decorate([
        core_1.Injectable()
    ], RequestOptionsBuilder);
    return RequestOptionsBuilder;
    var RequestOptionsBuilder_1;
}());
exports.RequestOptionsBuilder = RequestOptionsBuilder;
