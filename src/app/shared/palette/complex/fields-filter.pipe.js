"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FieldsFilterPipe = /** @class */ (function () {
    function FieldsFilterPipe() {
    }
    FieldsFilterPipe_1 = FieldsFilterPipe;
    /**
     * Complex type should have at least on simple field descendant with a value.
     *
     * @param field
     * @param values
     * @returns {boolean}
     */
    FieldsFilterPipe.isValidComplex = function (field, values) {
        values = values || {};
        var type = field.field_type;
        var value = FieldsFilterPipe_1.getValue(field, values);
        var hasChildrenWithValue = type.complex_fields.find(function (f) {
            return FieldsFilterPipe_1.keepField(f, value);
        });
        return !!hasChildrenWithValue;
    };
    FieldsFilterPipe.isEmpty = function (value) {
        return FieldsFilterPipe_1.EMPTY_VALUES.indexOf(value) !== -1
            || value.length === 0;
    };
    FieldsFilterPipe.isCompound = function (field) {
        return FieldsFilterPipe_1.NESTED_TYPES[field.field_type.type];
    };
    FieldsFilterPipe.isValidCompound = function (field, value) {
        return FieldsFilterPipe_1.isCompound(field)
            && FieldsFilterPipe_1.NESTED_TYPES[field.field_type.type](field, value);
    };
    FieldsFilterPipe.keepField = function (field, value) {
        value = value || {};
        if (FieldsFilterPipe_1.isCompound(field)) {
            return FieldsFilterPipe_1.isValidCompound(field, value);
        }
        return !FieldsFilterPipe_1.isEmpty(field.value)
            || !FieldsFilterPipe_1.isEmpty(value[field.id]);
    };
    FieldsFilterPipe.getValue = function (field, values) {
        return FieldsFilterPipe_1.isEmpty(field.value) ? values[field.id] : field.value;
    };
    /**
     * Filter out fields having no data to display and harmonise field values coming parent's value.
     *
     * @param complexField
     * @param keepEmpty
     * @returns {any}
     */
    FieldsFilterPipe.prototype.transform = function (complexField, keepEmpty) {
        if (!complexField || !complexField.field_type) {
            return [];
        }
        var fields = complexField.field_type.complex_fields || [];
        var values = complexField.value || {};
        return fields
            .map(function (f) {
            var clone = __assign({}, f);
            var value = FieldsFilterPipe_1.getValue(f, values);
            if (!FieldsFilterPipe_1.isEmpty(value)) {
                clone.value = value;
            }
            return clone;
        })
            .filter(function (f) { return keepEmpty || FieldsFilterPipe_1.keepField(f); })
            .map(function (f) {
            f.display_context = complexField.display_context;
            return f;
        });
    };
    FieldsFilterPipe.EMPTY_VALUES = [
        undefined,
        null,
        '',
        {}
    ];
    FieldsFilterPipe.NESTED_TYPES = {
        'Complex': FieldsFilterPipe_1.isValidComplex
    };
    FieldsFilterPipe = FieldsFilterPipe_1 = __decorate([
        core_1.Pipe({
            name: 'ccdFieldsFilter'
        })
    ], FieldsFilterPipe);
    return FieldsFilterPipe;
    var FieldsFilterPipe_1;
}());
exports.FieldsFilterPipe = FieldsFilterPipe;
