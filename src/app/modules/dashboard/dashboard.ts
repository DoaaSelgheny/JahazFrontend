import { Component } from '@angular/core';
import { ApexOptions } from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard {
  totalVisits = 408;
  avgStayMinutes = 271;
  fillTimeLabel = 'Soon';
  incompleteRecords = 190;

  longestStayVehicles = [
    { rank: 1, plate: '2228EBA', visits: 1, stayMin: 1080 },
    { rank: 2, plate: '92012991', visits: 1, stayMin: 1020 },
    { rank: 3, plate: '25305TB', visits: 1, stayMin: 960 },
    { rank: 4, plate: '16231JUA', visits: 1, stayMin: 900 },
    { rank: 5, plate: '78921KL', visits: 1, stayMin: 840 },
  ];

  visitsByHourOptions: ApexOptions;

  visitActivityOptions: ApexOptions;

  stayByVehicleOptions: ApexOptions;

  durationDonutOptions: ApexOptions & { series: number[] };

  constructor() {
    this.visitsByHourOptions = {
      series: [
        {
          name: 'Low (0-19)',
          data: [
            22, 25, 18, 17, 16, 19, 16, 15, 46, 14, 16, 15, 14, 16, 17, 18, 19,
            15,
          ],
        },
        {
          name: 'Medium (20-39)',
          data: [
            10, 12, 11, 12, 13, 10, 9, 10, 8, 11, 12, 11, 10, 11, 12, 13, 12,
            10,
          ],
        },
        {
          name: 'High (40+)',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      ],
      chart: {
        type: 'bar',
        height: 320,
        stacked: true,
        toolbar: { show: false },
      },
      colors: ['#3B82F6', '#10B981', '#F59E0B'],
      plotOptions: { bar: { columnWidth: '45%', borderRadius: 6 } },
      dataLabels: { enabled: false },
      stroke: { show: false, width: 0 },
      xaxis: {
        categories: [
          '00:00',
          '03:00',
          '06:00',
          '07:00',
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
          '19:00',
          '20:00',
          '21:00',
        ],
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
      series: [
        { name: 'Visits', data: [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 5, 4, 1] },
      ],
      chart: { type: 'line', height: 320, toolbar: { show: false } },
      colors: ['#2563EB'],
      stroke: { curve: 'smooth', width: 3 },
      dataLabels: { enabled: false },
      xaxis: {
        categories: [
          'Mar 10',
          'Mar 11',
          'Mar 12',
          'Mar 13',
          'Mar 14',
          'Mar 15',
          'Mar 16',
          'Mar 17',
          'Mar 18',
          'Mar 19',
          'Mar 20',
          'Mar 21',
          'Mar 22',
          'Mar 23',
        ],
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
      series: [
        {
          name: 'Avg Stay (min)',
          data: [160, 240, 150, 320, 360, 280, 90, 70, 40],
        },
      ],
      chart: { type: 'bar', height: 360, toolbar: { show: false } },
      colors: ['#3B82F6'],
      plotOptions: {
        bar: { horizontal: false, columnWidth: '45%', borderRadius: 6 },
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2 },
      xaxis: {
        categories: [
          'Tractor-trailer',
          'Van-trailer',
          'Sedan',
          'Sedan-standard',
          'Car-standard',
          'Taxi-bus-commercial',
          'Sedan-standard',
          'Motorcycle',
          'Other',
        ],
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
      series: [35, 25, 25, 15],
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

    (this.durationDonutOptions as any).colors = [
      '#3B82F6',
      '#10B981',
      '#F59E0B',
      '#EF4444',
    ];

    (this.durationDonutOptions as any).plotOptions = {
      pie: {
        donut: { size: '70%' },
      },
    };

    (this.durationDonutOptions as any).dataLabels = {
      enabled: true,
      formatter: (_: any, opts: any) => {
        const series = opts.w.globals.series;
        const total = series.reduce((a: number, b: number) => a + b, 0);
        const value = series[opts.seriesIndex];
        const pct = (value / total) * 100;
        return pct.toFixed(1) + '%';
      },
    };
  }
}
