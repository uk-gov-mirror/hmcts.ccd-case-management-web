"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var RemoveDialogComponent = /** @class */ (function () {
    function RemoveDialogComponent(matDialogRef) {
        this.matDialogRef = matDialogRef;
    }
    RemoveDialogComponent.prototype.ngOnInit = function () {
    };
    RemoveDialogComponent.prototype.remove = function () {
        this.result = 'Remove';
        this.matDialogRef.close(this.result);
    };
    RemoveDialogComponent.prototype.cancel = function () {
        this.result = 'Cancel';
        this.matDialogRef.close(this.result);
    };
    RemoveDialogComponent = __decorate([
        core_1.Component({
            selector: 'ccd-remove-dialog',
            templateUrl: './remove-dialog.component.html',
            styleUrls: ['./remove-dialog.component.scss']
        })
    ], RemoveDialogComponent);
    return RemoveDialogComponent;
}());
exports.RemoveDialogComponent = RemoveDialogComponent;
