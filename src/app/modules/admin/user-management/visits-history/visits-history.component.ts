import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import * as converter from "number-to-words";
import { OrderManagementService } from 'src/app/services/api/user-management.service';

@Component({
  selector: 'app-visits-history',
  templateUrl: './visits-history.component.html',
  styleUrls: ['./visits-history.component.scss']
})
export class VisitsHistoryComponent implements OnInit {
  
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  @Input() id:any;
  userData:any
  @Input() customerNo:any
   constructor(
     private _UserManagementService: OrderManagementService,
     private modalService: NgbModal,
     private spinner: NgxSpinnerService,
     public activeModal: NgbActiveModal
   ) {}
 
   ngOnInit(): void {
  
    console.log(converter.toWordsOrdinal(33));
    console.log(converter.toWords(33),'ar');
    console.log(converter.toOrdinal(33));
    this.getUserData();
   }

   getUserData(){
     this.spinner.show()
  
     this._UserManagementService.visitsHistory(this.id).subscribe(res=>{
       this.spinner.hide()
       this.userData=res
     })
   }

   closeModal() {
     this.passEntry.emit(false);
     this.modalService.dismissAll('Cross click');
   }

 }
 