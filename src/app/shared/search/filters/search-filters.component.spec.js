"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var search_filters_component_1 = require("./search-filters.component");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var search_service_1 = require("../../../core/search/search.service");
var Rx_1 = require("rxjs/Rx");
var order_service_1 = require("../../../core/order/order.service");
var abstract_field_write_component_1 = require("../../palette/base-field/abstract-field-write.component");
var jurisdiction_service_1 = require("../../jurisdiction.service");
var access_types_model_1 = require("../../domain/case-view/access-types.model");
var definitions_service_1 = require("../../../core/definitions/definitions.service");
var search_input_test_fixture_1 = require("../../../core/search/search-input.test.fixture");
var createSpyObj = jasmine.createSpyObj;
var JURISDICTION_1 = {
    id: 'J1',
    name: 'Jurisdiction 1',
    description: ''
};
var CASE_TYPE_1 = {
    id: 'CT0',
    name: 'Case type 0',
    description: '',
    states: [],
    events: [],
    case_fields: [],
    jurisdiction: JURISDICTION_1
};
var JURISDICTION_2 = {
    id: 'J2',
    name: 'Jurisdiction 2',
    description: ''
};
var CASE_TYPES_2 = [
    {
        id: 'CT1',
        name: 'Case type 1',
        description: '',
        states: [],
        events: [],
        case_fields: [],
        jurisdiction: JURISDICTION_2
    },
    {
        id: 'CT2',
        name: 'Case type 2',
        description: '',
        states: [
            {
                id: 'S1',
                name: 'State 1',
                description: ''
            },
            {
                id: 'S2',
                name: 'State 2',
                description: ''
            }
        ],
        events: [],
        case_fields: [],
        jurisdiction: JURISDICTION_2
    },
    {
        id: 'CT3',
        name: 'Case type 3',
        description: '',
        states: [],
        events: [],
        case_fields: [],
        jurisdiction: JURISDICTION_2
    }
];
var CRUD_FILTERED_CASE_TYPES = [
    {
        id: 'CT1',
        name: 'Case type 1',
        description: '',
        states: [],
        events: [],
        case_fields: [],
        jurisdiction: JURISDICTION_1
    },
    {
        id: 'CT3',
        name: 'Case type 3',
        description: '',
        states: [],
        events: [],
        case_fields: [],
        jurisdiction: JURISDICTION_1
    }
];
var TEST_SEARCH_INPUTS = search_input_test_fixture_1.createSearchInputs();
var FieldWriteComponent = /** @class */ (function (_super) {
    __extends(FieldWriteComponent, _super);
    function FieldWriteComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        core_1.Input()
    ], FieldWriteComponent.prototype, "formGroup", void 0);
    FieldWriteComponent = __decorate([
        core_1.Component({
            selector: 'ccd-field-write',
            template: "{{value}}"
        })
    ], FieldWriteComponent);
    return FieldWriteComponent;
}(abstract_field_write_component_1.AbstractFieldWriteComponent));
function createObservableFrom(param) {
    return Rx_1.Observable.create(function (observer) {
        observer.next(param);
        observer.complete();
    });
}
var searchHandler;
var mockSearchService;
var orderService;
var definitionsService;
var TEST_FORM_GROUP = new forms_1.FormGroup({});
var METADATA_FIELDS = ['PersonLastName'];
describe('SearchFiltersComponent', function () {
    var fixture;
    var component;
    var de;
    var jurisdictionService;
    beforeEach(testing_1.async(function () {
        searchHandler = createSpyObj('searchHandler', ['applyFilters']);
        mockSearchService = createSpyObj('mockSearchService', ['getSearchInputs']);
        definitionsService = createSpyObj('definitionsService', ['getCaseTypes']);
        definitionsService.getCaseTypes.and.returnValue(Rx_1.Observable.of(CASE_TYPES_2));
        orderService = createSpyObj('orderService', ['sortAsc']);
        jurisdictionService = new jurisdiction_service_1.JurisdictionService();
        testing_1.TestBed
            .configureTestingModule({
            imports: [
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule
            ],
            declarations: [
                search_filters_component_1.SearchFiltersComponent,
                FieldWriteComponent
            ], providers: [
                { provide: search_service_1.SearchService, useValue: mockSearchService },
                { provide: order_service_1.OrderService, useValue: orderService },
                { provide: jurisdiction_service_1.JurisdictionService, useValue: jurisdictionService },
                { provide: definitions_service_1.DefinitionsService, useValue: definitionsService }
            ]
        })
            .compileComponents();
        fixture = testing_1.TestBed.createComponent(search_filters_component_1.SearchFiltersComponent);
        component = fixture.componentInstance;
        component.formGroup = TEST_FORM_GROUP;
        component.jurisdictions = [
            JURISDICTION_1,
            JURISDICTION_2
        ];
        component.onApply.subscribe(searchHandler.applyFilters);
        de = fixture.debugElement;
        fixture.detectChanges();
    }));
    it('should select the jurisdiction if there is only one jurisdiction', function () {
        mockSearchService.getSearchInputs.and.returnValue(createObservableFrom(TEST_SEARCH_INPUTS));
        component.jurisdictions = [JURISDICTION_1];
        fixture.detectChanges();
        component.ngOnInit();
        fixture.detectChanges();
        expect(component.selected.jurisdiction).toBe(JURISDICTION_1);
    });
    it('should select the caseType if there is only one caseType', function () {
        definitionsService.getCaseTypes.and.returnValue(Rx_1.Observable.of([CASE_TYPE_1]));
        mockSearchService.getSearchInputs.and.returnValue(createObservableFrom(TEST_SEARCH_INPUTS));
        component.jurisdictions = [JURISDICTION_1];
        fixture.detectChanges();
        component.ngOnInit();
        fixture.detectChanges();
        expect(component.selected.jurisdiction).toBe(JURISDICTION_1);
        expect(component.selected.caseType).toBe(CASE_TYPE_1);
    });
    it('should initialise jurisdiction selector with given jurisdictions', function () {
        var selector = de.query(platform_browser_1.By.css('#s-jurisdiction'));
        expect(selector.children.length).toEqual(2);
        var juris1 = selector.children[0];
        expect(juris1.nativeElement.textContent).toEqual(JURISDICTION_1.name);
        var juris2 = selector.children[1];
        expect(juris2.nativeElement.textContent).toEqual(JURISDICTION_2.name);
    });
    it('should update and announce selected jurisdiction', testing_1.async(function () {
        mockSearchService.getSearchInputs.and.returnValue(createObservableFrom(TEST_SEARCH_INPUTS));
        component.selected.jurisdiction = JURISDICTION_1;
        component.onJurisdictionIdChange();
        fixture.detectChanges();
        var selector = de.query(platform_browser_1.By.css('#s-jurisdiction'));
        fixture
            .whenStable()
            .then(function () {
            expect(selector.nativeElement.selectedIndex).toEqual(0);
            expect(component.selected.jurisdiction).toBe(JURISDICTION_1);
            expect(definitionsService.getCaseTypes).toHaveBeenCalledWith(JURISDICTION_1.id, access_types_model_1.READ_ACCESS);
        });
    }));
    it('should populate case types dropdown with CRUD filtered case types', testing_1.async(function () {
        var selector = de.query(platform_browser_1.By.css('#s-case-type'));
        expect(selector.children.length).toEqual(0);
        definitionsService.getCaseTypes.and.returnValue(Rx_1.Observable.of(CRUD_FILTERED_CASE_TYPES));
        component.selected.jurisdiction = JURISDICTION_1;
        component.onJurisdictionIdChange();
        fixture.detectChanges();
        fixture
            .whenStable()
            .then(function () {
            expect(selector.children.length).toEqual(2);
            var juris1 = selector.children[0];
            expect(juris1.nativeElement.textContent).toEqual(CRUD_FILTERED_CASE_TYPES[0].name);
            var juris2 = selector.children[1];
            expect(juris2.nativeElement.textContent).toEqual(CRUD_FILTERED_CASE_TYPES[1].name);
        });
    }));
    it('should initialise case type selector with types from selected jurisdiction', function () {
        component.selected.jurisdiction = JURISDICTION_2;
        component.onJurisdictionIdChange();
        fixture.detectChanges();
        expect(definitionsService.getCaseTypes).toHaveBeenCalledWith(JURISDICTION_2.id, access_types_model_1.READ_ACCESS);
        var selector = de.query(platform_browser_1.By.css('#s-case-type'));
        expect(selector.children.length).toEqual(3);
        var ct1 = selector.children[0];
        expect(ct1.nativeElement.textContent).toEqual(CASE_TYPES_2[0].name);
        var ct2 = selector.children[1];
        expect(ct2.nativeElement.textContent).toEqual(CASE_TYPES_2[1].name);
        var ct3 = selector.children[2];
        expect(ct3.nativeElement.textContent).toEqual(CASE_TYPES_2[2].name);
    });
    it('should update selected case type', testing_1.async(function () {
        component.selected.jurisdiction = JURISDICTION_2;
        component.selectedJurisdictionCaseTypes = CASE_TYPES_2;
        component.selected.caseType = CASE_TYPES_2[2];
        fixture.detectChanges();
        fixture
            .whenStable()
            .then(function () {
            var selector = de.query(platform_browser_1.By.css('#s-case-type'));
            expect(selector.nativeElement.selectedIndex).toEqual(2);
            expect(component.selected.caseType).toBe(CASE_TYPES_2[2]);
        });
    }));
    it('should have an apply button enabled when case type is set', testing_1.async(function () {
        component.selected.jurisdiction = JURISDICTION_2;
        component.selected.caseType = CASE_TYPES_2[2];
        mockSearchService.getSearchInputs.and.returnValue(createObservableFrom(TEST_SEARCH_INPUTS));
        component.onCaseTypeIdChange();
        fixture.detectChanges();
        var button = de.query(platform_browser_1.By.css('button'));
        expect(button.nativeElement.disabled).toBeFalsy();
    }));
    it('should have an apply button disabled nor search inputs retrieved when case type is not set', testing_1.async(function () {
        component.selected.jurisdiction = JURISDICTION_2;
        fixture.detectChanges();
        var button = de.query(platform_browser_1.By.css('button'));
        expect(button.nativeElement.disabled).toBeTruthy();
        expect(mockSearchService.getSearchInputs).toHaveBeenCalledTimes(0);
    }));
    it('should have form group details added when apply button is clicked ', testing_1.async(function () {
        component.selected.jurisdiction = JURISDICTION_2;
        component.apply();
        expect(searchHandler.applyFilters).toHaveBeenCalledWith(component.selected);
        expect(component.selected.formGroup.value).toEqual(TEST_FORM_GROUP.value);
    }));
    it('should have metadata fields added when apply button is clicked', testing_1.async(function () {
        component.searchInputs = TEST_SEARCH_INPUTS;
        component.apply();
        expect(component.selected.metadataFields).toEqual(METADATA_FIELDS);
    }));
    it('should update search input when case type is reset', testing_1.async(function () {
        component.selected.jurisdiction = JURISDICTION_2;
        component.selected.caseType = CASE_TYPES_2[2];
        mockSearchService.getSearchInputs.and.returnValue(Rx_1.Observable.of([]));
        component.onCaseTypeIdChange();
        expect(mockSearchService.getSearchInputs).toHaveBeenCalledWith(JURISDICTION_2.id, CASE_TYPES_2[2].id);
    }));
    it('should order search inputs', testing_1.async(function () {
        component.selected.jurisdiction = JURISDICTION_2;
        component.selected.caseType = CASE_TYPES_2[2];
        mockSearchService.getSearchInputs.and.returnValue(createObservableFrom(TEST_SEARCH_INPUTS));
        component.onCaseTypeIdChange();
        expect(orderService.sortAsc).toHaveBeenCalled();
    }));
    it('should render an input for each defined search input', function () {
        component.selected.jurisdiction = JURISDICTION_2;
        component.selected.caseType = CASE_TYPES_2[2];
        mockSearchService.getSearchInputs.and.returnValue(createObservableFrom(TEST_SEARCH_INPUTS));
        component.onCaseTypeIdChange();
        fixture.detectChanges();
        var dynamicFilters = de.query(platform_browser_1.By.css('#dynamicFilters'));
        expect(dynamicFilters.children.length).toBe(TEST_SEARCH_INPUTS.length);
    });
    it('should render a valid search input field component', function () {
        component.selected.jurisdiction = JURISDICTION_2;
        component.selected.caseType = CASE_TYPES_2[2];
        mockSearchService.getSearchInputs.and.returnValue(createObservableFrom(TEST_SEARCH_INPUTS));
        component.onCaseTypeIdChange();
        fixture.detectChanges();
        var firstInput = TEST_SEARCH_INPUTS[0];
        var dynamicFilters = de.query(platform_browser_1.By.css('#dynamicFilters'));
        var writeField = dynamicFilters.query(platform_browser_1.By.directive(FieldWriteComponent));
        var writeFieldInstance = writeField.componentInstance;
        expect(writeFieldInstance.caseField).toEqual(firstInput.field);
        expect(writeFieldInstance.caseField.label).toEqual(firstInput.field.label);
        expect(writeFieldInstance.formGroup).toBeTruthy();
    });
    it('should submit filters when apply button is clicked', testing_1.async(function () {
        mockSearchService.getSearchInputs.and.returnValue(createObservableFrom(TEST_SEARCH_INPUTS));
        searchHandler.applyFilters.calls.reset();
        component.selected.jurisdiction = JURISDICTION_2;
        component.selected.caseType = CASE_TYPES_2[2];
        var control = new forms_1.FormControl('test');
        control.setValue('anything');
        var formControls = {
            'name': control
        };
        var formGroup = new forms_1.FormGroup(formControls);
        component.onCaseTypeIdChange();
        fixture.detectChanges();
        fixture
            .whenStable()
            .then(function () {
            var button = de.query(platform_browser_1.By.css('button'));
            component.formGroup = formGroup;
            button.nativeElement.click();
            var arg = searchHandler.applyFilters.calls.mostRecent().args[0];
            expect(arg['jurisdiction']).toEqual(JURISDICTION_2);
            expect(arg['caseType']).toEqual(CASE_TYPES_2[2]);
            expect(arg['formGroup'].value).toEqual(formGroup.value);
            expect(searchHandler.applyFilters).toHaveBeenCalledTimes(1);
        });
    }));
});
