"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var search_input_model_1 = require("./search-input.model");
var field_model_1 = require("./field.model");
var field_type_model_1 = require("../../shared/domain/definition/field-type.model");
exports.createSearchInputs = function () {
    var fieldType = new field_type_model_1.FieldType();
    fieldType.id = 'Text';
    fieldType.type = 'Text';
    var searchInput1 = new search_input_model_1.SearchInput('Label 1', 1, new field_model_1.Field('PersonFirstName', fieldType));
    var searchInput2 = new search_input_model_1.SearchInput('Label 2', 2, new field_model_1.Field('PersonLastName', fieldType, '', true));
    return [searchInput1, searchInput2];
};
