"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var wizard_model_1 = require("./wizard.model");
var forms_1 = require("@angular/forms");
var CaseEditComponent = /** @class */ (function () {
    function CaseEditComponent(fb, router, route, fieldsUtils, fieldsPurger, registrarService) {
        this.fb = fb;
        this.router = router;
        this.route = route;
        this.fieldsUtils = fieldsUtils;
        this.fieldsPurger = fieldsPurger;
        this.registrarService = registrarService;
        this.cancelled = new core_1.EventEmitter();
        this.submitted = new core_1.EventEmitter();
    }
    CaseEditComponent.prototype.ngOnInit = function () {
        this.wizard = new wizard_model_1.Wizard(this.eventTrigger.wizard_pages);
        this.form = this.fb.group({
            'data': new forms_1.FormGroup({}),
            'event': this.fb.group({
                'id': [this.eventTrigger.id, forms_1.Validators.required],
                'summary': [''],
                'description': ['']
            })
        });
    };
    CaseEditComponent.prototype.getPage = function (pageId) {
        return this.wizard.getPage(pageId, this.fieldsUtils.buildCanShowPredicate(this.eventTrigger, this.form));
    };
    CaseEditComponent.prototype.first = function () {
        var firstPage = this.wizard.firstPage(this.fieldsUtils.buildCanShowPredicate(this.eventTrigger, this.form));
        return this.router.navigate([firstPage ? firstPage.id : 'submit'], { relativeTo: this.route });
    };
    CaseEditComponent.prototype.navigateToPage = function (pageId) {
        var page = this.getPage(pageId);
        return this.router.navigate([page ? page.id : 'submit'], { relativeTo: this.route });
    };
    CaseEditComponent.prototype.next = function (currentPageId) {
        this.fieldsPurger.clearHiddenFields(this.form, this.wizard, this.eventTrigger, currentPageId);
        this.registrarService.reset();
        var nextPage = this.wizard.nextPage(currentPageId, this.fieldsUtils.buildCanShowPredicate(this.eventTrigger, this.form));
        return this.router.navigate([nextPage ? nextPage.id : 'submit'], { relativeTo: this.route });
    };
    CaseEditComponent.prototype.previous = function (currentPageId) {
        this.fieldsPurger.clearHiddenFields(this.form, this.wizard, this.eventTrigger, currentPageId);
        this.registrarService.reset();
        var previousPage = this.wizard.previousPage(currentPageId, this.fieldsUtils.buildCanShowPredicate(this.eventTrigger, this.form));
        if (!previousPage) {
            return Promise.resolve(false);
        }
        return this.router.navigate([previousPage.id], { relativeTo: this.route });
    };
    CaseEditComponent.prototype.hasPrevious = function (currentPageId) {
        return this.wizard.hasPreviousPage(currentPageId, this.fieldsUtils.buildCanShowPredicate(this.eventTrigger, this.form));
    };
    CaseEditComponent.prototype.cancel = function () {
        this.cancelled.emit();
    };
    CaseEditComponent.prototype.confirm = function (confirmation) {
        this.confirmation = confirmation;
        return this.router.navigate(['confirm'], { relativeTo: this.route });
    };
    __decorate([
        core_1.Input()
    ], CaseEditComponent.prototype, "eventTrigger", void 0);
    __decorate([
        core_1.Input()
    ], CaseEditComponent.prototype, "submit", void 0);
    __decorate([
        core_1.Input()
    ], CaseEditComponent.prototype, "validate", void 0);
    __decorate([
        core_1.Input()
    ], CaseEditComponent.prototype, "caseDetails", void 0);
    __decorate([
        core_1.Output()
    ], CaseEditComponent.prototype, "cancelled", void 0);
    __decorate([
        core_1.Output()
    ], CaseEditComponent.prototype, "submitted", void 0);
    CaseEditComponent = __decorate([
        core_1.Component({
            selector: 'ccd-case-edit',
            templateUrl: 'case-edit.component.html',
            styleUrls: ['./case-edit.scss'],
        })
    ], CaseEditComponent);
    return CaseEditComponent;
}());
exports.CaseEditComponent = CaseEditComponent;
