"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var shared_module_1 = require("../shared/shared.module");
var case_reference_pipe_1 = require("../shared/utils/case-reference.pipe");
var case_resolver_1 = require("./case.resolver");
var case_viewer_component_1 = require("./viewer/case-viewer.component");
var palette_module_1 = require("../shared/palette/palette.module");
var event_log_module_1 = require("../shared/event-log/event-log.module");
var event_trigger_resolver_1 = require("./event-trigger/event-trigger.resolver");
var case_event_trigger_component_1 = require("./event-trigger/case-event-trigger.component");
var forms_1 = require("@angular/forms");
var utils_module_1 = require("../shared/palette/utils/utils.module");
var case_creator_component_1 = require("./creator/case-creator.component");
var create_case_filters_component_1 = require("./creator/filters/create-case-filters.component");
var case_printer_component_1 = require("./printer/case-printer.component");
var case_print_documents_resolver_1 = require("./printer/case-print-documents.resolver");
var case_creator_submit_component_1 = require("./creator/case-creator-submit.component");
var create_case_fields_resolver_1 = require("./creator/create-case-fields.resolver");
var case_edit_component_1 = require("../shared/case-editor/case-edit.component");
var callback_errors_component_1 = require("../shared/error/callback-errors.component");
var ccd_case_ui_toolkit_1 = require("@hmcts/ccd-case-ui-toolkit");
var case_edit_page_component_1 = require("../shared/case-editor/case-edit-page.component");
var case_edit_submit_component_1 = require("../shared/case-editor/case-edit-submit.component");
var conditional_show_module_1 = require("../shared/conditional-show/conditional-show.module");
var case_edit_form_component_1 = require("../shared/case-editor/case-edit-form.component");
var markdown_module_1 = require("../shared/markdown/markdown.module");
var label_substitution_service_1 = require("../shared/case-editor/label-substitution.service");
var label_substitutor_module_1 = require("../shared/substitutor/label-substitutor.module");
var case_edit_confirm_component_1 = require("../shared/case-editor/case-edit-confirm.component");
var print_url_pipe_1 = require("./printer/print-url.pipe");
var material_1 = require("@angular/material");
var animations_1 = require("@angular/platform-browser/animations");
var remove_dialog_component_1 = require("../shared/remove-dialog/remove-dialog.component");
var fields_purger_1 = require("../shared/utils/fields.purger");
var page_validation_service_1 = require("../shared/case-editor/page-validation.service");
var CasesModule = /** @class */ (function () {
    function CasesModule() {
    }
    CasesModule = __decorate([
        core_1.NgModule({
            imports: [
                ccd_case_ui_toolkit_1.CaseUIToolkitModule,
                common_1.CommonModule,
                conditional_show_module_1.ConditionalShowModule,
                event_log_module_1.EventLogModule,
                forms_1.FormsModule,
                label_substitutor_module_1.LabelSubstitutorModule,
                markdown_module_1.MarkdownModule,
                palette_module_1.PaletteModule,
                utils_module_1.PaletteUtilsModule,
                router_1.RouterModule,
                forms_1.ReactiveFormsModule,
                shared_module_1.SharedModule,
                material_1.MatDialogModule,
                animations_1.BrowserAnimationsModule
            ],
            declarations: [
                callback_errors_component_1.CallbackErrorsComponent,
                case_creator_component_1.CaseCreatorComponent,
                case_creator_submit_component_1.CaseCreatorSubmitComponent,
                case_edit_confirm_component_1.CaseEditConfirmComponent,
                case_edit_component_1.CaseEditComponent,
                case_edit_page_component_1.CaseEditPageComponent,
                case_edit_form_component_1.CaseEditFormComponent,
                case_edit_submit_component_1.CaseEditSubmitComponent,
                case_event_trigger_component_1.CaseEventTriggerComponent,
                case_printer_component_1.CasePrinterComponent,
                case_viewer_component_1.CaseViewerComponent,
                create_case_filters_component_1.CreateCaseFiltersComponent,
                callback_errors_component_1.CallbackErrorsComponent,
                print_url_pipe_1.PrintUrlPipe,
                remove_dialog_component_1.RemoveDialogComponent
            ],
            entryComponents: [remove_dialog_component_1.RemoveDialogComponent],
            providers: [
                case_print_documents_resolver_1.CasePrintDocumentsResolver,
                case_reference_pipe_1.CaseReferencePipe,
                case_resolver_1.CaseResolver,
                create_case_fields_resolver_1.CreateCaseFieldsResolver,
                event_trigger_resolver_1.EventTriggerResolver,
                label_substitution_service_1.LabelSubstitutionService,
                page_validation_service_1.PageValidationService,
                fields_purger_1.FieldsPurger
            ]
        })
    ], CasesModule);
    return CasesModule;
}());
exports.CasesModule = CasesModule;
