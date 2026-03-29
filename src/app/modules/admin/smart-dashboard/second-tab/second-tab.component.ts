import { ManageCustomersService } from './../../../../services/api/manage-customers.service';
import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { UserInfoComponent } from './user-info/user-info.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-second-tab',
  templateUrl: './second-tab.component.html',
  styleUrls: ['./second-tab.component.scss'],
})
export class SecondTabComponent implements OnInit, OnChanges {
  tab = 'visitor';
  totalVists: number;
  totalClients: number;
  totalPoints: number;

pageVisitors = 1;
pageSizeVisitors = 5;
totalCountVisitors = 0;

pagePoints = 1;
pageSizePoints = 5;
totalCountPoints = 0;



  @Input() filterValue: any;
  @Input() BranchIdFilter: any;
  @Input() BrandIdFilter: any;

  ngOnChanges(changes: SimpleChanges) {
    console.log(
      'User name changed:',
      changes['BranchIdFilter'],
      changes['BrandIdFilter']
    );
    if (changes['BranchIdFilter'] ||
      changes['filterValue'] ||
      changes['BrandIdFilter']
     ) {
      this.getCustomerStatistics();
      this.getCustomersPoints();
      this.getCustomersVisits();
    this.setupChartData();
    }
  }

  genderColors = [
    { name: 'female', color: '#F6AFBB', colorArabic: 'أنثى', percentage: 60 },
    { name: 'male', color: '#5B93FF', colorArabic: 'ذكر', percentage: 40 },
  ];
  customersVisits: any[] = [];
  customersPoints: any[] = [];

  constructor(
    private modalService: NgbModal,
    private manageCustomersService: ManageCustomersService,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef
  ) {}

  changeTab(tab: string) {
    this.tab = tab;
  }
  public pieChartData: ChartData<'doughnut', number[], string> = {
    datasets: [
      {
        data: [60, 40],
        backgroundColor: [
          '#4285f4',
          '#2c3e50',
          '#f1c40f',
          '#e74c3c',
          '#95a5a6',
        ],
        borderColor: '#ffffff',
        borderWidth: 3,
        hoverBorderWidth: 5,
        hoverOffset: 10,
      },
    ],
  };

  public pieChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        callbacks: {
          label: function (context) {
            return context.label + ': ' + context.parsed + '%';
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  public pieChartType: ChartType = 'doughnut';
  ngOnInit(): void {
    this.setupChartData();
    this.getCustomersVisits();
    this.getCustomersPoints();
    this.getCustomerStatistics();
  }

  private setupChartData(): void {
    this.pieChartData = {
      labels: this.genderColors.map(
        (color) => `${color.colorArabic}  ${color.percentage}%`
      ),
      datasets: [
        {
          data: this.genderColors.map((color) => color.percentage),
          backgroundColor: this.genderColors.map((color) => color.color),
          borderColor: '#ffffff',
          borderWidth: 3,
          hoverBorderWidth: 5,
          hoverOffset: 15,
        },
      ],
    };
    this.cdr.detectChanges();
  }
  viewUserModal(id: any) {
    const modalRef = this.modalService.open(UserInfoComponent, {
      size: 'lg',
      backdrop: 'static',
      centered: true,
    });
    modalRef.componentInstance.data = {
      branchId:this.BranchIdFilter ??'',
      brandId:this.BrandIdFilter,
      id:id
    };
  }
  getCustomersVisits() {
    this.spinner.show();
const skip = (this.pageVisitors - 1) * this.pageSizeVisitors;

    this.manageCustomersService
      .getCustomersVisits({
      branchId: this.BranchIdFilter ??'',
     brandId:this.BrandIdFilter??'',
      fromDate:this.filterValue?.Date??'',
        toDate: this.filterValue?.toDate ?? '',
      carModel:this.filterValue?.search??'',
      cityId:this.filterValue?.city??'',
            sorting: '',
        skipCount: skip,
    maxResultCount: this.pageSizeVisitors
      })
      .subscribe({
        next: (res) => {
          this.spinner.hide();
          this.customersVisits = res.items;
          this.totalCountVisitors  = res.totalCount;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.spinner.hide();
        },
      });
  }
  getCustomersPoints() {
    this.spinner.show();
const skip = (this.pagePoints - 1) * this.pageSizePoints;
    this.manageCustomersService
      .getCustomersPoints({
      branchId: this.BranchIdFilter ??'',
     brandId:this.BrandIdFilter??'',
      fromDate:this.filterValue?.Date??'',
         toDate: this.filterValue?.toDate ?? '',
      carModel:this.filterValue?.search??'',
      cityId:this.filterValue?.city??'',
                  sorting: '',
    skipCount: skip,
    maxResultCount: this.pageSizePoints
      })
      .subscribe({
        next: (res) => {
          this.spinner.hide();
          this.customersPoints = res.items;
          this.cdr.detectChanges();
          this.totalCountPoints  = res.totalCount;

        },
        error: (err) => {
          this.spinner.hide();
        },
      });
  }

  getCustomerStatistics() {
    this.manageCustomersService
      .getCustomerStatistics({
          branchId: this.BranchIdFilter ??'',
     brandId:this.BrandIdFilter??'',
      fromDate:this.filterValue?.Date??'',
         toDate: this.filterValue?.toDate ?? '',
      carModel:this.filterValue?.search??'',
      cityId:this.filterValue?.city??'',
      })
      .subscribe((res) => {
        this.spinner.show();

        this.totalPoints = res.totalPointsAmount;
        this.totalClients = res.totalCustomersCount;
        this.totalVists = res.totalVisitsCount;

        this.spinner.hide();
        this.cdr.detectChanges();
      });
  }



get totalPagesVisitors(): number {
  return Math.ceil(this.totalCountVisitors / this.pageSizeVisitors);
}

goToPageVisitors(page: number) {
  if (page < 1 || page > this.totalPagesVisitors) return;
  this.pageVisitors = page;
  this.getCustomersVisits();
}

nextPageVisitors() {
  if (this.pageVisitors < this.totalPagesVisitors) {
    this.pageVisitors++;
    this.getCustomersVisits();
  }
}

prevPageVisitors() {
  if (this.pageVisitors > 1) {
    this.pageVisitors--;
    this.getCustomersVisits();
  }
}
get totalPagesPoints(): number {
  return Math.ceil(this.totalCountPoints / this.pageSizePoints);
}

goToPagePoints(page: number) {
  if (page < 1 || page > this.totalPagesPoints) return;
  this.pagePoints = page;
  this.getCustomersPoints();
}

nextPagePoints() {
  if (this.pagePoints < this.totalPagesPoints) {
    this.pagePoints++;
    this.getCustomersPoints();
  }
}

prevPagePoints() {
  if (this.pagePoints > 1) {
    this.pagePoints--;
    this.getCustomersPoints();
  }
}

}
