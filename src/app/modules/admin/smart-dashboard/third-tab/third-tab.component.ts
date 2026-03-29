import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,

} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import {
  ChartConfiguration,
  ChartData,
  ChartOptions,
  ChartType,
  Chart,
} from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { ManageCustomersService } from 'src/app/services/api/manage-customers.service';
import { TimeOfDayGranularity } from 'src/app/services/enums/TimeOfDayGranularity.enum';

@Component({
  selector: 'app-third-tab',
  templateUrl: './third-tab.component.html',
  styleUrls: ['./third-tab.component.scss'],
})
export class ThirdTabComponent implements OnInit, OnChanges {
  @Input() filterValue: any;
  @Input() BranchIdFilter: any;
  @Input() BrandIdFilter: any;
  products:any;
  TimeOfDayGranularity = TimeOfDayGranularity;
  granularityOptions = [
    { label: 'خلال اليوم', value: TimeOfDayGranularity.Day },
    { label: 'خلال الأسبوع', value: TimeOfDayGranularity.Week },
    { label: 'خلال الشهر', value: TimeOfDayGranularity.Month },
    { label: 'خلال السنة', value: TimeOfDayGranularity.Year },
  ];
  granularityOptionsEn = [
{ label: 'During the Day', value: TimeOfDayGranularity.Day },

{ label: 'During the Week', value: TimeOfDayGranularity.Week },

{ label: 'During the Month', value: TimeOfDayGranularity.Month },

{ label: 'During the Year', value: TimeOfDayGranularity.Year },
];
  selectedGranularity = TimeOfDayGranularity.Month;
  ordersTimeOfDay: any;
  totalOrdersCount: number;
  totalRevenueAmount: number;
  averageOrderAmount: number;
  averageDailyOrders: number;
  lang: string = String(localStorage.getItem('language'));
  ngOnChanges(changes: SimpleChanges) {
    console.log(
      'User name changed:',
      changes['BranchIdFilter'],
      changes['BrandIdFilter']
    );
    if (
      changes['BranchIdFilter'] ||
      changes['filterValue'] ||
      changes['BrandIdFilter']
    ) {
      this.getCustomerStatistics();
      this.getOrdersByHourStatistics();
      this.getOrdersTimeOfDayStatistics();
      this.getOrdersByitemsStatistics();
      this.setupChartData();
    }
  }

  getCustomerStatistics() {
    this.manageCustomersService
      .getOrdersKpisStatistics({
        branchId: this.BranchIdFilter ?? '',
        brandId: this.BrandIdFilter ?? '',
        fromDate: this.filterValue?.Date ?? '',
           toDate: this.filterValue?.toDate ?? '',
        carModel: this.filterValue?.search ?? '',
        cityId: this.filterValue?.city ?? '',
      })
      .subscribe((res) => {
        this.spinner.show();

        this.totalOrdersCount = res.totalOrdersCount;
        this.totalRevenueAmount = res.totalRevenueAmount;
        this.averageOrderAmount = res.averageOrderAmount;
        this.averageDailyOrders = res.averageDailyOrders;

        this.spinner.hide();
        this.cdr.detectChanges();
      });
  }

  getOrdersTimeOfDayStatistics() {
    this.manageCustomersService
      .getOrdersTimeOfDayStatistics({
        branchId: this.BranchIdFilter ?? '',
        brandId: this.BrandIdFilter ?? '',
        fromDate: this.filterValue?.Date ?? '',
           toDate: this.filterValue?.toDate ?? '',
        carModel: this.filterValue?.search ?? '',
        cityId: this.filterValue?.city ?? '',
        granularity: this.selectedGranularity,
      })
      .subscribe((res) => {
        this.spinner.show();
        console.log(res);
        this.ordersTimeOfDay = res.statistics;
        this.setupChartData()
        this.spinner.hide();
        this.cdr.detectChanges();
      });
  }

  getOrdersByitemsStatistics() {
    this.manageCustomersService
      .getOrdersByitemsStatistics({
        branchId: this.BranchIdFilter ?? '',
        brandId: this.BrandIdFilter ?? '',
        fromDate: this.filterValue?.Date ?? '',
           toDate: this.filterValue?.toDate ?? '',
        carModel: this.filterValue?.search ?? '',
        cityId: this.filterValue?.city ?? '',
      })
      .subscribe((res) => {
        this.spinner.show();
        this.products=res.items
        console.log(res);
        this.spinner.hide();
        this.cdr.detectChanges();
      });
  }

