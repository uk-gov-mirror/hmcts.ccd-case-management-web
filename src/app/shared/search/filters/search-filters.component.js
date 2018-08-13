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
var access_types_model_1 = require("../../domain/case-view/access-types.model");
var SearchFiltersComponent = /** @class */ (function () {
    function SearchFiltersComponent(searchService, orderService, jurisdictionService, definitionsService) {
        this.searchService = searchService;
        this.orderService = orderService;
        this.jurisdictionService = jurisdictionService;
        this.definitionsService = definitionsService;
        this.onApply = new core_1.EventEmitter();
        this.formGroup = new forms_1.FormGroup({});
    }
    SearchFiltersComponent.prototype.ngOnInit = function () {
        this.selected = {};
        if (this.jurisdictions.length === 1) {
            this.selected.jurisdiction = this.jurisdictions[0];
            this.onJurisdictionIdChange();
        }
        if (this.autoApply === true) {
            this.apply();
        }
    };
    SearchFiltersComponent.prototype.apply = function () {
        this.selected.formGroup = this.formGroup;
        this.selected.page = 1;
        this.selected.metadataFields = this.getMetadataFields();
        this.onApply.emit(this.selected);
    };
    SearchFiltersComponent.prototype.getMetadataFields = function () {
        if (this.searchInputs) {
            return this.searchInputs
                .filter(function (searchInput) { return searchInput.field.metadata === true; })
                .map(function (searchInput) { return searchInput.field.id; });
        }
    };
    SearchFiltersComponent.prototype.isSearchable = function () {
        var result;
        result = this.selected.jurisdiction !== undefined && this.selected.jurisdiction !== null;
        result = result && this.selected.caseType !== undefined && this.selected.caseType !== null;
        return result;
    };
    SearchFiltersComponent.prototype.isSearchableAndSearchInputsReady = function () {
        return this.isSearchable() && this.searchInputsReady;
    };
    SearchFiltersComponent.prototype.onJurisdictionIdChange = function () {
        var _this = this;
        this.selected.caseType = null;
        this.jurisdictionService.announceSelectedJurisdiction(this.selected.jurisdiction);
        this.definitionsService.getCaseTypes(this.selected.jurisdiction.id, access_types_model_1.READ_ACCESS)
            .subscribe(function (caseTypes) {
            _this.selectedJurisdictionCaseTypes = caseTypes;
            _this.selectCaseType(_this.selectedJurisdictionCaseTypes);
        });
    };
    SearchFiltersComponent.prototype.onCaseTypeIdChange = function () {
        var _this = this;
        this.formGroup = new forms_1.FormGroup({});
        this.searchInputsReady = false;
        this.searchInputs = [];
        this.searchService.getSearchInputs(this.selected.jurisdiction.id, this.selected.caseType.id)
            .do(function () { return _this.searchInputsReady = true; })
            .subscribe(function (searchInputs) {
            _this.searchInputs = searchInputs
                .sort(_this.orderService.sortAsc);
        });
    };
    SearchFiltersComponent.prototype.isJurisdictionSelected = function () {
        return this.selected.jurisdiction === null ||
            this.selected.jurisdiction === undefined;
    };
    SearchFiltersComponent.prototype.selectCaseType = function (caseTypes) {
        if (caseTypes.length === 1) {
            this.selected.caseType = caseTypes[0];
            this.onCaseTypeIdChange();
        }
    };
    __decorate([
        core_1.Input()
    ], SearchFiltersComponent.prototype, "jurisdictions", void 0);
    __decorate([
        core_1.Input()
    ], SearchFiltersComponent.prototype, "autoApply", void 0);
    __decorate([
        core_1.Output()
    ], SearchFiltersComponent.prototype, "onApply", void 0);
    SearchFiltersComponent = __decorate([
        core_1.Component({
            selector: 'ccd-search-filters',
            templateUrl: './search-filters.html',
        })
    ], SearchFiltersComponent);
    return SearchFiltersComponent;
}());
exports.SearchFiltersComponent = SearchFiltersComponent;
