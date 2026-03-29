import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BranchesService } from 'src/app/services/api/branches.service';
import { BrandService } from 'src/app/services/api/brand.service';
import { CategoryService } from 'src/app/services/api/category.service';
import { Constants } from 'src/app/services/Constants/constants';
import { ActivationState } from 'src/app/services/enums/cashiers.enum';
import { AuthService } from '../../auth';
import { ConfirmationDialogService } from '../../SharedComponent/SharedComponent/confirmation-dialog/confirmation-dialog.service';
import { AddCategoryComponent } from '../category-management/add-category/add-category.component';
import { ViewDescriptionComponent } from '../category-management/view-description/view-description.component';
import { RedeemPointsService } from 'src/app/services/api/redeem-points.service';
import { AddRedeemPointsComponent } from './add-redeem-points/add-redeem-points.component';

@Component({
  selector: 'app-redeem-points-management',
  templateUrl: './redeem-points-management.component.html',
  styleUrls: ['./redeem-points-management.component.scss']
})
export class RedeemPointsManagementComponent implements OnInit {
 constructor(
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private redeemService: RedeemPointsService,
    private confirmationDialogService: ConfirmationDialogService,
    private modalService: NgbModal,
    private brandservice:BrandService
  ) {}

  dropdownSettings = {};
  activationState = ActivationState;
  showPage: boolean;
  roles = Constants.AllRoles;
  selectedItemsBrand: any;
  selectedItemsCities: any;
  selectedItemsCountry: any;
  currentUser: any;
  totalCount: number;
  searchText: string = '';
  page: number = 1;
  pageSize: number = 10;
  allRedeemPoints: any[] = [];
  brands: any[] = [];
  filterObj = this.initFilterObj();
  public lang: string = String(localStorage.getItem('language'));
  name = this.lang === 'ar' ? 'nameAr' : 'nameEn';
  fromSearchInput: boolean = false;

  searchName: string | undefined = this.lang === 'ar' ? 'بحث' : 'Search';

  ngOnInit(): void {
    this.roles = Constants.AllRoles;
    this.initDropDownList();
    this.getBrands();
    this.getAllRedeemPointsData();
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


  getAllRedeemPointsData() {
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

    this.redeemService.getAllRedeemPoints(myObj).subscribe((res) => {
      this.allRedeemPoints = res.items;
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
    const modalRef = this.modalService.open(AddRedeemPointsComponent, {
      size: 'md',
      backdrop: 'static',
      centered: true,
    });
    modalRef.componentInstance.id = data.id;
  }
  add() {
    const modalRef = this.modalService.open(AddRedeemPointsComponent, {
      size: 'md',
      backdrop: 'static',
      centered: true,
    });

    modalRef.result.then(hideFn, hideFn).catch((result) => {
      this.getAllRedeemPointsData();
    });
  }

}
function hideFn(reason: any): PromiseLike<never> {
  throw new Error('Function not implemented.');
}

