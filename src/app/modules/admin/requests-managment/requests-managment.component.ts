import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { OrderManagementService } from 'src/app/services/api/user-management.service';
import { OrderStatus } from 'src/app/services/enums/order-status.enum';

@Component({
  selector: 'app-requests-managment',
  templateUrl: './requests-managment.component.html',
  styleUrls: ['./requests-managment.component.scss'],
})
export class RequestsManagmentComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private orderManagementService: OrderManagementService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  totalCount: number;
  accountStatus = '';
  searchText: string = '';
  page: number = 1;
  tab = 1;
  pageSize: number = 10;
  allOrders: any[] = [];
  filterObj = this.initFilterObj();
  orderStatus = OrderStatus;

  fromSearchInput: boolean = false;

  ngOnInit(): void {
    this.getAllOrderData();
  }

  rest() {
    this.searchText = '';
    this.getAllOrderData();
  }
  getAllOrderData() {
      this.spinner.show();
    // if (!this.fromSearchInput) {
    //   this.spinner.show();
    // }
    const startIndex = (this.page - 1) * this.pageSize;
    this.filterObj.SkipCount = startIndex;
    this.filterObj.Text = this.searchText;
    this.filterObj.MaxResultCount = this.pageSize;
    this.orderManagementService
      .getAllOrders(this.filterObj)
      .subscribe((res) => {
        this.allOrders = res.items;
        this.totalCount = res.totalCount;
        this.spinner.hide();
        this.cdr.detectChanges();
      });
  }
  initFilterObj() {
    return {
      Text: this.searchText,
      Sorting: 'id',
      orderStatus: OrderStatus.Pending,
      SkipCount: 0,
      MaxResultCount: this.pageSize,
    };
  }

  changeTab(oderStatus: any) {
    this.filterObj.orderStatus = oderStatus;
    this.filterObj.SkipCount = 0;
    this.getAllOrderData();
  }
  requestDetails(id: any) {
    this.router.navigate(['admin/request-detail/' + id]);
  }
}