  onGranularityChange() {
    this.getOrdersTimeOfDayStatistics();
  }
  getOrdersByHourStatistics() {
    this.spinner.show();

    this.manageCustomersService
      .getOrdersByHourStatistics({
        branchId: this.BranchIdFilter ?? '',
        brandId: this.BrandIdFilter ?? '',
        fromDate: this.filterValue?.Date ?? '',
           toDate: this.filterValue?.toDate ?? '',
        carModel: this.filterValue?.search ?? '',
        cityId: this.filterValue?.city ?? '',
      })
      .subscribe({
        next: (res) => {
          console.log('Orders by hour response:', res);

          const orderHours = res?.orderHours || [];

          const labels = orderHours.map((x: any) => `${x.hourDisplay}:00`);
          const data = orderHours.map((x: any) => x.orderCount);

          this.ordersByHourChartData = {
            labels,
            datasets: [
              {
                data,
                label: 'Orders Count',
                fill: false,
                borderColor: '#3b82f6',
                tension: 0.4,
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: '#2563eb',
                pointHoverBackgroundColor: '#2563eb',
                pointHoverBorderColor: '#2563eb',
              },
            ],
          };

          this.spinner.hide();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error loading order stats:', err);
          this.spinner.hide();
        },
      });
  }

  // statusBreakdownData = computed(() => {
  //   const items = this.allItems();
  //   const breakdown: Record<string, Record<string, number>> = {};

  //   items.forEach(item => {
  //     if (!breakdown[item.statusName]) {
  //       breakdown[item.statusName] = {
  //         'KPI': 0,
  //         'OKR': 0,
  //         'Initiative': 0,
  //         'Milestone': 0,
  //         'Total': 0
  //       };
  //     }

  //     const typeName = this.getTypeNameFromNumber(item.type);

  //     if (breakdown[item.statusName][typeName] !== undefined) {
  //       breakdown[item.statusName][typeName]++;
  //     }
  //     breakdown[item.statusName]['Total']++;
  //   });

  //   return breakdown;
  // });
  public ordersByHourChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [],
  };

  public pieChartData: ChartData<'doughnut', number[], string> = {
    datasets: [
      {
        data: [35, 25, 17],
        backgroundColor: ['#B15C57', '#D28582', '#FFC8C5'],
        borderColor: '#ffffff',
        borderWidth: 3,
        hoverBorderWidth: 5,
        hoverOffset: 10,
      },
    ],
  };
timePeriods: any[];


// Updated tooltip to show counts or percentages
public pieChartOptions: ChartOptions<'doughnut'>
// Add this property to your component class
private activeTimePeriods: any[] = [];

private setupChartData(): void {
  // Define time period data
  const timePeriods = [
    { label: 'Morning', count: this.ordersTimeOfDay?.morningCount, time: this.translate.instant("smart.morning"), color: '#B15C57' },
    { label: 'Afternoon', count: this.ordersTimeOfDay?.afternoonCount, time: this.translate.instant("smart.afternoon"), color: '#D28582' },
    { label: 'Night', count: this.ordersTimeOfDay?.nightCount, time: this.translate.instant("smart.night"), color: '#FFC8C5' }
  ];
  console.log("timePeriods", timePeriods);

  // Calculate total for percentages
  const total = timePeriods.reduce((sum, period) => sum + period.count, 0);

  // Filter out periods with 0 count (optional)
  const activeTimePeriods = timePeriods.filter(period => period.count > 0);

  // Store activeTimePeriods for tooltip access
  this.activeTimePeriods = activeTimePeriods;

  this.pieChartData = {
    labels: activeTimePeriods.map(period => period.label),
    datasets: [
      {
        data: activeTimePeriods.map(period => period.count),
        backgroundColor: activeTimePeriods.map(period => period.color),
        hoverBackgroundColor: activeTimePeriods.map(period =>
          this.lightenColor(period.color, 20)
        ),
        borderColor: '#ffffff',
        borderWidth: 3,
        hoverBorderWidth: 5,
        hoverOffset: 15,
      },
    ],
  };

  // Update chart options with the current activeTimePeriods
  this.updateChartOptions();
}

