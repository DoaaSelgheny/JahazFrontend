import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ViewUserComponent } from '../../user-management/view-user/view-user.component';
import { AddUserModalComponent } from '../../user-management/add-user-modal/add-user-modal.component';
import { BranchesService } from 'src/app/services/api/branches.service';
import { BrandService } from 'src/app/services/api/brand.service';
import { ViewCameraComponent } from '../view-camera/view-camera.component';
import { AuthService } from 'src/app/modules/auth';
import { Constants } from 'src/app/services/Constants/constants';
import { AddCameraComponent } from '../add-new-branch/add-camera/add-camera.component';
import { ConfirmationDialogService } from 'src/app/modules/SharedComponent/SharedComponent/confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ActivationState } from 'src/app/services/enums/cashiers.enum';

@Component({
  selector: 'app-branches-mangment',
  templateUrl: './branches-mangment.component.html',
  styleUrls: ['./branches-mangment.component.scss'],
})
export class BranchesMangmentComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private branchesService: BranchesService,
    private authService: AuthService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private brandService: BrandService,
    private confirmationDialogService: ConfirmationDialogService,
    private modalService: NgbModal
  ) {}

  dropdownSettings = {};
  activationState = ActivationState;
  showPage: boolean;
  roles = Constants.AllRoles;
  dropdownSettingsCountries = {};

  selectedItemsBrand: any;
  selectedItemsCities: any;
  selectedItemsCountry: any;
  currentUser: any;
  totalCount: number;
  searchText: string = ''; 
  page: number = 1;
  pageSize: number = 10;
  allbranches: any[] = [];
  brands: any[] = [];
  countries: any = [];
  cities: any = [];
  filterObj = this.initFilterObj();
  public lang: string = String(localStorage.getItem('language'));
  name = this.lang === 'ar' ? 'nameAr' : 'nameEn';
  fromSearchInput: boolean = false;

  searchName: string | undefined = this.lang === 'ar' ? 'بحث' : 'Search';

  ngOnInit(): void {
    this.roles = Constants.AllRoles;
    this.initDropDownList();
    this.initDropDownListCountries();
    this.getBrands();
    this.getCountry();
    this.getAllBranchesData();
    this.authService.getcurrentUser().subscribe((res) => {
      this.currentUser = res.currentUser;
    });
  }

  getCountry() {
    this.brandService.getAllCountries().subscribe((res) => {
      this.countries = res;

      this.cdr.detectChanges();
    });
  }
  getCitites(countryId: number) {
    this.brandService.getAllCitites(countryId).subscribe((res) => {
      this.cities = res;
      this.spinner.hide();
      this.cdr.detectChanges();
    });
  }

  initDropDownList() {
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      searchPlaceholderText: this.searchName,
    };
  }

  initDropDownListCountries() {
    this.dropdownSettingsCountries = {
      singleSelection: true,
      idField: 'id',
      textField: this.name,
      itemsShowLimit: 3,
      allowSearchFilter: true,
      searchPlaceholderText: this.searchName,
    };
  }

  onItemSelectCountry(item: any) {
    this.getCitites(item.id);
  }

  removeCities() {
    this.selectedItemsCities = [];
    this.cities = [];
  }

  getAllBranchesData() {
    if (!this.fromSearchInput) {
      this.spinner.show();
    }
    const startIndex = (this.page - 1) * this.pageSize;
    this.filterObj.SkipCount = startIndex;
    this.filterObj.branch = this.searchText;
    this.filterObj.MaxResultCount = this.pageSize;

    let myObj: any = { ...this.filterObj };

    if (this.selectedItemsBrand && this.selectedItemsBrand?.length) {
      myObj.BrandId = this.selectedItemsBrand?.[0].id;
    }
    if (this.selectedItemsCities && this.selectedItemsCities?.length) {
      myObj.CityId = this.selectedItemsCities?.[0].id;
    }
    if (this.selectedItemsCountry && this.selectedItemsCountry?.length) {
      myObj.CountryId = this.selectedItemsCountry?.[0].id;
    }

    this.branchesService.getAllBranches(myObj).subscribe((res) => {
      this.allbranches = res.items;
      this.showPage = true;
      this.spinner.hide();
      this.totalCount = res.totalCount;
      this.spinner.hide();
      this.cdr.detectChanges();
    });
  }

  getBrands() {
    this.brandService.getAllBrands().subscribe((res) => {
      this.brands = res;
      this.spinner.hide();
      this.cdr.detectChanges();
    });
  }

  initFilterObj() {
    return {
      branch: this.searchText,
      Sorting: 'id',
      SkipCount: 0,
      MaxResultCount: this.pageSize,
    };
  }

  changAccountState(branch: any) {
    let oldVal = branch.state;
    branch.state =
      branch.state == this.activationState.Active
        ? this.activationState.Inactive
        : this.activationState.Active;

    this.confirmationDialogService
      .confirm(
        oldVal === this.activationState.Active
          ? this.translate.instant('branches.cancelationTitle')
          : this.translate.instant('branches.activationTitle'),
        oldVal === this.activationState.Active
          ? this.translate.instant('branches.CancelationMessage')
          : this.translate.instant('branches.activationMessage'),
        '',
        false
      )
      .then(
        (confirmed: any) => {
          this.spinner.show();
          let Obj = { id: branch.id, state: branch.state };
          if (confirmed) {
            this.branchesService.setBranchActivationState(Obj).subscribe(
              (data) => {
                this.spinner.hide();
                this.toastr.success(
                  this.translate.instant('branches.statusDone')
                );
                this.getAllBranchesData();
              },
              (err) => {
                this.spinner.hide();
                this.toastr.error(err.error.error.message);
              }
            );
          } else {
            branch.state = oldVal;
            this.getAllBranchesData();
            this.cdr.detectChanges();
          }
        },
        () => {
          branch.state = oldVal;
          this.getAllBranchesData();
          this.cdr.detectChanges();
        }
      );
  }
  viewUserModal(data: any) {
    const modalRef = this.modalService.open(ViewUserComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = data;
  }
  openModal(data: any) {
    const modalRef = this.modalService.open(AddUserModalComponent, {
      size: 'md',
      backdrop: 'static',
    });

    modalRef.result.then(hideFn, hideFn).catch((result) => {
      this.getAllBranchesData();
    });
  }
  viewCameras(id: number, brandname: any, cameras: any) {
    if (
      this.currentUser.roles[0] === this.roles.ThalolSuperAdmin ||
      this.currentUser.roles[0] === this.roles.ThalolBusinessOperation
    ) {
      const modalRef = this.modalService.open(AddCameraComponent, {
        size: 'md',
        backdrop: 'static',
      });

      modalRef.componentInstance.isAdmin = true;
      modalRef.componentInstance.id = id;
      modalRef.componentInstance.brandname = brandname;
    } else {
      const modalRef = this.modalService.open(ViewCameraComponent, {
        size: 'md',
        backdrop: 'static',
      });

      modalRef.componentInstance.id = id;
      modalRef.componentInstance.brandname = brandname;
    }
  }
}
function hideFn(value: any) {
  throw new Error('Function not implemented.');
}
