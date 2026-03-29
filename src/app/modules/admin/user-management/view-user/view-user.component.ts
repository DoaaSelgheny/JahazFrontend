import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderManagementService } from 'src/app/services/api/user-management.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})
export class ViewUserComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Input() data: any;
  userData: any;
  constructor(
    private _UserManagementService: OrderManagementService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }
  getUserData() {
    this.spinner.show();
    this._UserManagementService.viewUser(this.data?.id).subscribe((res) => {
      this.spinner.hide();
      this.userData = res;
    });
  }
  closeModal() {
    this.passEntry.emit(false);
    this.modalService.dismissAll('Cross click');
  }
}
