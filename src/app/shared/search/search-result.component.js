"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sort_parameters_1 = require("./sorting/sort-parameters");
var sort_order_1 = require("./sorting/sort-order");
var activity_model_1 = require("../../core/activity/activity.model");
var SearchResultComponent = /** @class */ (function () {
    function SearchResultComponent(searchResultViewItemComparatorFactory, appConfig, activityService) {
        this.activityService = activityService;
        this.ICON = activity_model_1.DisplayMode.ICON;
        this.changePage = new core_1.EventEmitter();
        this.selected = {};
        this.searchResultViewItemComparatorFactory = searchResultViewItemComparatorFactory;
        this.paginationPageSize = appConfig.getPaginationPageSize();
        this.hideRows = false;
    }
    SearchResultComponent.prototype.ngOnChanges = function (changes) {
        if (changes['resultView']) {
            this.hideRows = false;
            this.sortParameters = undefined;
            // Clone `resultView` to prevent sorting the external variable
            this.resultView = {
                columns: this.resultView.columns.slice(0),
                results: this.resultView.results.slice(0)
            };
            this.resultView.columns = this.resultView.columns.sort(function (a, b) {
                return a.order - b.order;
            });
        }
        if (changes['page']) {
            this.selected.page = (changes['page']).currentValue;
        }
    };
    SearchResultComponent.prototype.goToPage = function (page) {
        this.hideRows = true;
        this.selected.init = false;
        this.selected.jurisdiction = this.jurisdiction;
        this.selected.caseType = this.caseType;
        this.selected.caseState = this.caseState;
        this.selected.formGroup = this.caseFilterFG;
        this.selected.page = page;
        // Apply filters
        this.changePage.emit(this.selected);
    };
    SearchResultComponent.prototype.hasResults = function () {
        return this.resultView.results.length && this.paginationMetadata.total_pages_count;
    };
    SearchResultComponent.prototype.comparator = function (column) {
        return this.searchResultViewItemComparatorFactory.createSearchResultViewItemComparator(column);
    };
    SearchResultComponent.prototype.sort = function (column) {
        if (this.isSortAscending(column)) {
            this.sortParameters = new sort_parameters_1.SortParameters(this.comparator(column), sort_order_1.SortOrder.ASCENDING);
        }
        else {
            this.sortParameters = new sort_parameters_1.SortParameters(this.comparator(column), sort_order_1.SortOrder.DESCENDING);
        }
    };
    SearchResultComponent.prototype.sortWidget = function (column) {
        return this.isSortAscending(column) ? '&#9660;' : '&#9650;';
    };
    SearchResultComponent.prototype.activityEnabled = function () {
        return this.activityService.isEnabled;
    };
    SearchResultComponent.prototype.isSortAscending = function (column) {
        var currentSortOrder = this.currentSortOrder(column);
        return currentSortOrder === sort_order_1.SortOrder.UNSORTED || currentSortOrder === sort_order_1.SortOrder.DESCENDING;
    };
    SearchResultComponent.prototype.currentSortOrder = function (column) {
        var isAscending = true;
        var isDescending = true;
        for (var i = 0; i < this.resultView.results.length - 1; i++) {
            var comparison = this.comparator(column).compare(this.resultView.results[i], this.resultView.results[i + 1]);
            isDescending = isDescending && comparison <= 0;
            isAscending = isAscending && comparison >= 0;
            if (!isAscending && !isDescending) {
                break;
            }
        }
        return isAscending ? sort_order_1.SortOrder.ASCENDING : isDescending ? sort_order_1.SortOrder.DESCENDING : sort_order_1.SortOrder.UNSORTED;
    };
    SearchResultComponent.PARAM_JURISDICTION = 'jurisdiction';
    SearchResultComponent.PARAM_CASE_TYPE = 'case-type';
    SearchResultComponent.PARAM_CASE_STATE = 'case-state';
    __decorate([
        core_1.Input()
    ], SearchResultComponent.prototype, "jurisdiction", void 0);
    __decorate([
        core_1.Input()
    ], SearchResultComponent.prototype, "caseType", void 0);
    __decorate([
        core_1.Input()
    ], SearchResultComponent.prototype, "caseState", void 0);
    __decorate([
        core_1.Input()
    ], SearchResultComponent.prototype, "caseFilterFG", void 0);
    __decorate([
        core_1.Input()
    ], SearchResultComponent.prototype, "resultView", void 0);
    __decorate([
        core_1.Input()
    ], SearchResultComponent.prototype, "page", void 0);
    __decorate([
        core_1.Input()
    ], SearchResultComponent.prototype, "paginationMetadata", void 0);
    __decorate([
        core_1.Output()
    ], SearchResultComponent.prototype, "changePage", void 0);
    SearchResultComponent = __decorate([
        core_1.Component({
            selector: 'ccd-search-result',
            templateUrl: './search-result.html',
            styleUrls: ['./search-result.scss']
        })
    ], SearchResultComponent);
    return SearchResultComponent;
}());
exports.SearchResultComponent = SearchResultComponent;
