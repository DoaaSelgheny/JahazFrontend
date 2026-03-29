import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  ChartConfiguration,
  ChartData,
  ChartOptions,
  ChartType,
} from 'chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { FirstTabService } from 'src/app/services/api/first-tab.service';

@Component({
  selector: 'app-first-tab',
  templateUrl: './first-tab.component.html',
  styleUrls: ['./first-tab.component.scss'],
})
export class FirstTabComponent implements OnInit, OnChanges {
  constructor(
    private FirstTabService: FirstTabService,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService
  ) {}
currentLang = this.translate.currentLang || 'ar';

  hourRows: any;
  peakHour: number;
  CustomerStatistics: any;
  totalVisits: number;
  maxVisitCount: number;
  averageWaitingTime:number;
  totalCars: number;
  components: any;
  carBrands: any;
  topThreeColors: any;
  carsColor: any;
  @Input() filterValue: any;
  @Input() BranchIdFilter: any;
  @Input() BrandIdFilter: any;
  ngOnChanges(changes: SimpleChanges) {
    console.log(
      'User name changed:',
      changes['BranchIdFilter'],
      changes['BrandIdFilter']
    );
    if (
    (  changes['BranchIdFilter'] )||
      changes['filterValue'] ||
      changes['BrandIdFilter']

    ) {
      this.getColors();
      this.getvisitHours();
      this.getCarBrands();
      this.cdr.detectChanges();
    }
  }
  getCarBrands() {
    this.spinner.show();
    this.FirstTabService.getCarBrands({
      brandId: this.BrandIdFilter ?? '',
      fromDate: this.filterValue?.Date ?? '',
        toDate: this.filterValue?.toDate ?? '',
      carModel: this.filterValue?.search ?? '',
      cityId: this.filterValue?.city ?? '',
      branchId: this.BranchIdFilter ?? '',
    }).subscribe((res) => {
      const total = res.cars.reduce(
        (sum: number, car: any) => sum + car.count,
        0
      );

      this.carBrands = res.cars.map((car: any) => {
        const percentage = total > 0 ? (car.count / total) * 100 : 0;

        return {
          ...car,
          percentage: +percentage.toFixed(0),
        };
      });

      const sortedCars = [...this.carBrands]
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);

      const componentStyles = [
        { color: '#F99C30', position: { top: 30, left: 65 }, size: 150 },
        { color: '#2FBFDE', position: { top: 50, left: 25 }, size: 112 },
        { color: '#6463D6', position: { top: 20, left: 35 }, size: 100 },
      ];

      this.components = sortedCars.map((car, index) => ({
        make: car.make,
        percentage: car.percentage,
        color: componentStyles[index].color,
        size: componentStyles[index].size,
        position: componentStyles[index].position,
      }));

      this.spinner.hide();

      this.cdr.detectChanges();
    });
  }

  getvisitHours() {
    this.FirstTabService.getvisitHours({
      branchId: this.BranchIdFilter ?? '',
      brandId: this.BrandIdFilter ?? '',
      fromDate: this.filterValue?.Date ?? '',
        toDate: this.filterValue?.toDate ?? '',
      carModel: this.filterValue?.search ?? '',
      cityId: this.filterValue?.city ?? '',
    }).subscribe((res) => {
      this.spinner.show();

      this.hourRows = res.visitHours.map((hour: any) => {
        let density = '';

        if (hour.visitCount > 40) {
          density = 'density-high';
        } else if (hour.visitCount > 20) {
          density = 'density-medium';
        } else {
          density = 'density-low';
        }

        return {
          ...hour,
          density,
        };
      });

      this.peakHour = res.peakHour;
      this.totalVisits = res.totalVisits;
      this.averageWaitingTime=res.averageWaitingTime;

      this.maxVisitCount = Math.max(
        ...this.hourRows.map((h: { visitCount: any }) => h.visitCount)
      );
      this.spinner.hide();
      this.cdr.detectChanges();
    });
  }

  getColors() {
    this.spinner.show();

    this.FirstTabService.carColors({
      branchId: this.BranchIdFilter ?? '',
      brandId: this.BrandIdFilter ?? '',
      fromDate: this.filterValue?.Date ?? '',
      toDate: this.filterValue?.toDate ?? '',
      carModel: this.filterValue?.search ?? '',
      cityId: this.filterValue?.city ?? '',
    }).subscribe((res) => {
      if (!res || !res.carColors) return;

      const colors = res.carColors;
      const totalCount = res.carColors.length || 0;

      const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };

      const chartColors = colors.map((c: any) => {
        const chartColor =
          c.color.toLowerCase() === 'black'
            ? '#000000'
            : c.color.toLowerCase() === 'white'
            ? '#FFFFFF'
            : c.color.toLowerCase() === 'red'
            ? '#e74c3c'
            : c.color.toLowerCase() === 'blue'
            ? '#4285f4'
            : c.color.toLowerCase() === 'yellow'
            ? '#f1c40f'
            : c.color.toLowerCase() === 'silver'
            ? '#95a5a6'
            : getRandomColor();

        return {
          ...c,
          chartColor,
          percentage: +(c.percentage * 100).toFixed(2),
        };
      });

      this.carsColor = chartColors;
      this.totalCars = totalCount;
      this.setupChartData();

      const sortedColors = [...chartColors].sort(
        (a: any, b: any) => b.count - a.count
      );
      this.topThreeColors = sortedColors.slice(0, 3);

      const medals = [
        { icon: 'assets/imgs/zalol/smart/gold-medal.png' },
        { icon: 'assets/imgs/zalol/smart/silver-medal.png' },
        { icon: 'assets/imgs/zalol/smart/bronze-medal.png' },
      ];

      this.topThreeColors = this.topThreeColors.map(
        (color: any, index: number) => ({
          ...color,
          medalIcon: medals[index]?.icon,
          // medalLabel: medals[index]?.label
        })
      );

      this.spinner.hide();
      this.cdr.detectChanges();
    });
  }

  public pieChartData: ChartData<'doughnut', number[], string> = {
    datasets: [
      {
        data: [35, 25, 17, 13, 10],
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
        position: 'bottom',
        display: false,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: { size: 14 },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value}%`;
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
    this.getCarBrands();
    this.getvisitHours();
    this.getColors();

    // this.spinner.hide()
    console.log(this.currentLang);


  }

  getSvgColor(color: string): string {
    if (!color) return '#ccc';
    const normalized = color.trim().toLowerCase();

    if (normalized === '#ffffff' || normalized === 'white') {
      return '#ccc';
    }
    const isValidColor = this.isValidCssColor(normalized);
    return isValidColor ? color : '#ff0000';
  }

  private isValidCssColor(color: string): boolean {
    const s = new Option().style;
    s.color = color;
    return s.color !== '';
  }

  private setupChartData(): void {
    this.pieChartData = {
      labels: this.carsColor.map(
        (color: any) => `${color.color} | ${color.color}`
      ),
      datasets: [
        {
          data: this.carsColor.map((color: any) => color.percentage),
          backgroundColor: this.carsColor.map((color: any) => color.chartColor),
          hoverBackgroundColor: this.carsColor.map((color: any) =>
            this.lightenColor(color.chartColor, 20)
          ),
          borderColor: '#ffffff',
          borderWidth: 3,
          hoverBorderWidth: 5,
          hoverOffset: 15,
        },
      ],
    };
  }

  //  method to lighten colors for hover effect
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



  brandLogos: any = {
  ford: 'assets/imgs/zalol/smart/ford.png',
  bmw: 'assets/imgs/zalol/smart/bmw.png',
  honda: 'assets/imgs/zalol/smart/honda.png',
  toyota: 'assets/imgs/zalol/smart/toyota.png',
  mercedes: 'assets/imgs/zalol/smart/marceds.png',
  mazda: 'assets/imgs/zalol/smart/mazda.png',
  kia: 'assets/imgs/zalol/smart/kia.png',
  nissan: 'assets/imgs/zalol/smart/nissan.png'

};

getBrandLogo(make: string) {
  return this.brandLogos[make?.toLowerCase()] || 'assets/imgs/zalol/smart/default.jpg';
}

}
