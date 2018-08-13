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
var ccd_case_ui_toolkit_1 = require("@hmcts/ccd-case-ui-toolkit");
var read_text_field_component_1 = require("./text/read-text-field.component");
var palette_service_1 = require("./palette.service");
var read_number_field_component_1 = require("./number/read-number-field.component");
var read_email_field_component_1 = require("./email/read-email-field.component");
var read_phone_uk_field_component_1 = require("./phone-uk/read-phone-uk-field.component");
var read_date_field_component_1 = require("./date/read-date-field.component");
var fixed_list_module_1 = require("./fixed-list/fixed-list.module");
var yes_no_module_1 = require("./yes-no/yes-no.module");
var complex_module_1 = require("./complex/complex.module");
var address_module_1 = require("./address/address.module");
var base_field_module_1 = require("./base-field/base-field.module");
var write_text_field_component_1 = require("./text/write-text-field.component");
var forms_1 = require("@angular/forms");
var unsupported_field_component_1 = require("./unsupported-field.component");
var read_collection_field_component_1 = require("./collection/read-collection-field.component");
var utils_module_1 = require("./utils/utils.module");
var write_phone_uk_field_component_1 = require("./phone-uk/write-phone-uk-field.component");
var write_email_field_component_1 = require("./email/write-email-field.component");
var write_collection_field_component_1 = require("./collection/write-collection-field.component");
var write_number_field_component_1 = require("./number/write-number-field.component");
var money_gbp_module_1 = require("./money-gbp/money-gbp.module");
var read_text_area_field_component_1 = require("./text-area/read-text-area-field.component");
var write_text_area_field_component_1 = require("./text-area/write-text-area-field.component");
var multi_select_list_module_1 = require("./multi-select-list/multi-select-list.module");
var write_date_field_component_1 = require("./date/write-date-field.component");
var document_module_1 = require("./document/document.module");
var label_field_component_1 = require("./label/label-field.component");
var markdown_module_1 = require("../markdown/markdown.module");
var form_validators_service_1 = require("../../core/form/form-validators.service");
var order_summary_module_1 = require("./order-summary/order-summary.module");
var PaletteModule = /** @class */ (function () {
    function PaletteModule() {
    }
    PaletteModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                base_field_module_1.BaseFieldModule,
                fixed_list_module_1.FixedListModule,
                yes_no_module_1.YesNoModule,
                complex_module_1.ComplexModule,
                multi_select_list_module_1.MultiSelectListModule,
                money_gbp_module_1.MoneyGbpModule,
                forms_1.ReactiveFormsModule,
                utils_module_1.PaletteUtilsModule,
                document_module_1.DocumentModule,
                ccd_case_ui_toolkit_1.CaseUIToolkitModule,
                address_module_1.AddressModule,
                markdown_module_1.MarkdownModule,
                order_summary_module_1.OrderSummaryModule
            ],
            declarations: [
                unsupported_field_component_1.UnsupportedFieldComponent,
                label_field_component_1.LabelFieldComponent,
                // Read
                read_text_field_component_1.ReadTextFieldComponent,
                read_text_area_field_component_1.ReadTextAreaFieldComponent,
                read_number_field_component_1.ReadNumberFieldComponent,
                read_email_field_component_1.ReadEmailFieldComponent,
                read_phone_uk_field_component_1.ReadPhoneUKFieldComponent,
                read_date_field_component_1.ReadDateFieldComponent,
                read_collection_field_component_1.ReadCollectionFieldComponent,
                // Write
                write_collection_field_component_1.WriteCollectionFieldComponent,
                write_text_field_component_1.WriteTextFieldComponent,
                write_text_area_field_component_1.WriteTextAreaFieldComponent,
                write_phone_uk_field_component_1.WritePhoneUKFieldComponent,
                write_number_field_component_1.WriteNumberFieldComponent,
                write_email_field_component_1.WriteEmailFieldComponent,
                write_date_field_component_1.WriteDateFieldComponent,
            ],
            entryComponents: [
                unsupported_field_component_1.UnsupportedFieldComponent,
                label_field_component_1.LabelFieldComponent,
                // Read
                read_text_field_component_1.ReadTextFieldComponent,
                read_text_area_field_component_1.ReadTextAreaFieldComponent,
                read_number_field_component_1.ReadNumberFieldComponent,
                read_email_field_component_1.ReadEmailFieldComponent,
                read_phone_uk_field_component_1.ReadPhoneUKFieldComponent,
                read_date_field_component_1.ReadDateFieldComponent,
                read_collection_field_component_1.ReadCollectionFieldComponent,
                // Write
                write_collection_field_component_1.WriteCollectionFieldComponent,
                write_text_field_component_1.WriteTextFieldComponent,
                write_text_area_field_component_1.WriteTextAreaFieldComponent,
                write_phone_uk_field_component_1.WritePhoneUKFieldComponent,
                write_number_field_component_1.WriteNumberFieldComponent,
                write_email_field_component_1.WriteEmailFieldComponent,
                write_date_field_component_1.WriteDateFieldComponent,
            ],
            exports: [
                base_field_module_1.BaseFieldModule,
                utils_module_1.PaletteUtilsModule,
            ],
            providers: [
                palette_service_1.PaletteService,
                form_validators_service_1.FormValidatorsService
            ]
        })
    ], PaletteModule);
    return PaletteModule;
}());
exports.PaletteModule = PaletteModule;
