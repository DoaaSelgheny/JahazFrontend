import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-vehicle-details-dialog',
  templateUrl: './vehicle-details-dialog.component.html',
  styleUrls: ['./vehicle-details-dialog.component.scss']
})
export class VehicleDetailsDialogComponent implements OnInit {


  ngOnInit(): void {
  }

    @Input() data: any;

  activeTab: 'overview' | 'history' = 'overview';

  constructor(public activeModal: NgbActiveModal) {}

  setTab(tab: any) {
    this.activeTab = tab;
  }
}