// Separate method to update chart options
private updateChartOptions(): void {
  const activeTimePeriods = this.activeTimePeriods; // Capture in closure

  this.pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        display: false,
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
            const count = context.parsed;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0) as number;
            const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : '0';

            // Access from closure
            const timePeriod = activeTimePeriods[context.dataIndex];

            const lines = [
              `${context.label} `,
              `${timePeriod.time}`,
              `${count} ${count === 1 ? 'order' : 'orders'}`,
            ];

            return lines;
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };
}


  public performanceChartData: ChartConfiguration<'line'>['data'];
  // public performanceChartData: any;
  public performanceChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        enabled: false, // Disable default tooltip
        external: (context) => {
          try {
            // Get or create tooltip element
            let tooltipEl = document.getElementById('chartjs-tooltip');

            if (!tooltipEl) {
              tooltipEl = document.createElement('div');
              tooltipEl.id = 'chartjs-tooltip';
              tooltipEl.style.position = 'absolute';
              tooltipEl.style.pointerEvents = 'none';
              tooltipEl.style.transition = 'all 0.1s ease';
              tooltipEl.innerHTML = '<div class="tooltip-content"></div>';
              document.body.appendChild(tooltipEl);
            }

            const tooltipModel = context.tooltip;
            // Hide if no tooltip
            if (tooltipModel.opacity === 0) {
              tooltipEl.style.opacity = '0';
              return;
            }

            // Set content
            if (
              tooltipModel.body &&
              tooltipModel.dataPoints &&
              tooltipModel.dataPoints.length > 0
            ) {
              const dataPoint = tooltipModel.dataPoints[0];
              const dataIndex = dataPoint.dataIndex;

              const tooltipContent = tooltipEl.querySelector(
                '.tooltip-content'
              ) as HTMLElement;

              if (tooltipModel.dataPoints?.length) {
                const dataPoint = tooltipModel.dataPoints[0];
                const orderCount = dataPoint.raw;
                if (tooltipContent) {
                  tooltipContent.innerHTML = `
       <div class="custom-tooltip-card">
              <div class="tooltip-row">
                <span class="tooltip-label">Orders:</span>
                <span class="tooltip-value">${orderCount}</span>
              </div>
            </div>
          `;
                }
              }
            }

            // Position tooltip
            const canvas = context.chart.canvas;
            const position = canvas.getBoundingClientRect();

            tooltipEl.style.opacity = '1';
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.left =
              position.left +
              window.pageXOffset +
              tooltipModel.caretX -
              20 +
              'px';
            tooltipEl.style.top =
              position.top +
              window.pageYOffset +
              tooltipModel.caretY -
              40 +
              'px';
            tooltipEl.style.pointerEvents = 'none';
            tooltipEl.style.zIndex = '9999';
          } catch (error) {
            console.error('Error in tooltip external function:', error);
          }
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
            family: 'Inter, sans-serif',
          },

          padding: 15,
          maxTicksLimit: 8,
        },
        title: {
          display: true,
          color: '#6b7280',
          font: {
            size: 12,
            family: 'Inter, sans-serif',
          },
          padding: {
            top: 20,
          },
        },
      },
      y: {
        display: true,

        beginAtZero: true,
        // max: 70 + 5,
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
            family: 'Inter, sans-serif',
          },
          stepSize: 1,
        },
        title: {
          display: true,
          color: '#6b7280',
          font: {
            size: 12,
            family: 'Inter, sans-serif',
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 8,
        backgroundColor: '#3b82f6',
        borderColor: '#2563eb',
        borderWidth: 2, // Point border width
        pointStyle: 'circle', // Point style
      },
    },
  };

  public performanceChartType: ChartType = 'line';

  constructor(
    private modalService: NgbModal,
    private manageCustomersService: ManageCustomersService,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef,
    private translate:TranslateService
  ) {}

  ngOnInit(): void {
    // this.setupChartData();
    this.getCustomerStatistics();
    this.getOrdersByHourStatistics();
    this.getOrdersTimeOfDayStatistics();
      this.getOrdersByitemsStatistics();
  }

  // Helper method to lighten colors for hover effect
  private lightenColor(color: string, percent: number): string {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = ((num >> 8) & 0x00ff) + amt;
    const B = (num & 0x0000ff) + amt;
    return (
      '#' +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  }

  tab = 'points';
  changeTab(tab: any) {
    this.tab = tab;
  }
}
