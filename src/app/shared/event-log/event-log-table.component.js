"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var EventLogTableComponent = /** @class */ (function () {
    function EventLogTableComponent() {
        this.onSelect = new core_1.EventEmitter();
    }
    EventLogTableComponent.prototype.select = function (event) {
        this.selected = event;
        this.onSelect.emit(event);
    };
    __decorate([
        core_1.Input()
    ], EventLogTableComponent.prototype, "events", void 0);
    __decorate([
        core_1.Input()
    ], EventLogTableComponent.prototype, "selected", void 0);
    __decorate([
        core_1.Output()
    ], EventLogTableComponent.prototype, "onSelect", void 0);
    EventLogTableComponent = __decorate([
        core_1.Component({
            selector: 'ccd-event-log-table',
            templateUrl: './event-log-table.html',
            styleUrls: ['./event-log-table.scss']
        })
    ], EventLogTableComponent);
    return EventLogTableComponent;
}());
exports.EventLogTableComponent = EventLogTableComponent;
