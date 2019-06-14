import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlertService } from '@hmcts/ccd-case-ui-toolkit';

@Component({
  selector: 'ccd-docu',
  templateUrl: './docu.component.html'
})
export class DocuComponent implements OnInit {

  url: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.url = params['url'];
    });
    console.log('URL: ', this.url);
  }
}
