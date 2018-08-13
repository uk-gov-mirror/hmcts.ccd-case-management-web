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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var abstract_field_write_component_1 = require("../base-field/abstract-field-write.component");
var core_1 = require("@angular/core");
var address_model_1 = require("../../../core/addresses/address.model");
var address_option_model_1 = require("./address-option.model");
var forms_1 = require("@angular/forms");
var WriteAddressFieldComponent = /** @class */ (function (_super) {
    __extends(WriteAddressFieldComponent, _super);
    function WriteAddressFieldComponent(addressesService) {
        var _this = _super.call(this) || this;
        _this.formGroup = new forms_1.FormGroup({});
        _this.missingPostcode = false;
        _this.addressesService = addressesService;
        return _this;
    }
    WriteAddressFieldComponent.prototype.ngOnInit = function () {
        this.postcode = new forms_1.FormControl('');
        this.formGroup.addControl('postcode', this.postcode);
        this.addressList = new forms_1.FormControl('');
        this.formGroup.addControl('address', this.addressList);
    };
    WriteAddressFieldComponent.prototype.findAddress = function () {
        var _this = this;
        if (!this.postcode.value) {
            this.missingPostcode = true;
        }
        else {
            this.missingPostcode = false;
            var postcode_1 = this.postcode.value;
            this.caseField.value = null;
            this.addressOptions = new Array();
            this.addressesService.getAddressesForPostcode(postcode_1.replace(' ', '').toUpperCase()).subscribe(function (result) {
                result.forEach(function (address) {
                    _this.addressOptions.push(new address_option_model_1.AddressOption(address, null));
                });
                _this.addressOptions.unshift(new address_option_model_1.AddressOption(undefined, _this.defaultLabel(_this.addressOptions.length)));
            }, function () {
                console.log("An error occurred retrieving addresses for postcode " + postcode_1 + ".");
            });
            this.addressList.setValue(undefined);
        }
    };
    WriteAddressFieldComponent.prototype.blankAddress = function () {
        this.caseField.value = new address_model_1.AddressModel();
        this.setFormValue();
    };
    WriteAddressFieldComponent.prototype.shouldShowDetailFields = function () {
        if (this.isExpanded) {
            return true;
        }
        if (!this.writeComplexFieldComponent || !this.writeComplexFieldComponent.complexGroup) {
            return false;
        }
        var address = this.writeComplexFieldComponent.complexGroup.value;
        var hasAddress = false;
        if (address) {
            Object.keys(address).forEach(function (key) {
                if (address[key] != null) {
                    hasAddress = true;
                }
            });
        }
        return hasAddress;
    };
    WriteAddressFieldComponent.prototype.addressSelected = function () {
        this.caseField.value = this.addressList.value;
        this.setFormValue();
    };
    WriteAddressFieldComponent.prototype.ngOnChanges = function (changes) {
        if (changes['caseField']) {
            this.setFormValue();
        }
    };
    WriteAddressFieldComponent.prototype.defaultLabel = function (numberOfAddresses) {
        return numberOfAddresses === 0 ? 'No address found'
            : numberOfAddresses + (numberOfAddresses === 1 ? ' address ' : ' addresses ') + 'found';
    };
    WriteAddressFieldComponent.prototype.setFormValue = function () {
        if (this.writeComplexFieldComponent.complexGroup) {
            this.writeComplexFieldComponent.complexGroup.setValue(this.caseField.value);
        }
    };
    __decorate([
        core_1.ViewChild('writeComplexFieldComponent')
    ], WriteAddressFieldComponent.prototype, "writeComplexFieldComponent", void 0);
    WriteAddressFieldComponent = __decorate([
        core_1.Component({
            selector: 'ccd-write-address-field',
            templateUrl: 'write-address-field.html',
            styleUrls: ['write-address-field.scss']
        })
    ], WriteAddressFieldComponent);
    return WriteAddressFieldComponent;
}(abstract_field_write_component_1.AbstractFieldWriteComponent));
exports.WriteAddressFieldComponent = WriteAddressFieldComponent;
