"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var write_address_field_component_1 = require("./write-address-field.component");
var conditional_show_module_1 = require("../../conditional-show/conditional-show.module");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var addresses_service_1 = require("../../../core/addresses/addresses.service");
var address_model_1 = require("../../../core/addresses/address.model");
var rxjs_1 = require("rxjs");
var field_label_pipe_1 = require("../utils/field-label.pipe");
describe('WriteAddressFieldComponent', function () {
    var CASE_FIELD_LABEL = 'Case Field Label';
    var $TITLE = platform_browser_1.By.css('h3');
    var $POSTCODE_LOOKUP = platform_browser_1.By.css('#postcodeLookup');
    var $POSTCODE_LOOKUP_INPUT = platform_browser_1.By.css('#postcodeInput');
    var $POSTCODE_LOOKUP_FIND = platform_browser_1.By.css('#postcodeLookup > button');
    var $POSTCODE_LOOKUP_ERROR_MESSAGE = platform_browser_1.By.css('.error-message');
    var $SELECT_ADDRESS = platform_browser_1.By.css('#selectAddress');
    var $ADDRESS_LIST = platform_browser_1.By.css('#selectAddress > #addressList');
    var $MANUAL_LINK = platform_browser_1.By.css('.manual-link');
    var $ADDRESS_COMPLEX_FIELD = platform_browser_1.By.css('ccd-write-complex-type-field');
    var TestHostComponent = /** @class */ (function () {
        function TestHostComponent() {
            this.caseField = caseField(null);
            this.registerControl = function () { };
        }
        __decorate([
            core_1.ViewChild(write_address_field_component_1.WriteAddressFieldComponent)
        ], TestHostComponent.prototype, "componentUnderTest", void 0);
        TestHostComponent = __decorate([
            core_1.Component({
                selector: "ccd-host-component",
                template: "<ccd-write-address-field [caseField]=\"caseField\" [registerControl]=\"registerControl\"></ccd-write-address-field>"
            })
        ], TestHostComponent);
        return TestHostComponent;
    }());
    var MockWriteComplexFieldComponent = /** @class */ (function () {
        function MockWriteComplexFieldComponent() {
            var _this = this;
            this.idPrefix = '';
            this.ignoreMandatory = false;
            this.complexGroup = {
                value: {},
                setValue: function (value) { _this.complexGroup.value = value; }
            };
        }
        __decorate([
            core_1.Input()
        ], MockWriteComplexFieldComponent.prototype, "caseField", void 0);
        __decorate([
            core_1.Input()
        ], MockWriteComplexFieldComponent.prototype, "registerControl", void 0);
        __decorate([
            core_1.Input()
        ], MockWriteComplexFieldComponent.prototype, "idPrefix", void 0);
        __decorate([
            core_1.Input()
        ], MockWriteComplexFieldComponent.prototype, "ignoreMandatory", void 0);
        __decorate([
            core_1.Input()
        ], MockWriteComplexFieldComponent.prototype, "renderLabel", void 0);
        MockWriteComplexFieldComponent = __decorate([
            core_1.Component({
                selector: "ccd-write-complex-type-field",
                template: ""
            })
        ], MockWriteComplexFieldComponent);
        return MockWriteComplexFieldComponent;
    }());
    var addressesService;
    var testHostComponent;
    var debugElement;
    var fixture;
    function caseField(address) {
        return {
            id: 'caseFieldId',
            label: CASE_FIELD_LABEL,
            field_type: { id: 'FieldTypeId', type: 'Complex' },
            value: address
        };
    }
    function buildAddress(entryNo) {
        var address = new address_model_1.AddressModel();
        address.AddressLine1 = 'AddressLine1-' + entryNo;
        address.AddressLine2 = 'AddressLine2-' + entryNo;
        address.AddressLine3 = 'AddressLine3-' + entryNo;
        address.PostTown = 'PostTown-' + entryNo;
        address.County = 'County-' + entryNo;
        address.PostCode = 'PostCode-' + entryNo;
        address.Country = 'Country-' + entryNo;
        return address;
    }
    function queryPostcode() {
        var postcodeField = fixture.debugElement.query($POSTCODE_LOOKUP_INPUT).nativeElement;
        postcodeField.value = 'P05T CDE';
        postcodeField.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        debugElement.query($POSTCODE_LOOKUP_FIND).triggerEventHandler('click', null);
        fixture.detectChanges();
    }
    beforeEach(testing_1.async(function () {
        addressesService = new addresses_service_1.AddressesService(null, null);
        testing_1.TestBed
            .configureTestingModule({
            imports: [
                conditional_show_module_1.ConditionalShowModule,
                forms_1.ReactiveFormsModule,
            ],
            declarations: [
                write_address_field_component_1.WriteAddressFieldComponent,
                TestHostComponent,
                field_label_pipe_1.FieldLabelPipe,
                // Mocks
                MockWriteComplexFieldComponent,
            ],
            providers: [
                { provide: addresses_service_1.AddressesService, useValue: addressesService }
            ]
        })
            .compileComponents();
        fixture = testing_1.TestBed.createComponent(TestHostComponent);
        testHostComponent = fixture.componentInstance;
        testHostComponent.caseField.value = null;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
    }));
    it('should render only title, lookup component and manual link when address not set', function () {
        expect(debugElement.query($TITLE).nativeElement.innerHTML).toEqual(CASE_FIELD_LABEL);
        expect(debugElement.query($POSTCODE_LOOKUP)).toBeTruthy();
        expect(debugElement.query($SELECT_ADDRESS)).toBeFalsy();
        expect(debugElement.query($MANUAL_LINK)).toBeTruthy();
        expect(debugElement.query($ADDRESS_COMPLEX_FIELD)).toBeTruthy();
        expect(debugElement.query($ADDRESS_COMPLEX_FIELD).nativeElement['hidden']).toBeTruthy();
    });
    it('should render only address lines if field is search ', function () {
        testHostComponent.componentUnderTest.isExpanded = true; // false by default
        fixture.detectChanges();
        expect(debugElement.query($TITLE).nativeElement.innerHTML).toEqual(CASE_FIELD_LABEL);
        expect(debugElement.query($POSTCODE_LOOKUP)).toBeFalsy();
        expect(debugElement.query($SELECT_ADDRESS)).toBeFalsy();
        expect(debugElement.query($MANUAL_LINK)).toBeFalsy();
        expect(debugElement.query($ADDRESS_COMPLEX_FIELD)).toBeTruthy();
        expect(debugElement.query($ADDRESS_COMPLEX_FIELD).nativeElement['hidden']).toBeFalsy();
    });
    it('should render only title, lookup component and manual link when writeComplexFieldComponent is null', function () {
        testHostComponent.componentUnderTest.writeComplexFieldComponent = null;
        fixture.detectChanges();
        expect(debugElement.query($TITLE).nativeElement.innerHTML).toEqual(CASE_FIELD_LABEL);
        expect(debugElement.query($POSTCODE_LOOKUP)).toBeTruthy();
        expect(debugElement.query($SELECT_ADDRESS)).toBeFalsy();
        expect(debugElement.query($MANUAL_LINK)).toBeTruthy();
        expect(debugElement.query($ADDRESS_COMPLEX_FIELD)).toBeTruthy();
        expect(debugElement.query($ADDRESS_COMPLEX_FIELD).nativeElement['hidden']).toBeTruthy();
    });
    it('should render only title, lookup component and address when address set', function () {
        var address = new address_model_1.AddressModel();
        address.AddressLine1 = 'Address Line 1';
        address.AddressLine2 = 'Address Line 2';
        address.AddressLine3 = 'Address Line 3';
        address.PostTown = 'PostTown';
        address.County = 'County';
        address.PostCode = 'PostCode';
        address.Country = 'Country';
        testHostComponent.caseField = caseField(address);
        fixture.detectChanges();
        expect(debugElement.query($TITLE).nativeElement.innerHTML).toEqual(CASE_FIELD_LABEL);
        expect(debugElement.query($POSTCODE_LOOKUP)).toBeTruthy();
        expect(debugElement.query($SELECT_ADDRESS)).toBeFalsy();
        expect(debugElement.query($MANUAL_LINK)).toBeFalsy();
        expect(debugElement.query($ADDRESS_COMPLEX_FIELD)).toBeTruthy();
        expect(debugElement.query($ADDRESS_COMPLEX_FIELD).nativeElement['hidden']).toBeFalsy();
        expect(testHostComponent.componentUnderTest.writeComplexFieldComponent.complexGroup.value).toEqual(address);
    });
    it('should render a single option of \'No address found\' when no addresses are returned from AddressesService', function () {
        spyOn(addressesService, 'getAddressesForPostcode').and.returnValue(rxjs_1.Observable.of([]));
        queryPostcode();
        expect(debugElement.query($MANUAL_LINK)).toBeTruthy();
        expect(addressesService.getAddressesForPostcode).toHaveBeenCalledWith('P05TCDE');
        expect(debugElement.query($SELECT_ADDRESS)).toBeTruthy();
        expect(debugElement.query($ADDRESS_LIST).children.length).toEqual(1);
        expect(debugElement.query($ADDRESS_LIST).children[0].nativeElement.innerHTML.trim()).toEqual('No address found');
    });
    it('should render a default \'summary item\' and 3 address options when 3 addresses are returned from AddressesService', function () {
        var address2 = buildAddress(2);
        address2.AddressLine2 = '';
        var address3 = buildAddress(3);
        address3.AddressLine3 = '';
        spyOn(addressesService, 'getAddressesForPostcode').and.returnValue(rxjs_1.Observable.of([buildAddress(1), address2, address3]));
        queryPostcode();
        expect(addressesService.getAddressesForPostcode).toHaveBeenCalledWith('P05TCDE');
        expect(debugElement.query($MANUAL_LINK)).toBeTruthy();
        expect(debugElement.query($SELECT_ADDRESS)).toBeTruthy();
        expect(debugElement.query($ADDRESS_LIST).children.length).toEqual(4);
        expect(debugElement.query($ADDRESS_LIST).children[0].nativeElement.innerHTML.trim()).toEqual('3 addresses found');
        expect(debugElement.query($ADDRESS_LIST).children[1].nativeElement.innerHTML.trim()).toEqual('AddressLine1-1, AddressLine2-1, AddressLine3-1, PostTown-1');
        expect(debugElement.query($ADDRESS_LIST).children[2].nativeElement.innerHTML.trim()).toEqual('AddressLine1-2, AddressLine3-2, PostTown-2');
        expect(debugElement.query($ADDRESS_LIST).children[3].nativeElement.innerHTML.trim()).toEqual('AddressLine1-3, AddressLine2-3, PostTown-3');
    });
    it('should populate the address with the option selected, removing the \'manual link\'', function () {
        var selectedAddress = buildAddress(1);
        testHostComponent.componentUnderTest.addressList.setValue(selectedAddress);
        testHostComponent.componentUnderTest.addressSelected();
        fixture.detectChanges();
        expect(debugElement.query($TITLE).nativeElement.innerHTML).toEqual(CASE_FIELD_LABEL);
        expect(debugElement.query($POSTCODE_LOOKUP)).toBeTruthy();
        expect(debugElement.query($SELECT_ADDRESS)).toBeFalsy();
        expect(debugElement.query($MANUAL_LINK)).toBeFalsy();
        expect(debugElement.query($ADDRESS_COMPLEX_FIELD)).toBeTruthy();
        expect(debugElement.query($ADDRESS_COMPLEX_FIELD).nativeElement['hidden']).toBeFalsy();
        expect(testHostComponent.componentUnderTest.writeComplexFieldComponent.complexGroup.value).toEqual(selectedAddress);
    });
    it('should populate a blank address when the \'manual link\' is clicked', function () {
        fixture.debugElement.query($MANUAL_LINK).nativeElement.dispatchEvent(new Event('click', null));
        fixture.detectChanges();
        expect(debugElement.query($TITLE).nativeElement.innerHTML).toEqual(CASE_FIELD_LABEL);
        expect(debugElement.query($POSTCODE_LOOKUP)).toBeTruthy();
        expect(debugElement.query($SELECT_ADDRESS)).toBeFalsy();
        expect(debugElement.query($MANUAL_LINK)).toBeFalsy();
        expect(debugElement.query($ADDRESS_COMPLEX_FIELD)).toBeTruthy();
        expect(debugElement.query($ADDRESS_COMPLEX_FIELD).nativeElement['hidden']).toBeFalsy();
        expect(testHostComponent.componentUnderTest.writeComplexFieldComponent.complexGroup.value.AddressLine1).toEqual('');
        expect(testHostComponent.componentUnderTest.writeComplexFieldComponent.complexGroup.value.AddressLine2).toEqual('');
        expect(testHostComponent.componentUnderTest.writeComplexFieldComponent.complexGroup.value.AddressLine3).toEqual('');
        expect(testHostComponent.componentUnderTest.writeComplexFieldComponent.complexGroup.value.PostTown).toEqual('');
        expect(testHostComponent.componentUnderTest.writeComplexFieldComponent.complexGroup.value.County).toEqual('');
        expect(testHostComponent.componentUnderTest.writeComplexFieldComponent.complexGroup.value.PostCode).toEqual('');
        expect(testHostComponent.componentUnderTest.writeComplexFieldComponent.complexGroup.value.Country).toEqual('');
    });
    it('should render an error when postcode is blank', function () {
        debugElement.query($POSTCODE_LOOKUP_FIND).triggerEventHandler('click', null);
        fixture.detectChanges();
        expect(debugElement.query($POSTCODE_LOOKUP_ERROR_MESSAGE)).toBeTruthy();
    });
    it('should clear the error when postcode is not blank', function () {
        testHostComponent.componentUnderTest.missingPostcode = true;
        fixture.detectChanges();
        queryPostcode();
        expect(debugElement.query($POSTCODE_LOOKUP_ERROR_MESSAGE)).toBeFalsy();
    });
});
