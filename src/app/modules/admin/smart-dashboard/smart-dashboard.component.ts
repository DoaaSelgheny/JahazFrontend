import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilterComponent } from './filter/filter.component';
import { BrandService } from 'src/app/services/api/brand.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BranchManagerService } from 'src/app/services/api/branch-manager.service';
import { ManageCustomersService } from 'src/app/services/api/manage-customers.service';
import { RequestTrackerService } from 'src/app/services/requestTrack.service';
import { AuthService } from '../../auth/services/auth.service';
import { Constants } from 'src/app/services/Constants/constants';

@Component({
  selector: 'app-smart-dashboard',
  templateUrl: './smart-dashboard.component.html',
  styleUrls: ['./smart-dashboard.component.scss'],
})
export class SmartDashboardComponent implements OnInit {
  tab = 'dashboard';
  formValue: any;
  BrandId: any = '';
  brands: any;
  branchs: any[] = [];
  // Branch: any = '';
  Branch: any | null = null;
  dropdownSettings = {};
  dropdownSettingBranch = {};
  currentUser: any;
   roles=Constants.AllRoles
  constructor(
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
    private brandService: BrandService,
    private spinner: NgxSpinnerService,
        private authService: AuthService,
    private requestTracker:RequestTrackerService,
    private branchManagerService: BranchManagerService,
    private manageCustomersService:ManageCustomersService
  ) {}

  ngOnInit(): void {
        this.currentUser = this.authService.getCurrentUser();
    this.initDropDownList();
     if (this.currentUser.roles[0] !== Constants.AllRoles.ThalolBranchDirector) {
       this.getBrands();
      }else{
       this.Branch = null;
      }
  
    console.log(this.formValue);


  }
  getData() {}
  changeTab(tab: any) {
    this.tab = tab;
    this.cdr.detectChanges();
  }
  initDropDownList() {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      searchPlaceholderText: this.BrandId,
    };
    this.dropdownSettingBranch = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      searchPlaceholderText: this.Branch,
    };
  }

  openFilter() {
    const dialogRef = this.modalService.open(FilterComponent, {});
       console.log(this.formValue)
    if(this.formValue&&this.formValue.Date)
    {
          this.formValue.Date=this.formValue.Date.slice(0,10);
    }
    if(this.formValue&&this.formValue.toDate)
    {
          this.formValue.toDate=this.formValue.toDate.slice(0,10);
    }
    dialogRef.componentInstance.data = this.formValue;
    dialogRef.result
      .then((result) => {
        if (result) {
          this.formValue = result;
          this.cdr.detectChanges();
          console.log('Modal closed with value:', result);
        }
      })
      .catch((reason) => {
        console.log('Modal dismissed:', reason);
      });
  }


  getBrands() {
  this.brandService.getAllBrands().subscribe(res => {
    this.brands = res;
      this.spinner.hide();
    if (this.brands.length > 0) {
      this.BrandId = this.brands[0].id;
      this.changeBrand(this.BrandId);
    }
      this.cdr.detectChanges();
  });
}


  // getBranchs(id: any) {
  //   this.branchManagerService.getBranchByBrand(id).subscribe({
  //     next: (next) => {
  //       this.branchs = next;
  //       this.cdr.detectChanges();
  //     },
  //   });
  // }



getBranchs(id: any) {
  this.branchManagerService.getBranchByBrand(id).subscribe({
    next: (res) => {
      this.branchs = res;
      this.spinner.hide();

      this.Branch = null;

      this.cdr.detectChanges();
    },
    error: (err) => {
      this.spinner.hide();
      console.error(err);
    }
  });
}


  getExport() {
    this.spinner.show();
    this.manageCustomersService
      .getExcelExport({
     brandId:this.BrandId??'',
        branchId: this.Branch??'',
      fromDate:'',
         toDate:  '',
      carModel:'',
      cityId:'',
      })
      .subscribe({
        next: (res) => {
   this.downloadExcelFile(res);
//  window.open(this.requestTracker.lastRequestUrl);
          console.log(res);
          this.spinner.hide()
          this.cdr.detectChanges();

        },
        error: (err) => {
          this.spinner.hide();
        },
      });
  }

  downloadExcelFile(blob: any) {
    const excelBlob = new Blob([blob], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    const url = window.URL.createObjectURL(excelBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'file.xlsx'; // حددي الاسم
    a.click();
    URL.revokeObjectURL(url);
  }

  changeBrand(item: any) {
    this.getBranchs(item);
    this.getData();
  }

  rest() {
    this.BrandId = '';
    this.Branch ='';
  }
}


// function hideFn(value: any) {
//   throw new Error('Function not implemented.');
// }
