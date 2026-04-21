import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageRequestsService } from 'src/app/services/api/manage-requests.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-vehicle-details-dialog',
  templateUrl: './vehicle-details-dialog.component.html',
  styleUrls: ['./vehicle-details-dialog.component.scss']
})
export class VehicleDetailsDialogComponent implements OnInit {
  ngOnInit(): void {
    this.getVists()
  }

  items:any
  filterObj = this.initFilterObj();
  page: number = 1;
  pageSize: number = 10;
  totalCount: number;


    @Input() data: any;
    @Input() cards: any;

  activeTab: 'overview' | 'history' = 'overview';

  constructor(public activeModal: NgbActiveModal,
        private _UserManagementService: ManageRequestsService,
    private spinner: NgxSpinnerService,
        private cdr: ChangeDetectorRef,

  ) {}

  setTab(tab: any) {
    this.activeTab = tab;
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
      console.log(this.items);

            this.totalCount = res.totalCount;
      this.spinner.hide();
      this.cdr.detectChanges();
    }))
  }

  initFilterObj() {
    return {
      Sorting: 'id',
      SkipCount: 0,
      MaxResultCount: this.pageSize,
      Search: this.data?.carNumber,
    };
  }

}
