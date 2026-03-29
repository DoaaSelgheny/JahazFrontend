import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BranchManagerService } from 'src/app/services/api/branch-manager.service';
import { BrandService } from 'src/app/services/api/brand.service';
import { WelcomeMessageService } from 'src/app/services/api/welcome-message.service';
// import * as CryptoJS from 'crypto-js';
// import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-welcome-message-management',
  templateUrl: './welcome-message-management.component.html',
  styleUrls: ['./welcome-message-management.component.scss'],
})
export class WelcomeMessageManagementComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private branchManagerService: BranchManagerService,
    private spinner: NgxSpinnerService,
    private brandService: BrandService,
    private welcomeMessageService: WelcomeMessageService,
    private router: Router
  ) {}

  totalCount: number;
  searchText: string = '';
  page: number = 1;
  pageSize: number = 10;
  allCashiers: any[] = [];
  filterObj = this.initFilterObj();
  brands: any[] = [];
  branchs: any[] = [];
  Branch: any;
  BrandId: any;
  Email: string = '';
  public lang: string = String(localStorage.getItem('language'));
  fromSearchInput: boolean = false;
  dropdownSettings = {};
  dropdownSettingBranch = {};

  ngOnInit(): void {
    this.initDropDownList();
    this.getBrands();
    this.getData();
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
  getBrands() {
    this.brandService.getAllBrands().subscribe((res) => {
      this.brands = res;
      this.spinner.hide();
      this.cdr.detectChanges();
    });
  }
  changeBrand(item: any) {
    this.BrandId = item.id;

    this.getData();
    this.getBranchs(item.id);
  }
  getBranchs(id: any) {
    this.branchManagerService.getBranchByBrand(id).subscribe({
      next: (next) => {
        this.branchs = next;
        this.cdr.detectChanges();
      },
    });
  }
  getData() {
    if (!this.fromSearchInput) {
      this.spinner.show();
    }
    const startIndex = (this.page - 1) * this.pageSize;
    this.filterObj.SkipCount = startIndex;
    this.filterObj.MaxResultCount = this.pageSize;
    this.filterObj.BranchDirector = this.Email;

    let myObj: any = { ...this.filterObj };

    if (this.BrandId) {
      myObj.BrandId = this.BrandId;
    }
    if (this.Branch && this.Branch?.length) {
      myObj.BranchId = this.Branch?.[0].id;
    }

    this.welcomeMessageService.getAllMessage(myObj).subscribe((res) => {
//
this.allCashiers = res.items;
// let dd=res.items.map((i:any)=>i.encID=CryptoJS.AES.encrypt(i.id.toString(), environment.key_enc_js).toString())
// console.log(dd,"FFFFFFFFFFFFFFFfff");

      this.spinner.hide();
      this.totalCount = res.totalCount;
      this.spinner.hide();
      this.cdr.detectChanges();
    });
  }

  initFilterObj() {
    return {
      Sorting: 'id',
      SkipCount: 0,
      MaxResultCount: this.pageSize,
      BranchDirector: this.Email,
    };
  }
  view(item: any) {
    this.router.navigate(['admin/review-welcome-message/', item.id]);
  }
  edit(item: any) {
    this.router.navigate(['admin/welcome-message/', item.id]);
  }
  add() {
    this.router.navigate(['admin/welcome-message/', 0]);
  }
  welcomeScreen(id: any) {
    // let encid= CryptoJS.AES.encrypt(id.toString(), environment.key_enc_js).toString();
    // this.router.navigate(['welcome/', encid]);
  }
}
function hideFn(value: any) {
  throw new Error('Function not implemented.');
}
