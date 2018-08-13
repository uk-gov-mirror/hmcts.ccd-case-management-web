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
var common_1 = require("@angular/common");
var ngx_pagination_1 = require("ngx-pagination");
var search_result_component_1 = require("./search/search-result.component");
var search_filters_component_1 = require("./search/filters/search-filters.component");
var palette_module_1 = require("./palette/palette.module");
var router_1 = require("@angular/router");
var event_trigger_module_1 = require("./event-trigger/event-trigger.module");
var case_header_component_1 = require("./header/case-header.component");
var event_trigger_header_component_1 = require("./header/event-trigger-header.component");
var sort_search_result_pipe_1 = require("./search/sorting/sort-search-result.pipe");
var case_reference_pipe_1 = require("./utils/case-reference.pipe");
var search_result_view_item_comparator_factory_1 = require("./search/sorting/search-result-view-item-comparator-factory");
var ccd_activity_component_1 = require("../core/activity/ccd-activity/ccd-activity.component");
var ccd_activity_icon_component_1 = require("../core/activity/ccd-activity/ccd-activity-icon/ccd-activity-icon.component");
var ccd_activity_banner_component_1 = require("../core/activity/ccd-activity/ccd-activity-banner/ccd-activity-banner.component");
var case_field_service_1 = require("./domain/case-field.service");
var case_history_component_1 = require("./case-history/case-history.component");
var case_history_resolver_1 = require("./case-history/case-history.resolver");
var label_substitutor_module_1 = require("./substitutor/label-substitutor.module");
var conditional_show_module_1 = require("./conditional-show/conditional-show.module");
var case_history_service_1 = require("../core/cases/case-history.service");
var document_dialog_component_1 = require("./document-dialog/document-dialog.component");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                ngx_pagination_1.NgxPaginationModule,
                palette_module_1.PaletteModule,
                router_1.RouterModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                event_trigger_module_1.EventTriggerModule,
                label_substitutor_module_1.LabelSubstitutorModule,
                conditional_show_module_1.ConditionalShowModule
            ],
            declarations: [
                search_result_component_1.SearchResultComponent,
                case_header_component_1.CaseHeaderComponent,
                event_trigger_header_component_1.EventTriggerHeaderComponent,
                search_filters_component_1.SearchFiltersComponent,
                sort_search_result_pipe_1.SortSearchResultPipe,
                case_reference_pipe_1.CaseReferencePipe,
                ccd_activity_component_1.CcdActivityComponent,
                ccd_activity_icon_component_1.CcdActivityIconComponent,
                ccd_activity_banner_component_1.CcdActivityBannerComponent,
                case_history_component_1.CaseHistoryComponent,
                document_dialog_component_1.DocumentDialogComponent,
            ],
            entryComponents: [document_dialog_component_1.DocumentDialogComponent],
            providers: [
                search_result_view_item_comparator_factory_1.SearchResultViewItemComparatorFactory,
                case_field_service_1.CaseFieldService,
                case_history_resolver_1.CaseHistoryResolver,
                case_history_service_1.CaseHistoryService,
            ],
            exports: [
                search_result_component_1.SearchResultComponent,
                case_header_component_1.CaseHeaderComponent,
                event_trigger_module_1.EventTriggerModule,
                event_trigger_header_component_1.EventTriggerHeaderComponent,
                search_filters_component_1.SearchFiltersComponent,
                case_reference_pipe_1.CaseReferencePipe,
                ccd_activity_component_1.CcdActivityComponent,
                ccd_activity_icon_component_1.CcdActivityIconComponent,
                ccd_activity_banner_component_1.CcdActivityBannerComponent,
                case_history_component_1.CaseHistoryComponent,
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
