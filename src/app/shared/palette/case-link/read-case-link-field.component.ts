import { Component } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';

@Component({
  selector: 'ccd-read-case-link-field',
  template: `{{caseField.value | ccdCaseLink}}`
})

export class ReadCaseLinkFieldComponent extends AbstractFieldReadComponent {
}
