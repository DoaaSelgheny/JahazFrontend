import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-brand-manager',
  templateUrl: './view-brand-manager.component.html',
  styleUrls: ['./view-brand-manager.component.scss'],
})
export class ViewBrandManagerComponent implements OnInit {
  @Input() data: any;

  constructor(
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.modalService.dismissAll('Cross click');
  }
}
