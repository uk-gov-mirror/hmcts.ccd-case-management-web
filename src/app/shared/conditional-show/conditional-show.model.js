"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fields_utils_1 = require("../utils/fields.utils");
var ShowCondition = /** @class */ (function () {
    // Expects a show condition of the form: <fieldName>="string"
    function ShowCondition(condition) {
        this.condition = condition;
    }
    ShowCondition.prototype.match = function (fields) {
        if (!this.condition) {
            return true;
        }
        // console.log('evaluating show condition: ' + this.condition);
        var field = this.condition.split('=')[0];
        var right = this.unquoted(this.condition.split('=')[1]);
        var value = fields[field];
        // console.log('field: ' + field);
        // console.log('expectedValue: ' + right);
        // console.log('value: ' + value);
        // changed from '===' to '==' to cover number field conditions
        if (right.endsWith('*') && value) {
            return value.startsWith(this.removeStarChar(right));
        }
        else {
            return value == right; // tslint:disable-line
        }
    };
    ShowCondition.prototype.unquoted = function (str) {
        return str.replace(/^"|"$/g, '');
    };
    ShowCondition.prototype.removeStarChar = function (s) {
        return s.substring(0, s.length - 1);
    };
    ShowCondition.prototype.matchByCaseFields = function (caseFields) {
        return this.match(fields_utils_1.FieldsUtils.toValuesMap(caseFields));
    };
    return ShowCondition;
}());
exports.ShowCondition = ShowCondition;
