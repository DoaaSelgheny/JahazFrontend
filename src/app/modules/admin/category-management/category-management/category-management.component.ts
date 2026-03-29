import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/modules/auth';
import { ConfirmationDialogService } from 'src/app/modules/SharedComponent/SharedComponent/confirmation-dialog/confirmation-dialog.service';
import { BranchesService } from 'src/app/services/api/branches.service';
import { BrandService } from 'src/app/services/api/brand.service';
import { Constants } from 'src/app/services/Constants/constants';
import { ActivationState } from 'src/app/services/enums/cashiers.enum';
import { CategoryService } from 'src/app/services/api/category.service';
import { ViewDescriptionComponent } from '../view-description/view-description.component';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss']
})
export class CategoryManagementComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private branchesService: BranchesService,
    private authService: AuthService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private categoryService: CategoryService,
    private confirmationDialogService: ConfirmationDialogService,
    private modalService: NgbModal,
    private brandservice:BrandService
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
  allCategories: any[] = [];
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
    this.getBrands();
    this.getAllCategoriesData();
    this.authService.getcurrentUser().subscribe((res) => {
      this.currentUser = res.currentUser;
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


  getAllCategoriesData() {
    if (!this.fromSearchInput) {
      this.spinner.show();
    }
    const startIndex = (this.page - 1) * this.pageSize;
    this.filterObj.SkipCount = startIndex;
    this.filterObj.Name = this.searchText;
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

    this.categoryService.getAllCategories(myObj).subscribe((res) => {
      this.allCategories = res.items;
      this.showPage = true;
      this.spinner.hide();
      this.totalCount = res.totalCount;
      this.spinner.hide();
      this.cdr.detectChanges();
    });
  }

  getBrands() {
    this.brandservice.getAllBrands().subscribe((res) => {
      this.brands = res;
      this.spinner.hide();
      this.cdr.detectChanges();

    });
  }

  initFilterObj() {
    return {
      Name: this.searchText,
      Sorting: 'id',
      SkipCount: 0,
      MaxResultCount: this.pageSize,
    };
  }


  viewDesc(data: any) {
    const modalRef = this.modalService.open(ViewDescriptionComponent, {
      size: 'md',
      backdrop: 'static',
      centered: true,
    });
    modalRef.componentInstance.data = data;
  }
  edit(item: any) {
    const modalRef = this.modalService.open(AddCategoryComponent, {
      size: 'md',
      backdrop: 'static',
      centered: true,
    });
    modalRef.componentInstance.id = item.id;
    modalRef.componentInstance.data = item;


    modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
      this.getAllCategoriesData();
    });

  }
  add() {
    const modalRef = this.modalService.open(AddCategoryComponent, {
      size: 'md',
      backdrop: 'static',
      centered: true,
    });
    modalRef.componentInstance.totalCount = this.totalCount;

    modalRef.result.then(hideFn, hideFn).catch((result) => {
      this.getAllCategoriesData();
    });
    
  }
  delete(id: number) {
    this.confirmationDialogService
    .confirm(
      this.translate.instant('categoryManager.deleteConfirmation'),
      this.translate.instant('categoryManager.areYouSurDelete'),
      '',
      false
    )
    .then(
      (confirmed: any) => {
        this.spinner.show();
        let userstate = { id: id};
        if (confirmed) {
          this.categoryService.deleteCategory(id).subscribe({
            next: (next) => {
              this.spinner.hide();
              this.toastr.success(this.translate.instant('categoryManager.deletedSuccessfuly'));
              //page -- 
            if (this.allCategories.length === 1 && this.page > 1) {
              this.page--; 
            }
            // get all data 
            setTimeout(() => {
              this.getAllCategoriesData();
            }, 0); 

              this.getAllCategoriesData();

            },
            error: (error) => {
              this.spinner.hide();
              this.toastr.error(error.error.error.message);
            },
          });
        } else {
          this.getAllCategoriesData();
          this.cdr.detectChanges();
        }
      }
    );
  }
}
function hideFn(reason: any): PromiseLike<never> {
  throw new Error('Function not implemented.');
}

