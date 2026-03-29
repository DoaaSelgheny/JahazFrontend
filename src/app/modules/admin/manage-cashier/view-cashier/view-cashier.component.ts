import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { CashiersService } from 'src/app/services/api/cashier.service';

@Component({
  selector: 'app-view-cashier',
  templateUrl: './view-cashier.component.html',
  styleUrls: ['./view-cashier.component.scss'],
})
export class ViewCashierComponent implements OnInit {
  @Input() data: any;
  cashierData: any;
  constructor(
    private cashierService: CashiersService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }
  getUserData() {
    this.spinner.show();
    this.cashierService.getCashierInfo(this.data?.id).subscribe((res) => {
      this.spinner.hide();
      this.cashierData = res;
    });
  }
  closeModal() {
    this.modalService.dismissAll('Cross click');
  }
}
