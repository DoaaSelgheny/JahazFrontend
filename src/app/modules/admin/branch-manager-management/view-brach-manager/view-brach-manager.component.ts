import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { BranchManagerService } from 'src/app/services/api/branch-manager.service';

@Component({
  selector: 'app-view-brach-manager',
  templateUrl: './view-brach-manager.component.html',
  styleUrls: ['./view-brach-manager.component.scss'],
})
export class ViewBrachManagerComponent implements OnInit {
  @Input() data: any;
  cashierData: any;
  constructor(
    private branchManagerService: BranchManagerService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }
  getUserData() {
    this.spinner.show();
    this.branchManagerService
      .getBranchManagerInfo(this.data?.id)
      .subscribe((res) => {
        this.spinner.hide();
        this.cashierData = res;
      });
  }
  closeModal() {
    this.modalService.dismissAll('Cross click');
  }
}
