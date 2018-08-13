"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AddressesService = /** @class */ (function () {
    function AddressesService(http, appConfig) {
        this.http = http;
        this.appConfig = appConfig;
    }
    AddressesService.prototype.getAddressesForPostcode = function (postcode) {
        return this.http
            .get(this.appConfig.getPostcodeLookupUrl().replace('${postcode}', postcode))
            .map(function (response) { return response.json(); });
    };
    AddressesService = __decorate([
        core_1.Injectable()
    ], AddressesService);
    return AddressesService;
}());
exports.AddressesService = AddressesService;
