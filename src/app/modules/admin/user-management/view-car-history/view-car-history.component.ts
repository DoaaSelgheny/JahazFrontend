import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderManagementService } from 'src/app/services/api/user-management.service';
import { RedeemPointsCashierComponent } from '../redeem-points-cashier/redeem-points-cashier.component';

@Component({
  selector: 'app-view-car-history',
  templateUrl: './view-car-history.component.html',
  styleUrls: ['./view-car-history.component.scss']
})
export class ViewCarHistoryComponent implements OnInit {
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Input() id:any;
  @Input() brandId:any;
  userData:any
  tab=1
   constructor(
     private _UserManagementService: OrderManagementService,
     private modalService: NgbModal,
     private spinner: NgxSpinnerService,
     public activeModal: NgbActiveModal
   ) {}

   ngOnInit(): void {
    this.getUserData();
   }
   getUserData(){
     this.spinner.show()
     this._UserManagementService.viewCarHistory(this.id,this.brandId).subscribe(res=>{

       this.spinner.hide()
       this.userData=res
     })
   }
   closeModal() {
     this.passEntry.emit(false);
     this.modalService.dismissAll('Cross click');
   }
   viewPointModel(pointNo:number){
    this.modalService.dismissAll('Cross click');
    const modalRef = this.modalService.open(RedeemPointsCashierComponent, {
      size: '500px',
      backdrop: 'static',
    });
    modalRef.componentInstance.pointNo = pointNo;
    modalRef.componentInstance.brandId = this.brandId;
    modalRef.componentInstance.id = this.id;
    modalRef.componentInstance.branchId = this.userData.branchId;
  }
 }
