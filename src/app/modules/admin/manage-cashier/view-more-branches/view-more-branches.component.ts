import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-more-branches',
  templateUrl: './view-more-branches.component.html',
  styleUrls: ['./view-more-branches.component.scss']
})
export class ViewMoreBranchesComponent implements OnInit {
  @Input() data:any;
  @Input() isBrand:any;
  constructor(    private modalService: NgbModal,
    ) { }

  ngOnInit(): void {
  }
  closeModal() {
    this.modalService.dismissAll('Cross click');
  }
}
