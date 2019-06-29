import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseField, WindowService } from '@hmcts/ccd-case-ui-toolkit';

@Component({
  selector: 'ccd-docu',
  templateUrl: './doc-viewer.component.html'
})
export class DocViewerComponent implements OnInit {

  data: any;

  public constructor(private windowService: WindowService) {
  }

  ngOnInit() {
    this.data = JSON.parse(this.windowService.getLocalStorage('DOC_VIEWER'));
    this.windowService.removeLocalStorage('DOC_VIEWER');
  }
}
