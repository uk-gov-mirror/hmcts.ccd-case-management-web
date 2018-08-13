"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AddressOption = /** @class */ (function () {
    function AddressOption(addressModel, description) {
        this.value = addressModel;
        this.description = (description == null)
            ? this.value.AddressLine1
                + this.prefixWithCommaIfPresent(this.value.AddressLine2)
                + this.prefixWithCommaIfPresent(this.value.AddressLine3)
                + ', ' + this.value.PostTown
            : description;
    }
    AddressOption.prototype.prefixWithCommaIfPresent = function (value) {
        return value ? ', ' + value : value;
    };
    return AddressOption;
}());
exports.AddressOption = AddressOption;
