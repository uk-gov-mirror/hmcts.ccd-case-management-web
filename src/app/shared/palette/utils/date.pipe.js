"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DatePipe = /** @class */ (function () {
    function DatePipe() {
    }
    DatePipe_1 = DatePipe;
    DatePipe.prototype.transform = function (value, format) {
        var resultDate = null;
        if (value) {
            var match = value.match(DatePipe_1.DATE_FORMAT);
            // let date = this.getDate(match);
            // RDM-1149 changed the pipe logic so that it doesn't add an hour to 'Summer Time' dates on DateTime field type
            var offsetDate = this.getDate(match); // this.getOffsetDate(date);
            resultDate = offsetDate.getDate() + " " + DatePipe_1.MONTHS[offsetDate.getMonth()] + " " + offsetDate.getFullYear();
            if (match[4] && match[5] && match[6] && format !== 'short') {
                resultDate += ', ';
                resultDate += this.getHour(offsetDate.getHours().toString()) + ':';
                resultDate += this.pad(offsetDate.getMinutes()) + ':';
                resultDate += this.pad(offsetDate.getSeconds()) + ' ';
                resultDate += (this.toInt(offsetDate.getHours().toString()) >= 12) ? 'PM' : 'AM';
            }
        }
        return resultDate;
    };
    DatePipe.prototype.getOffsetDate = function (date) {
        var localOffset = -date.getTimezoneOffset() / 60;
        return new Date(date.getTime() + localOffset * 3600 * 1000);
    };
    DatePipe.prototype.getDate = function (match) {
        var year = this.toInt(match[1]);
        var month = this.toInt(match[2]) - 1;
        var day = this.toInt(match[3]);
        var resultDate;
        if (match[4] && match[5] && match[6]) {
            var hour = this.toInt(match[4]);
            var minutes = this.toInt(match[5]);
            var seconds = this.toInt(match[6]);
            resultDate = new Date(year, month, day, hour, minutes, seconds, 0);
        }
        else {
            resultDate = new Date(year, month, day);
        }
        return resultDate;
    };
    DatePipe.prototype.getHour = function (hourStr) {
        var hourNum = this.toInt(hourStr);
        if (hourNum > 12) {
            hourNum = hourNum - 12;
        }
        else if (hourNum === 0) {
            hourNum = 12;
        }
        return hourNum;
    };
    DatePipe.prototype.toInt = function (str) {
        return parseInt(str, 10);
    };
    DatePipe.prototype.pad = function (num, padNum) {
        if (padNum === void 0) { padNum = 2; }
        var val = num !== undefined ? num.toString() : '';
        return val.length >= padNum ? val : new Array(padNum - val.length + 1).join('0') + val;
    };
    DatePipe.DATE_FORMAT = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?|Z)?$/;
    //    1        2       3         4          5          6          7          8  9     10      11
    DatePipe.MONTHS = [
        ['Jan'], ['Feb'], ['Mar'], ['Apr'], ['May'], ['Jun'], ['Jul'], ['Aug'], ['Sep'], ['Oct'], ['Nov'], ['Dec'],
    ];
    DatePipe = DatePipe_1 = __decorate([
        core_1.Pipe({
            name: 'ccdDate'
        })
    ], DatePipe);
    return DatePipe;
    var DatePipe_1;
}());
exports.DatePipe = DatePipe;
