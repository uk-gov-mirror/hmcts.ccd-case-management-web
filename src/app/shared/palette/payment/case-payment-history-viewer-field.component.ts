import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { Component } from '@angular/core';
import { Constants } from '../../constants.model';

@Component({
  selector: 'ccd-case-payment-history-viewer-field',
  templateUrl: 'case-payment-history-viewer-field.html',
  styleUrls: ['case-payment-history-viewer-field.scss']
})
export class CasePaymentHistoryViewerFieldComponent extends AbstractFieldReadComponent {

  public static readonly PAYMENTS_BASE_URL_KEY = 'payments_url';

  payments_url: string;
  case_reference: string;

  getBaseURL() {
    return this.caseViewContext.get(CasePaymentHistoryViewerFieldComponent.PAYMENTS_BASE_URL_KEY);
  }

  getCaseReference() {
    return this.caseViewContext.get(Constants.CASE_REFERENCE_KEY);

  }
}
