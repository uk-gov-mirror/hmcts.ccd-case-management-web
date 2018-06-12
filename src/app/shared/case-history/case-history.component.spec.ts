import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseHistoryComponent } from './case-history.component';
import { FieldsUtils } from "../utils/fields.utils";
import { PaletteUtilsModule } from "../palette/utils/utils.module";
import { attr } from "../../test/helpers";
import { CaseViewEvent } from "../../core/cases/case-view-event.model";
import { MockComponent } from "ng2-mock-component";
import { By } from "@angular/platform-browser";
import { HttpError } from "../../core/http/http-error.model";
import { LabelSubstitutorDirective } from "../substitutor/label-substitutor.directive";
import { ActivatedRoute, Router } from "@angular/router";
import { LabelSubstitutionService } from "../case-editor/label-substitution.service";
import createSpyObj = jasmine.createSpyObj;
import { CaseHistoryView } from "../../core/cases/case-history-view.model";
import any = jasmine.any;
import { DebugElement } from "@angular/core";
import { OrderService } from "../../core/order/order.service";

describe('CaseHistoryComponent', () => {

  const CaseHeaderComponent: any = MockComponent({
    selector: 'ccd-case-header',
    inputs: ['caseDetails']
  });

  const MarkdownComponent: any = MockComponent({
    selector: 'ccd-markdown',
    inputs: ['content']
  });

  // Page object selectors
  const $NAME_TAB_CONTENT = By.css('table#NameTab');

  const EVENT: CaseViewEvent = {
    id: 4,
    timestamp: '2017-05-09T16:07:03.973',
    summary: 'Case updated!',
    comment: 'Plop plop',
    event_id: 'updateCase',
    event_name: 'Update a case',
    state_id: 'CaseUpdated',
    state_name: 'Case Updated',
    user_id: 0,
    user_last_name: 'Chan',
    user_first_name: 'Phillip'
  };

  const CASE_HISTORY: CaseHistoryView = {
    case_id: '1',
    case_type: {
      id: 'TestAddressBookCase',
      name: 'Test Address Book Case',
      jurisdiction: {
        id: 'TEST',
        name: 'Test',
      }
    },
    tabs: [
      {
        id: 'AddressTab',
        label: 'Address',
        order: 2,
        fields: [],
        show_condition: 'PersonFirstName="Jane"'
      },
      {
        id: 'NameTab',
        label: 'Name',
        order: 1,
        fields: [
          {
            id: 'PersonFirstName',
            label: 'First name',
            display_context: 'OPTIONAL',
            field_type: {
              id: 'Text',
              type: 'Text'
            },
            order: 2,
            value: 'Janet',
            show_condition: ''
          },
          {
            id: 'PersonLastName',
            label: 'Last name',
            display_context: 'OPTIONAL',
            field_type: {
              id: 'Text',
              type: 'Text'
            },
            order: 1,
            value: 'Parker',
            show_condition: 'PersonFirstName="Jane*"'
          },
          {
            id: 'PersonComplex',
            label: 'Complex field',
            display_context: 'OPTIONAL',
            field_type: {
              id: 'Complex',
              type: 'Complex',
              complex_fields: []
            },
            order: 3,
            show_condition: 'PersonFirstName="Park"'
          }
        ],
        show_condition: 'PersonFirstName="Janet"'
      },
      {
        id: 'SomeTab',
        label: 'Some Tab',
        order: 3,
        fields: [],
        show_condition: ''
      },
    ],
    event: EVENT
  };
  const FIELDS = CASE_HISTORY.tabs[1].fields;
  const SIMPLE_FIELDS = CASE_HISTORY.tabs[1].fields.slice(0, 2);
  const COMPLEX_FIELDS = CASE_HISTORY.tabs[1].fields.slice(2);

  const ERROR: HttpError = new HttpError();
  ERROR.message = 'Critical error!';

  let component: CaseHistoryComponent;
  let fixture: ComponentFixture<CaseHistoryComponent>;
  let de: DebugElement;

  let mockRoute: any = {
    snapshot: {
      data: {
        caseHistory: CASE_HISTORY
      }
    }
  };

  let router: any;
  let orderService;

  let FieldReadComponent: any = MockComponent({ selector: 'ccd-field-read', inputs: [
      'caseField'
    ]});

  let LinkComponent: any = MockComponent({ selector: 'a', inputs: [
      'routerLink'
    ]});

  beforeEach(async(() => {
    orderService = new OrderService();
    spyOn(orderService, 'sort').and.callThrough();

    router = createSpyObj<Router>('router', ['navigate']);
    router.navigate.and.returnValue(new Promise(any));

    TestBed
      .configureTestingModule({
        imports: [
          PaletteUtilsModule,
        ],
        declarations: [
          CaseHistoryComponent,
          LabelSubstitutorDirective,
          // Mock
          FieldReadComponent,
          CaseHeaderComponent,
          LinkComponent,
          MarkdownComponent
        ],
        providers: [
          FieldsUtils,
          LabelSubstitutionService,
          { provide: ActivatedRoute, useValue: mockRoute },
          { provide: OrderService, useValue: orderService },
          { provide: Router, useValue: router }
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(CaseHistoryComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  }));

  it('should render a case header', () => {
    let header = de.query(By.directive(CaseHeaderComponent));
    expect(header).toBeTruthy();
    expect(header.componentInstance.caseDetails).toEqual(CASE_HISTORY);
  });

  it('should render the correct case details based on show_condition', () => {
    // we expect address section not to be rendered
    let headers = fixture.nativeElement.querySelectorAll('h3');

    expect(headers.length).toBe(CASE_HISTORY.tabs.length - 1);
    expect(headers[0].textContent).toBe(CASE_HISTORY.tabs[1].label);
    expect(headers[1].textContent).toBe(CASE_HISTORY.tabs[2].label);
  });

  it('should render the event details first followed by case details', () => {
    let headers = fixture.nativeElement.querySelectorAll('h2');

    expect(headers[0].textContent).toBe('Event Details');
    expect(headers[1].textContent).toBe('Case Details');
  });

  it('should render the field labels based on show_condition', () => {
    let headers = de.query($NAME_TAB_CONTENT).queryAll(By.css('tbody>tr>th'));

    expect(headers.find(r => r.nativeElement.textContent.trim() === 'Complex field'))
      .toBeFalsy('Found row with label Complex field');
    expect(headers.find(r => r.nativeElement.textContent.trim() === 'Last name'))
      .toBeTruthy('Cannot find row with label Last name');
    expect(headers.find(r => r.nativeElement.textContent.trim() === 'First name'))
      .toBeTruthy('Cannot find row with label First name');
  });

  it('should render a row for each field in a given section', () => {
    let rows = de
      .query($NAME_TAB_CONTENT)
      .queryAll(By.css('tbody>tr'));
    expect(rows.length).toBe(FIELDS.length);
  });

  it('should render each simple field label as a table header', () => {
    let headers = de
      .query($NAME_TAB_CONTENT)
      .queryAll(By.css('tbody>tr>th'));

    SIMPLE_FIELDS.forEach(field => {
      expect(headers.find(r => r.nativeElement.textContent.trim() === field.label))
        .toBeTruthy(`Could not find row with label ${field.label}`);
    });
  });

  it('should render each compound field without label as a cell spanning 2 columns', () => {
    let headers = de
      .query($NAME_TAB_CONTENT)
      .queryAll(By.css('tbody>tr.complex-field>th'));

    expect(headers.length).toBe(0);

    let cells = de
      .query($NAME_TAB_CONTENT)
      .queryAll(By.css('tbody>tr.compound-field>td'));

    expect(cells.length).toEqual(COMPLEX_FIELDS.length);

    cells.forEach(cell => {
      expect(attr(cell, 'colspan')).toBe('2');
    });
  });

  it('should render each field value using FieldReadComponent', () => {
    let readFields = de
      .query($NAME_TAB_CONTENT)
      .queryAll(By.css('tbody>tr td>ccd-field-read'));

    FIELDS.forEach(field => {
      expect(readFields.find(f => {
        let fieldInstance = f.componentInstance;
        return JSON.stringify(fieldInstance.caseField) === JSON.stringify(field);
      }))
        .toBeTruthy(`Could not find field with type ${field.field_type}`);
    });
    expect(FIELDS.length).toBe(readFields.length);
  });

  it('should render fields in ascending order', () => {
    let headers = de
      .query($NAME_TAB_CONTENT)
      .queryAll(By.css('tbody>tr>th'));

    expect(headers[0].nativeElement.textContent.trim()).toBe(FIELDS[1].label);
  });

});
