import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageRequestsService } from 'src/app/services/api/manage-requests.service';

@Component({
  selector: 'app-vehicle-details-dialog',
  templateUrl: './vehicle-details-dialog.component.html',
  styleUrls: ['./vehicle-details-dialog.component.scss']
})
export class VehicleDetailsDialogComponent implements OnInit {


  ngOnInit(): void {
    this.getLastVists()
  }

    @Input() data: any;
    @Input() cards: any;
    public chartOptions:any;
  average: number = 0;

  activeTab: 'overview' | 'history' = 'overview';

  constructor(public activeModal: NgbActiveModal,
            private _UserManagementService: ManageRequestsService,
  ) {}

  setTab(tab: any) {
    this.activeTab = tab;
  }
formatDuration(minutes: number): string {
  if (!minutes) return '0 min';

  if (minutes < 60) {
    return `${parseFloat(minutes.toFixed(2))} min`;
  }

  const hours = minutes / 60;
  return `${parseFloat(hours.toFixed(2))} h`;
}
    getLastVists() {
  this._UserManagementService.getLastVists(this.data?.carNumber).subscribe((res) => {

    // average
    this.average = res.averageDurationInMinutes;

    // y-axis data
    const durations = res.visits.map((v: any) => v.durationInMinutes);

const categories = res.visits.map((v: any) => `Visit ${v.id}`);

    this.chartOptions = {
      series: [
        {
          name: 'Stay Duration',
          data: durations
        }
      ],
      chart: {
        type: 'line',
        height: 300,
        toolbar: { show: false }
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      markers: {
        size: 6
      },
      xaxis: {
        categories: categories
      },
      yaxis: {
        title: {
          text: 'Minutes'
        }
      },
      colors: ['#3B82F6'], // نفس اللون الأزرق
      grid: {
        borderColor: '#e7e7e7',
        strokeDashArray: 4
      },
      dataLabels: {
        enabled: false
      },
      tooltip: {
        y: {
          formatter: (val:any) => `${val} min`
        }
      }
    };

  });
}

}
