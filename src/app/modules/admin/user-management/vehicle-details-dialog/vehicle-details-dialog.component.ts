import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageRequestsService } from 'src/app/services/api/manage-requests.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';
@Component({
  selector: 'app-vehicle-details-dialog',
  templateUrl: './vehicle-details-dialog.component.html',
  styleUrls: ['./vehicle-details-dialog.component.scss']
})
export class VehicleDetailsDialogComponent implements OnInit {


  items:any
  filterObj = this.initFilterObj();
  page: number = 1;
  pageSize: number = 10;
  totalCount: number;
  overViews:any;
  average: number = 0;

    @Input() data: any;
    // @Input() cards: any;
    public chartOptions:any;
    cards:any;

  activeTab: 'overview' | 'history' = 'overview';

  constructor(public activeModal: NgbActiveModal,
        private _UserManagementService: ManageRequestsService,
    private spinner: NgxSpinnerService,
        private cdr: ChangeDetectorRef,


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

  getVists()
  {
    this.spinner.show();

          const startIndex = (this.page - 1) * this.pageSize;
    this.filterObj.SkipCount = startIndex;
    this.filterObj.MaxResultCount = this.pageSize;
    this.filterObj.Search = this.data?.carNumber;

    let myObj: any = { ...this.filterObj };



    this._UserManagementService.getAllVists(myObj).subscribe((res=>{
      this.items=res.items;

            this.totalCount = res.totalCount;
      this.spinner.hide();
      this.cdr.detectChanges();
    }))
  }

  getCards()
  {
    const input:any={
      carNumber:this.data?.carNumber
    }

    this._UserManagementService.getCards(input).subscribe((res=>{
      this.cards=res;

    }))
  }

  getOverView()
  {
    this._UserManagementService.getOverView(this.data?.carNumber).subscribe((res=>{
      this.overViews=res

    }))
  }



  // getLastVists()
  // {
  //       this._UserManagementService.getLastVists(this.data?.carNumber).subscribe((res=>{
  //     console.log(res);

  //   }))
  // }

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
  initFilterObj() {
    return {
      Sorting: 'id',
      SkipCount: 0,
      MaxResultCount: this.pageSize,
      Search: this.data?.carNumber,
    };
  }
  ngOnInit(): void {
    this.getVists();
  this.getCards();
  this.getOverView();
  this.getLastVists()


  }
}
