import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'ccd-write-case=link-field',
  templateUrl: 'write-case-link-field.html',
  styleUrls: ['write-case-link-field.scss']
})
export class WriteCaseLinkFieldComponent extends AbstractFieldWriteComponent implements OnInit, OnChanges {

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}
