"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var write_complex_field_component_1 = require("./write-complex-field.component");
var platform_browser_1 = require("@angular/platform-browser");
var fields_filter_pipe_1 = require("./fields-filter.pipe");
var ng2_mock_component_1 = require("ng2-mock-component");
var utils_module_1 = require("../utils/utils.module");
var forms_1 = require("@angular/forms");
var conditional_show_module_1 = require("../../conditional-show/conditional-show.module");
var is_compound_pipe_1 = require("../utils/is-compound.pipe");
var form_validators_service_1 = require("../../../core/form/form-validators.service");
var createSpyObj = jasmine.createSpyObj;
describe('WriteComplexFieldComponent', function () {
    var $COMPLEX_PANEL = platform_browser_1.By.css('.form-group');
    var $COMPLEX_PANEL_TITLE = platform_browser_1.By.css('h3');
    var $COMPLEX_PANEL_VALUES = platform_browser_1.By.css('ccd-field-write');
    var FieldWriteComponent = ng2_mock_component_1.MockComponent({
        selector: 'ccd-field-write',
        inputs: ['caseField', 'registerControl', 'idPrefix', 'isExpanded']
    });
    var fixture;
    var component;
    var de;
    var formValidatorService;
    describe('when values split across children fields', function () {
        var FIELD_TYPE_WITH_MISSING_VALUE = {
            id: 'IAmVeryComplex',
            type: 'Complex',
            complex_fields: [
                {
                    id: 'AddressLine1',
                    label: 'Line 1',
                    display_context: 'OPTIONAL',
                    field_type: {
                        id: 'Text',
                        type: 'Text'
                    },
                    value: ''
                },
                {
                    id: 'AddressLine2',
                    label: 'Line 2',
                    display_context: 'OPTIONAL',
                    field_type: {
                        id: 'Text',
                        type: 'Text'
                    },
                    value: '111 East India road'
                }
            ]
        };
        var FIELD_TYPE_WITH_VALUES = {
            id: 'IAmVeryComplex',
            type: 'Complex',
            complex_fields: [
                {
                    id: 'AddressLine1',
                    label: 'Line 1',
                    display_context: 'OPTIONAL',
                    field_type: {
                        id: 'Text',
                        type: 'Text'
                    },
                    value: 'Flat 9'
                },
                {
                    id: 'AddressLine2',
                    label: 'Line 2',
                    display_context: 'OPTIONAL',
                    field_type: {
                        id: 'Text',
                        type: 'Text'
                    },
                    value: '111 East India road'
                },
                {
                    id: 'AddressPostcode',
                    label: 'Post code',
                    display_context: 'OPTIONAL',
                    field_type: {
                        id: 'Postcode',
                        type: 'Complex',
                        complex_fields: [
                            {
                                id: 'PostcodeCity',
                                label: 'City',
                                display_context: 'OPTIONAL',
                                field_type: {
                                    id: 'Text',
                                    type: 'Text'
                                },
                                value: 'London'
                            },
                            {
                                id: 'PostcodeCountry',
                                label: 'Country',
                                display_context: 'OPTIONAL',
                                field_type: {
                                    id: 'Text',
                                    type: 'Text'
                                },
                                value: 'UK'
                            }
                        ]
                    }
                }
            ]
        };
        var FIELD_ID = 'AComplexField';
        var CASE_FIELD = {
            id: FIELD_ID,
            label: 'Complex Field',
            display_context: 'OPTIONAL',
            field_type: FIELD_TYPE_WITH_VALUES
        };
        var LINE_1 = 0;
        var LINE_2 = 1;
        var POSTCODE = 2;
        var FORM_GROUP = new forms_1.FormGroup({});
        var REGISTER_CONTROL = function (control) {
            FORM_GROUP.addControl(FIELD_ID, control);
            return control;
        };
        beforeEach(testing_1.async(function () {
            formValidatorService = createSpyObj('formValidatorService', ['addValidators']);
            testing_1.TestBed
                .configureTestingModule({
                imports: [
                    utils_module_1.PaletteUtilsModule,
                    conditional_show_module_1.ConditionalShowModule
                ],
                declarations: [
                    write_complex_field_component_1.WriteComplexFieldComponent,
                    fields_filter_pipe_1.FieldsFilterPipe,
                    // Mock
                    FieldWriteComponent,
                ],
                providers: [
                    is_compound_pipe_1.IsCompoundPipe,
                    { provide: form_validators_service_1.FormValidatorsService, useValue: formValidatorService }
                ]
            })
                .compileComponents();
            fixture = testing_1.TestBed.createComponent(write_complex_field_component_1.WriteComplexFieldComponent);
            component = fixture.componentInstance;
            component.caseField = CASE_FIELD;
            component.registerControl = REGISTER_CONTROL;
            de = fixture.debugElement;
            fixture.detectChanges();
        }));
        it('should not render a form group with a header for the complex type', function () {
            var panelTitle = de
                .query($COMPLEX_PANEL)
                .query($COMPLEX_PANEL_TITLE);
            expect(panelTitle).toBeNull();
        });
        it('should render a field write component for each field in the complex type', function () {
            var simpleRowsHeaders = de
                .query($COMPLEX_PANEL)
                .queryAll($COMPLEX_PANEL_VALUES);
            expect(simpleRowsHeaders.length).toBe(3);
            expect(simpleRowsHeaders[LINE_1].componentInstance.caseField.label).toBe(FIELD_TYPE_WITH_VALUES.complex_fields[LINE_1].label);
            expect(simpleRowsHeaders[LINE_2].componentInstance.caseField.label).toBe(FIELD_TYPE_WITH_VALUES.complex_fields[LINE_2].label);
            expect(simpleRowsHeaders[POSTCODE].componentInstance.caseField.label).toBe(FIELD_TYPE_WITH_VALUES.complex_fields[POSTCODE].label);
        });
        it('should render fields with empty value', function () {
            component.caseField = {
                id: 'x',
                label: 'x',
                display_context: 'OPTIONAL',
                field_type: FIELD_TYPE_WITH_MISSING_VALUE
            };
            fixture.detectChanges();
            var labels = de.queryAll($COMPLEX_PANEL_VALUES);
            expect(labels.length).toEqual(2);
            expect(labels[LINE_1].componentInstance.caseField.label).toBe(FIELD_TYPE_WITH_VALUES.complex_fields[LINE_1].label);
            expect(labels[LINE_2].componentInstance.caseField.label).toBe(FIELD_TYPE_WITH_VALUES.complex_fields[LINE_2].label);
        });
        it('should return control if exists in formGroup', function () {
            var CASE_FIELD_1 = {
                id: FIELD_ID,
                label: 'Complex Field',
                display_context: 'OPTIONAL',
                field_type: FIELD_TYPE_WITH_MISSING_VALUE
            };
            var firstControl = new forms_1.FormControl();
            var formGroup = new forms_1.FormGroup({});
            formGroup.addControl(FIELD_ID, firstControl);
            component.complexGroup = formGroup;
            fixture.detectChanges();
            var returned = component.buildControlRegistrer(CASE_FIELD_1).apply(firstControl);
            expect(returned).toBe(firstControl);
            expect(component.complexGroup.get(CASE_FIELD_1.id)).toBeTruthy();
        });
        it('should add control if it does not exist in formGroup', function () {
            var CASE_FIELD_1 = {
                id: 'anotherComplexField',
                label: 'Complex Field',
                display_context: 'OPTIONAL',
                field_type: FIELD_TYPE_WITH_MISSING_VALUE
            };
            var firstControl = new forms_1.FormControl();
            var formGroup = new forms_1.FormGroup({});
            formGroup.addControl('first', firstControl);
            component.complexGroup = formGroup;
            fixture.detectChanges();
            var returned = component.buildControlRegistrer(CASE_FIELD_1)(firstControl);
            expect(returned).toBe(firstControl);
            expect(component.complexGroup.get(CASE_FIELD_1.id)).toBeTruthy();
            expect(component.complexGroup.get('first')).toBeTruthy();
        });
    });
    describe('when values as object in root field', function () {
        var FIELD_TYPE = {
            id: 'IAmVeryComplex',
            type: 'Complex',
            complex_fields: [
                {
                    id: 'AddressLine1',
                    label: 'Line 1',
                    display_context: 'OPTIONAL',
                    field_type: {
                        id: 'Text',
                        type: 'Text'
                    }
                },
                {
                    id: 'AddressLine2',
                    label: 'Line 2',
                    display_context: 'OPTIONAL',
                    field_type: {
                        id: 'Text',
                        type: 'Text'
                    }
                },
                {
                    id: 'AddressPostcode',
                    label: 'Post code',
                    display_context: 'OPTIONAL',
                    field_type: {
                        id: 'Postcode',
                        type: 'Complex',
                        complex_fields: [
                            {
                                id: 'PostcodeCity',
                                label: 'City',
                                display_context: 'OPTIONAL',
                                field_type: {
                                    id: 'Text',
                                    type: 'Text'
                                }
                            },
                            {
                                id: 'PostcodeCountry',
                                label: 'Country',
                                display_context: 'OPTIONAL',
                                field_type: {
                                    id: 'Text',
                                    type: 'Text'
                                }
                            }
                        ]
                    }
                }
            ]
        };
        var FIELD_ID = 'SomeFieldId';
        var CASE_FIELD = {
            id: FIELD_ID,
            label: 'Complex Field',
            field_type: FIELD_TYPE,
            display_context: 'OPTIONAL',
            value: {
                'AddressLine1': 'Flat 9',
                'AddressLine2': '111 East India road',
                'AddressPostcode': {
                    'PostcodeCity': 'London',
                    'PostcodeCountry': 'UK'
                }
            }
        };
        var LINE_1 = 0;
        var LINE_2 = 1;
        var POSTCODE = 2;
        var formGroup;
        var REGISTER_CONTROL = function (control) {
            formGroup.addControl(FIELD_ID, control);
            return control;
        };
        beforeEach(testing_1.async(function () {
            formValidatorService = createSpyObj('formValidatorService', ['addValidators']);
            formGroup = new forms_1.FormGroup({});
            testing_1.TestBed
                .configureTestingModule({
                imports: [
                    utils_module_1.PaletteUtilsModule,
                    conditional_show_module_1.ConditionalShowModule
                ],
                declarations: [
                    write_complex_field_component_1.WriteComplexFieldComponent,
                    fields_filter_pipe_1.FieldsFilterPipe,
                    // Mock
                    FieldWriteComponent,
                ],
                providers: [
                    is_compound_pipe_1.IsCompoundPipe,
                    { provide: form_validators_service_1.FormValidatorsService, useValue: formValidatorService }
                ]
            })
                .compileComponents();
            fixture = testing_1.TestBed.createComponent(write_complex_field_component_1.WriteComplexFieldComponent);
            component = fixture.componentInstance;
            component.caseField = CASE_FIELD;
            component.registerControl = REGISTER_CONTROL;
            de = fixture.debugElement;
            fixture.detectChanges();
        }));
        it('should render a table with a row containing 2 columns for each simple type', function () {
            var values = de
                .query($COMPLEX_PANEL)
                .queryAll($COMPLEX_PANEL_VALUES);
            expect(values.length).toBe(3);
            var line1 = FIELD_TYPE.complex_fields[LINE_1];
            expect(values[LINE_1].componentInstance.caseField).toEqual({
                id: line1.id,
                label: line1.label,
                display_context: 'OPTIONAL',
                field_type: line1.field_type,
                value: CASE_FIELD.value['AddressLine1']
            });
            expect(values[LINE_1].componentInstance.registerControl).not.toBeNull();
            var line2 = FIELD_TYPE.complex_fields[LINE_2];
            expect(values[LINE_2].componentInstance.caseField).toEqual({
                id: line2.id,
                label: line2.label,
                display_context: 'OPTIONAL',
                field_type: line2.field_type,
                value: CASE_FIELD.value['AddressLine2']
            });
            expect(values[LINE_2].componentInstance.registerControl).not.toBeNull();
            var postcode = FIELD_TYPE.complex_fields[POSTCODE];
            expect(values[POSTCODE].componentInstance.caseField).toEqual({
                id: postcode.id,
                label: postcode.label,
                display_context: 'OPTIONAL',
                field_type: postcode.field_type,
                value: CASE_FIELD.value['AddressPostcode']
            });
            expect(values[POSTCODE].componentInstance.registerControl).not.toBeNull();
        });
        it('should render fields with empty value', function () {
            component.caseField = {
                id: 'x',
                label: 'x',
                display_context: 'OPTIONAL',
                field_type: FIELD_TYPE,
                value: {
                    'AddressLine1': 'Flat 9'
                }
            };
            fixture.detectChanges();
            var labels = de.queryAll($COMPLEX_PANEL_VALUES);
            expect(labels.length).toEqual(3);
            expect(labels[LINE_1].componentInstance.caseField.label).toBe(FIELD_TYPE.complex_fields[LINE_1].label);
            expect(labels[LINE_2].componentInstance.caseField.label).toBe(FIELD_TYPE.complex_fields[LINE_2].label);
        });
    });
    describe('when display_context of AddressLine1 is MANDATORY', function () {
        var FIELD_TYPE_WITH_MISSING_VALUE = {
            id: 'IAmVeryComplex',
            type: 'Complex',
            complex_fields: [
                {
                    id: 'AddressLine1',
                    label: 'Line 1',
                    display_context: 'MANDATORY',
                    field_type: {
                        id: '"TextMax150"',
                        type: 'Text'
                    },
                    value: ''
                },
                {
                    id: 'AddressLine2',
                    label: 'Line 2',
                    display_context: 'OPTIONAL',
                    field_type: {
                        id: 'Text',
                        type: 'Text'
                    },
                    value: '111 East India road'
                }
            ]
        };
        var FIELD_TYPE_WITH_VALUES = {
            id: 'TextMax150',
            type: 'Text'
        };
        var FIELD_ID = 'AComplexField';
        var CASE_FIELD_M = {
            id: FIELD_ID,
            label: 'Complex Field',
            display_context: 'MANDATORY',
            field_type: FIELD_TYPE_WITH_VALUES
        };
        var FORM_GROUP = new forms_1.FormGroup({});
        var REGISTER_CONTROL = function (control) {
            FORM_GROUP.addControl(FIELD_ID, control);
            return control;
        };
        beforeEach(testing_1.async(function () {
            formValidatorService = createSpyObj('formValidatorService', ['addValidators']);
            testing_1.TestBed
                .configureTestingModule({
                imports: [
                    utils_module_1.PaletteUtilsModule,
                    conditional_show_module_1.ConditionalShowModule
                ],
                declarations: [
                    write_complex_field_component_1.WriteComplexFieldComponent,
                    fields_filter_pipe_1.FieldsFilterPipe,
                    // Mock
                    FieldWriteComponent,
                ],
                providers: [
                    is_compound_pipe_1.IsCompoundPipe,
                    { provide: form_validators_service_1.FormValidatorsService, useValue: formValidatorService }
                ]
            })
                .compileComponents();
            fixture = testing_1.TestBed.createComponent(write_complex_field_component_1.WriteComplexFieldComponent);
            component = fixture.componentInstance;
            component.caseField = CASE_FIELD_M;
            component.registerControl = REGISTER_CONTROL;
            component.ignoreMandatory = true;
            de = fixture.debugElement;
            fixture.detectChanges();
        }));
        it('should not add control when case field is not AddressLine1 and TextMax150', function () {
            var CASE_FIELD_1 = {
                id: 'anotherComplexField',
                label: 'Complex Field',
                display_context: 'MANDATORY',
                field_type: FIELD_TYPE_WITH_MISSING_VALUE
            };
            var firstControl = new forms_1.FormControl();
            var formGroup = new forms_1.FormGroup({});
            formGroup.addControl('first', firstControl);
            component.complexGroup = formGroup;
            var returned = component.buildControlRegistrer(CASE_FIELD_1)(firstControl);
            expect(returned).toBe(firstControl);
            expect(component.complexGroup.get(CASE_FIELD_1.id)).toBeTruthy();
            expect(component.complexGroup.get('first')).toBeTruthy();
            expect(formValidatorService.addValidators).toHaveBeenCalledTimes(0);
        });
        it('should add control when case field is AddressLine1 and TextMax150', function () {
            component.caseField = {
                id: 'AddressLine1',
                label: 'x',
                display_context: 'MANDATORY',
                field_type: FIELD_TYPE_WITH_VALUES,
                value: {
                    'AddressLine1': 'Flat 9'
                }
            };
            var firstControl = new forms_1.FormControl();
            var formGroup = new forms_1.FormGroup({});
            formGroup.addControl('first', firstControl);
            component.complexGroup = formGroup;
            var returned = component.buildControlRegistrer(component.caseField)(firstControl);
            expect(returned).toBe(firstControl);
            expect(component.complexGroup.get(component.caseField.id)).toBeTruthy();
            expect(component.complexGroup.get('first')).toBeTruthy();
            expect(formValidatorService.addValidators).toHaveBeenCalledWith(component.caseField, firstControl);
        });
        it('should not add control when case field is AddressLine1 but NOT TextMax150', function () {
            component.caseField = {
                id: 'AddressLine1',
                label: 'x',
                display_context: 'MANDATORY',
                field_type: {
                    id: 'TextMax151',
                    type: 'Text'
                },
                value: {
                    'AddressLine1': 'Flat 9'
                }
            };
            var firstControl = new forms_1.FormControl();
            var formGroup = new forms_1.FormGroup({});
            formGroup.addControl('first', firstControl);
            component.complexGroup = formGroup;
            var returned = component.buildControlRegistrer(component.caseField)(firstControl);
            expect(returned).toBe(firstControl);
            expect(component.complexGroup.get(component.caseField.id)).toBeTruthy();
            expect(component.complexGroup.get('first')).toBeTruthy();
            expect(formValidatorService.addValidators).toHaveBeenCalledTimes(0);
        });
        it('should not add control when case field is NOT AddressLine1', function () {
            component.caseField = {
                id: 'AddressLine2',
                label: 'x',
                display_context: 'MANDATORY',
                field_type: {
                    id: 'TextMax150',
                    type: 'Text'
                },
                value: {
                    'AddressLine1': 'Flat 9'
                }
            };
            var firstControl = new forms_1.FormControl();
            var formGroup = new forms_1.FormGroup({});
            formGroup.addControl('first', firstControl);
            component.complexGroup = formGroup;
            var returned = component.buildControlRegistrer(component.caseField)(firstControl);
            expect(returned).toBe(firstControl);
            expect(component.complexGroup.get(component.caseField.id)).toBeTruthy();
            expect(component.complexGroup.get('first')).toBeTruthy();
            expect(formValidatorService.addValidators).toHaveBeenCalledTimes(0);
        });
    });
});
