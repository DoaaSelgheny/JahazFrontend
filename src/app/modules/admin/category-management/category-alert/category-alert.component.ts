import { Component, Input, OnInit } from '@angular/core';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category-alert',
  templateUrl: './category-alert.component.html',
  styleUrls: ['./category-alert.component.scss']
})
export class CategoryAlertComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  @Input() val:any
  ngOnInit(): void {
  }

  closeModal()
  {
    this.modalService.dismissAll();
  }


}
