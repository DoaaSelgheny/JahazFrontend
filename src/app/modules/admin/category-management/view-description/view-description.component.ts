import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-description',
  templateUrl: './view-description.component.html',
  styleUrls: ['./view-description.component.scss']
})
export class ViewDescriptionComponent implements OnInit {
  @Input() data: any;
  cameras: any[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
  }

  closeModal() {
    this.modalService.dismissAll('Cross click');
  }
}
