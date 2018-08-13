"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var CaseEditConfirmComponent = /** @class */ (function () {
    function CaseEditConfirmComponent(caseEdit, router) {
        this.caseEdit = caseEdit;
        this.router = router;
        this.triggerText = 'Close and Return to case details';
        this.formGroup = new forms_1.FormControl();
        this.eventTrigger = this.caseEdit.eventTrigger;
        if (this.caseEdit.confirmation) {
            this.confirmation = this.caseEdit.confirmation;
            this.caseId = this.caseEdit.confirmation.getCaseId();
        }
        else {
            this.router.navigate(['/']);
        }
    }
    CaseEditConfirmComponent.prototype.submit = function () {
        this.caseEdit.submitted.emit({ caseId: this.confirmation.getCaseId(), status: this.confirmation.getStatus() });
    };
    CaseEditConfirmComponent.prototype.getCaseId = function () {
        return (this.caseEdit.caseDetails ? this.caseEdit.caseDetails.case_id : '');
    };
    CaseEditConfirmComponent = __decorate([
        core_1.Component({
            templateUrl: './case-edit-confirm.html',
            styleUrls: ['./case-edit.scss']
        })
    ], CaseEditConfirmComponent);
    return CaseEditConfirmComponent;
}());
exports.CaseEditConfirmComponent = CaseEditConfirmComponent;
