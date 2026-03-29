import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageCustomersService } from 'src/app/services/api/manage-customers.service';
export interface Car {
  id: number;
  number: string;
  make: string;
  makeModel: string;
  color: string;
  year: string;
  cameraNumber: string;
}

export interface OrderHistoryItem {
  orderNumber?: string;
  orderDate?: string;
  paidAmount?: number;
  orderStatus?: string;
  items?: string[];
}

export interface CustomerDetails {
  id: number;
  fullName: string;
  phoneNumber: string;
  countryCode: number;
  countryCodeIso: string;
  customerNo: string;
  creationTime: string;
  totalVisits: number;
  totalPurchasesCount: number;
  membershipPoints: number;
  totalMoneySpent: number;
  cars: Car[];
  orderHistory: OrderHistoryItem[];
}

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  @Input() data:any;
  @Input() isBrand:any;
customerDetails:CustomerDetails
  allLogs=[
    {
      no:33,
      date:"12-12-2023",
      price:"C12345",
      status:"John Doe",
      details:"Purchased items worth $200"
    }];
get latestOrder() {
  return this.customerDetails?.orderHistory?.[0] ?? null;
}
  totalCount:number=0;
  page:number=1;
  pageSize:number=5;
getAllLogsData(){
this.manageCustomersService.getCustomerDetails(this.data).subscribe({
        next: (res) => {
        console.log(res);
        this.customerDetails=res
        }
})
}

  constructor(    private modalService: NgbModal,
    private manageCustomersService:ManageCustomersService
    ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.getAllLogsData()

  }
  closeModal() {
    this.modalService.dismissAll('Cross click');
  }
}
