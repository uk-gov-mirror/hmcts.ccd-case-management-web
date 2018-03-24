import { CaseField } from '../../domain/definition/case-field.model';
import { FieldType } from '../../domain/definition/field-type.model';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WriteDocumentFieldComponent } from './write-document-field.component';
import { DebugElement } from '@angular/core';
import createSpyObj = jasmine.createSpyObj;
import { DocumentManagementService } from '../../../core/documentManagement/documentManagement.service';
import { DocumentData } from '../../domain/document/document-data.model';
import { Observable } from 'rxjs/Observable';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng2-mock-component';
import { FormGroup } from '@angular/forms';
import any = jasmine.any;
import { FieldLabelPipe } from '../utils/field-label.pipe';

describe('WriteDocumentFieldComponent', () => {

  const FIELD_TYPE: FieldType = {
    id: 'Document',
    type: 'Document'
  };
  const VALUE = {
    'document_url': 'https://www.example.com',
    'document_binary_url': 'https://www.example.com/binary',
    'document_filename': 'evidence_document.evd'
  };
  const CASE_FIELD: CaseField = {
    id: 'x',
    label: 'X',
    display_context: 'OPTIONAL',
    field_type: FIELD_TYPE,
    value: VALUE
  };
  const DOCUMENT_MANAGEMENT_URL = 'http://docmanagement.ccd.reform/documents';
  const RESPONSE_FIRST_DOCUMENT: DocumentData = {
    _embedded: {
      documents: [{
        originalDocumentName: 'howto.pdf',
        _links: {
          self: {
            href: DOCUMENT_MANAGEMENT_URL + '/abcd0123'
          },
          binary: {
            href: DOCUMENT_MANAGEMENT_URL + '/abcd0123/binary'
          }
        }
      }]
    }
  };
  const RESPONSE_SECOND_DOCUMENT: DocumentData = {
    _embedded: {
      documents: [{
        originalDocumentName: 'plop.pdf',
        _links: {
          self: {
            href: DOCUMENT_MANAGEMENT_URL + '/cdef4567'
          },
          binary: {
            href: DOCUMENT_MANAGEMENT_URL + '/cdef4567/binary'
          }
        }
      }]
    }
  };
  const FORM_GROUP_ID = 'document_url';
  const FORM_GROUP = new FormGroup({});
  const REGISTER_CONTROL = (control) => {
    FORM_GROUP.addControl(FORM_GROUP_ID, control);
    return control;
  };

  let ReadDocumentComponent = MockComponent({
    selector: 'ccd-read-document-field',
    inputs: ['caseField']
  });

  let fixture: ComponentFixture<WriteDocumentFieldComponent>;
  let component: WriteDocumentFieldComponent;
  let de: DebugElement;
  let mockDocumentManagementService: any;

  beforeEach(() => {
    mockDocumentManagementService = createSpyObj<DocumentManagementService>('documentManagementService', ['uploadFile']);
    mockDocumentManagementService.uploadFile.and.returnValues(
      Observable.of(RESPONSE_FIRST_DOCUMENT),
      Observable.of(RESPONSE_SECOND_DOCUMENT)
    );

    TestBed
      .configureTestingModule({
        imports: [],
        declarations: [
          WriteDocumentFieldComponent,
          FieldLabelPipe,

          // Mock
          ReadDocumentComponent,
        ],
        providers: [
          { provide: DocumentManagementService, useValue: mockDocumentManagementService }
        ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(WriteDocumentFieldComponent);
    component = fixture.componentInstance;

    component.registerControl = REGISTER_CONTROL;
    component.caseField = CASE_FIELD;

    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should render an element for file selection', () => {
    let uploadElement = de.query(By.css('input[type=file]'));

    expect(uploadElement).toBeTruthy();
  });

  it('should render a ccd-read-document-field tag for an existing document', () => {
    let ccdReadDocumentElement = de.query(By.css('ccd-read-document-field'));

    expect(ccdReadDocumentElement).toBeTruthy();
  });

  it('should initialise formControl with provided value', () => {
    expect(FORM_GROUP.controls[FORM_GROUP_ID].value.document_url).toBe(VALUE.document_url);
    expect(FORM_GROUP.controls[FORM_GROUP_ID].value.document_binary_url).toBe(VALUE.document_binary_url);
    expect(FORM_GROUP.controls[FORM_GROUP_ID].value.document_filename).toBe(VALUE.document_filename);
  });

  it('should upload given document', () => {
    let file = {
      name: 'test.pdf'
    };
    component.fileChangeEvent({
      target: {
        files: [
          file
        ]
      }
    });

    expect(mockDocumentManagementService.uploadFile).toHaveBeenCalledWith(any(FormData));
  });

});
