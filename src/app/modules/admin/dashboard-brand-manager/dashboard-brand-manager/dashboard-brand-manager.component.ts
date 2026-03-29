import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BrandManagerService } from 'src/app/services/api/brand-manager.service';

@Component({
  selector: 'app-dashboard-brand-manager',
  templateUrl: './dashboard-brand-manager.component.html',
  styleUrls: ['./dashboard-brand-manager.component.scss']
})
export class DashboardBrandManagerComponent implements OnInit {
  allBranch: any[] = [];
  totalCars: any;
  totalCarsInMonth: any;
  totalCarsInWeek: any;
  averageWaitingTime:any;
  page: number = 1;
  pageSize: number = 6;
  BranchId:any='';
  allRequests:any[]=[];
  filterObj = this.initFilterObj();
  constructor(
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private brandmanagerService: BrandManagerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBranchs();
   this.getAllData();
  }
  initFilterObj() {
    return {
      BranchId:this.BranchId,
      Sorting: 'id',
      SkipCount: 0,
      MaxResultCount: this.pageSize,
    };
  }
  getBranchs() {
    this.brandmanagerService.getDirectorBranches().subscribe({
      next:next=>{
        this.allBranch = next
        this.cdr.detectChanges()
      }
    })
  }
  getAllData() {
    this.spinner.show();
    const startIndex = (this.page - 1) * this.pageSize;
    this.filterObj.SkipCount = startIndex;
    this.filterObj.MaxResultCount = this.pageSize;
    this.filterObj.BranchId = this.BranchId;
    let myObj: any = { ...this.filterObj };
    let myObjData:any={
      BranchId:this.BranchId,
    }
    this.brandmanagerService.getRequests(myObj).subscribe({
      next:next=>{
        this.allRequests = next.items;
       
        this.brandmanagerService.getDataStatistics(myObjData).subscribe({
          next:nextData=>{
           this.totalCars=nextData.totalCars;
           this.totalCarsInMonth=nextData.totalCarsInMonth;
           this.totalCarsInWeek=nextData.totalCarsInDay;
           this.averageWaitingTime= parseFloat( nextData.averageWaitingTime).toFixed(2);
           
           this.spinner.hide();
            this.cdr.detectChanges()
          }
        }) 
        this.cdr.detectChanges()
      }
    })
   
  }
  
  goToBranch() {
    this.router.navigate(['admin/manage-requests']);
  }
}
