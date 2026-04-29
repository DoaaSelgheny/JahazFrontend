import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApexOptions } from 'ng-apexcharts';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BrandService } from 'src/app/services/api/brand.service';
import { BranchManagerService } from 'src/app/services/api/branch-manager.service';
import { FirstTabService } from 'src/app/services/api/first-tab.service';
import { ManageCustomersService } from 'src/app/services/api/manage-customers.service';
import { DashboardFilterComponent } from './filter/dashboard-filter.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardService } from './dashboard.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent implements OnInit {
  formValue: any;
  BrandId: any = '';
  brands: any[] = [];
  branchs: any[] = [];
  Branch: any | null = null;
  cards: any;
  longestStayVehicles: any[] = [];

  visitsByHourOptions: ApexOptions;

  visitActivityOptions: ApexOptions;

  stayByVehicleOptions: ApexOptions;

  durationDonutOptions: ApexOptions & { series: number[] };

  constructor(
    private modalService: NgbModal,
    private brandService: BrandService,
    private branchManagerService: BranchManagerService,
    private firstTabService: FirstTabService,
    private _dashboardService: DashboardService,
    private manageCustomersService: ManageCustomersService,
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
        private translate: TranslateService,

  ) {
    this.visitsByHourOptions = {
      series: [],

      chart: {
        type: 'bar',
        height: 320,
        stacked: true,
        toolbar: { show: false },
      },
      colors: [
        'rgba(219, 234, 254, 1)',
        'rgba(81, 162, 255, 1)',
        'rgba(21, 93, 252, 1)',
      ],
      plotOptions: { bar: { columnWidth: '45%', borderRadius: 6 } },
      dataLabels: { enabled: false },
      stroke: { show: false, width: 0 },
      xaxis: {
        categories: [],

        labels: { style: { colors: '#94A3B8', fontSize: '12px' } },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        title: { text: 'Visits' },
        labels: { style: { colors: '#94A3B8', fontSize: '12px' } },
      },
      tooltip: { shared: true, intersect: false, theme: 'light' },
      legend: { position: 'bottom' },
      fill: { opacity: 1 },
      grid: { borderColor: '#EEF0F4', strokeDashArray: 4 },
    };

    this.visitActivityOptions = {
      series: [],
      chart: { type: 'line', height: 320, toolbar: { show: false } },
      colors: ['#2563EB'],
      stroke: { curve: 'smooth', width: 3 },
      dataLabels: { enabled: false },
      xaxis: {
        categories: [],
        labels: { rotate: -35, style: { colors: '#94A3B8', fontSize: '12px' } },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        title: { text: 'Count' },
        min: 0,
        labels: { style: { colors: '#94A3B8', fontSize: '12px' } },
      },
      tooltip: { shared: true, intersect: false, theme: 'light' },
      grid: { borderColor: '#EEF0F4', strokeDashArray: 4 },
    };

    this.stayByVehicleOptions = {
      series: [],
      chart: { type: 'bar', height: 360, toolbar: { show: false } },
      colors: ['#3B82F6'],
      plotOptions: {
        bar: { horizontal: false, columnWidth: '45%', borderRadius: 6 },
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2 },
      xaxis: {
        categories: [],
        labels: { style: { colors: '#94A3B8', fontSize: '12px' } },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        title: { text: 'Minutes' },
        labels: { style: { colors: '#94A3B8', fontSize: '12px' } },
      },
      tooltip: {
        shared: false,
        intersect: true,
        y: { formatter: (v) => `${v} min` },
      },
      grid: { borderColor: '#EEF0F4', strokeDashArray: 4 },
    };

    this.durationDonutOptions = {
      series: [],
      chart: { type: 'donut', height: 360 },
      labels: ['60-120 min', '0-60 min', '120-240 min', '240-480 min'],
      legend: { position: 'bottom' },
      responsive: [
        {
          breakpoint: 992,
          options: { chart: { height: 300 }, legend: { position: 'bottom' } },
        },
      ],
    };
  }

  vistsHourly() {
    const input: any = {
      fromDate: this.formValue?.Date ?? '',
      toDate: this.formValue?.toDate ?? '',
    };

    this._dashboardService.vistsHourly(input).subscribe((res: any) => {
      const hours = res?.hours || [];

      const categories = hours.map((h: any) => `${h.hourDisplay}:00`);

      const low = hours.map((h: any) =>
        h.visitCount <= 19 ? h.visitCount : 0,
      );

      const medium = hours.map((h: any) =>
        h.visitCount >= 20 && h.visitCount <= 39 ? h.visitCount : 0,
      );

      const high = hours.map((h: any) =>
        h.visitCount >= 40 ? h.visitCount : 0,
      );

      this.visitsByHourOptions = {
        ...this.visitsByHourOptions,
        series: [
          { name: 'Low (0-19)', data: low },
          { name: 'Medium (20-39)', data: medium },
          { name: 'High (40+)', data: high },
        ],
        xaxis: {
          ...(this.visitsByHourOptions.xaxis as any),
          categories: categories,
        },
      };

      this.cdr.detectChanges();
    });
  }

  vistsLongest() {
    const input: any = {
      fromDate: this.formValue?.Date ?? '',
      toDate: this.formValue?.toDate ?? '',
    };

    this._dashboardService.vistsLongest(input).subscribe((res) => {
      this.longestStayVehicles = res;
      this.cdr.detectChanges();
    });
  }

  vistsByVehicles() {
    const input: any = {
      fromDate: this.formValue?.Date ?? '',
      toDate: this.formValue?.toDate ?? '',
    };

    this._dashboardService.vistsByVehicles(input).subscribe({
      next: (res: any[]) => {
        if (!res || !res.length) return;

        const categories = res.map((x) => x.makeModel); // ✅ الصح
        const values = res.map((x) => x.averageDurationInMinutes);

        this.stayByVehicleOptions = {
          ...this.stayByVehicleOptions,
          series: [
            {
              name: 'Avg Stay (min)',
              data: values,
            },
          ],
          xaxis: {
            ...(this.stayByVehicleOptions.xaxis as any),
            categories: categories,
          },
        };

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  vistsByStayDuration() {
    const input: any = {
      fromDate: this.formValue?.Date ?? '',
      toDate: this.formValue?.toDate ?? '',
    };

    this._dashboardService.vistsByStayDuration(input).subscribe({
      next: (res: any) => {
        const buckets = res?.buckets || [];

        const labels = buckets.map((x: any) => `${x.label} min`);
        const series = buckets.map((x: any) => x.count);

        this.durationDonutOptions = {
          ...this.durationDonutOptions,
          labels: labels,
          series: series,
        };

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  vistsDaily() {
    this._dashboardService.vistsDaily().subscribe({
      next: (res: any) => {
        const days = res?.days || [];

        const categories = days.map((d: any) => {
          const date = new Date(d.date);
          return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          });
        });

        const values = days.map((d: any) => d.visitCount);

        this.visitActivityOptions = {
          ...this.visitActivityOptions,
          series: [
            {
              name: 'Visits',
              data: values,
            },
          ],
          xaxis: {
            ...(this.visitActivityOptions.xaxis as any),
            categories: categories,
          },
        };

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.getCard();
    this.vistsHourly();
    this.vistsLongest();
    this.vistsByVehicles();
    this.vistsByStayDuration();
    this.vistsDaily();
  }

  openFilter() {
    const dialogRef = this.modalService.open(DashboardFilterComponent, {
      centered: true,
      backdrop: 'static',
    });

    if (this.formValue?.Date) {
      this.formValue.Date = this.formValue.Date.slice(0, 10);
    }
    if (this.formValue?.toDate) {
      this.formValue.toDate = this.formValue.toDate.slice(0, 10);
    }

    dialogRef.componentInstance.data = this.formValue;
    dialogRef.result
      .then((result) => {
        if (result) {
          this.formValue = result;
          this.getCard();
          this.vistsHourly();
          this.vistsByVehicles();
          this.vistsLongest();

          this.cdr.detectChanges();
        }
      })
      .catch(() => {});
  }

  getCard() {
    this.spinner.show();
    const input: any = {
      fromDate: this.formValue?.Date ?? '',
      toDate: this.formValue?.toDate ?? '',
    };

    this.brandService.getCards(input).subscribe((res) => {
      this.cards = res;
      this.spinner.hide();
    });
  }


  getBranchs(id: any) {
    if (!id) {
      this.branchs = [];
      this.Branch = null;
      return;
    }
    this.branchManagerService.getBranchByBrand(id).subscribe({
      next: (res: any) => {
        this.branchs = res || [];
        this.Branch = null;
        this.cdr.detectChanges();
      },
      error: () => {
        this.branchs = [];
        this.Branch = null;
      },
    });
  }

  changeBrand(brandId: any) {
    this.BrandId = brandId;
    this.getBranchs(brandId);
  }

}
