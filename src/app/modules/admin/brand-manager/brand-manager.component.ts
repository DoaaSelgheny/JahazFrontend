import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ViewMoreBranchesComponent } from '../manage-cashier/view-more-branches/view-more-branches.component';
import { ViewCashierComponent } from '../manage-cashier/view-cashier/view-cashier.component';
import { CahierStatus } from 'src/app/services/enums/cashiers.enum';
import { BrandService } from 'src/app/services/api/brand.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddBrandManagerComponent } from './add-brand-manager/add-brand-manager.component';
import { ManageBranchDirectorService } from 'src/app/services/api/manage-branch-director';
import { ViewBrandManagerComponent } from './view-brand-manager/view-brand-manager.component';

@Component({
  selector: 'app-brand-manager',
  templateUrl: './brand-manager.component.html',
  styleUrls: ['./brand-manager.component.scss'],
})
export class BrandManagerComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private manageBranchDirectorService: ManageBranchDirectorService,
    private spinner: NgxSpinnerService,
    private brandService: BrandService,
    private modalService: NgbModal
  ) {}

  totalCount: number;
  searchText: string = '';
  page: number = 1;
  pageSize: number = 10;
  allCashiers: any[] = [];
  filterObj = this.initFilterObj();
  brands: any[] = [];
  Branch: any;
  BrandId: any;
  Text: string = '';
  public lang: string = String(localStorage.getItem('language'));
  fromSearchInput: boolean = false;
  dropdownSettings = {};
  dropdownSettingBranch = {};
  cashierState = CahierStatus;
  State: string = '';
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
  }

  getData() {
    if (!this.fromSearchInput) {
      this.spinner.show();
    }
    const startIndex = (this.page - 1) * this.pageSize;
    this.filterObj.SkipCount = startIndex;
    this.filterObj.MaxResultCount = this.pageSize;
    this.filterObj.Text = this.Text;

    let myObj: any = { ...this.filterObj };

    if (this.BrandId) {
      myObj.BrandId = this.BrandId;
    }
    if (this.Branch && this.Branch?.length) {
      myObj.BranchId = this.Branch?.[0].id;
    }
    if (this.State) {
      myObj.State = this.State;
    }

    this.manageBranchDirectorService
      .getAllBranchDirector(myObj)
      .subscribe((res) => {
        this.allCashiers = res.items;
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
      Text: this.Text,
    };
  }

  viewUserModal(item: any) {
    const modalRef = this.modalService.open(ViewBrandManagerComponent, {
      size: 'md',
      backdrop: 'static',
      centered: true,
    });
    modalRef.componentInstance.data = item;
  }

  addBrandManagerModel() {
    const modalRef = this.modalService.open(AddBrandManagerComponent, {
      size: 'md',
      backdrop: 'static',
      centered: true,
    });

    modalRef.result.then(hideFn, hideFn).catch((result) => {
      this.getData();
    });
  }
  viewMore(branches: any) {
    const modalRef = this.modalService.open(ViewMoreBranchesComponent, {
      size: 'sm',
      backdrop: 'static',
      centered: true,
    });
    modalRef.componentInstance.isBrand = true;
    modalRef.componentInstance.data = branches;
  }
}
function hideFn(value: any) {
  throw new Error('Function not implemented.');
}
