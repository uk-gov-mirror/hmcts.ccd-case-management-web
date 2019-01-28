import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: 'case-view-consumer.component.html'
})
export class CaseViewConsumerComponent implements OnInit {

    case: string;

    constructor(
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.case = this.route.snapshot.params['cid'];
    }
}
