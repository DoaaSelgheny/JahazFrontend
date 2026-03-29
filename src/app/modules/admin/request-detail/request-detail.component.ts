import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderManagementService } from 'src/app/services/api/user-management.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.scss'],
})
export class RequestDetailComponent implements OnInit {
  id: any;
  orderDetail: any;
  totalAfterTax:number=0
  constructor(
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private orderManagementService: OrderManagementService,
    private spinner: NgxSpinnerService
  ) 
  {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getByID();
  }
  getByID() {
    this.spinner.show();
    this.orderManagementService.getOrderByID(this.id).subscribe((res) => {
      this.orderDetail = res;
      this.totalAfterTax=((res.total_price*res.tax_exclusive_discount_amount)/100)+res.total_price
      this.spinner.hide();
      this.cdr.detectChanges();
    });
  }
}
