import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from 'src/app/modules/SharedComponent/SharedComponent/confirmation-dialog/confirmation-dialog.service';
import { BranchesService } from 'src/app/services/api/branches.service';
import { BrandService } from 'src/app/services/api/brand.service';
import { ActivationState } from 'src/app/services/enums/cashiers.enum';
import { FoodicsDetailsComponent } from './foodics-details/foodics-details.component';
import { Constants } from 'src/app/services/Constants/constants';
import { AuthService } from 'src/app/modules/auth';
import { IntegrationWay } from 'src/app/services/enums/IntegrationWay.enum';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent implements OnInit {
  Constants = Constants;
  currentUser: any;

  roles: any;

  constructor(
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private brandService: BrandService,
    private confirmationDialogService: ConfirmationDialogService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    public authService: AuthService

  ) {}
  showPage: boolean;
  brands: any[] = [];
  totalCount: number;
  page: number = 1;
  pageSize: number = 10;
  filterObj = this.initFilterObj();
  activationState = ActivationState;
  IntegrationWay = IntegrationWay;

  hasAccess:boolean;
  ngOnInit(): void {
    this.roles = Constants.AllRoles;
    this.authService.getcurrentUser().subscribe((res) => {
      this.currentUser = res.currentUser;
      console.log(this.currentUser['roles'][0])
      if(
        (this.currentUser['roles'][0] == Constants.AllRoles.ThalolBrandDirector )||
       ( this.currentUser['roles'][0] == Constants.AllRoles.ThalolBusinessOperation) ||
        (this.currentUser['roles'][0] == Constants.AllRoles.ThalolSuperAdmin)

      ){
        this.hasAccess = true
        this.cdr.detectChanges()
      }else{
        this.hasAccess = false
        this.cdr.detectChanges()

      }
      console.log( this.hasAccess)

    })
    this.getBrands();
  }

  initFilterObj() {
    return {
      Sorting: 'id',
      SkipCount: 0,
      MaxResultCount: this.pageSize,
    };
  }

  getBrands() {
    const startIndex = (this.page - 1) * this.pageSize;
    this.filterObj.SkipCount = startIndex;
    this.filterObj.MaxResultCount = this.pageSize;
    this.brandService.getLastBrands(this.filterObj).subscribe((res) => {
      this.brands = res.items;

      this.totalCount = res.totalCount;
      this.showPage = true;
      this.spinner.hide();
      this.cdr.detectChanges();
            console.log('بيانات البراند بعد الحفظ:', res);

    });
  }
  changState(branch: any) {
    let oldVal = branch.state;
    branch.state =
      branch.state == this.activationState.Active
        ? this.activationState.Inactive
        : this.activationState.Active;

    this.confirmationDialogService
      .confirm(
        oldVal === this.activationState.Active
          ? this.translate.instant('brands.confirmCancelBranch')
          : this.translate.instant('brands.confirmactivationBranch'),
        oldVal === this.activationState.Active
          ? this.translate.instant('brands.confirmationMessageCancelation')
          : this.translate.instant('brands.confirmationMessageActivation'),
        '',
        false
      )
      .then(
        (confirmed: any) => {
          this.spinner.show();
          let Obj = { id: branch.id, state: branch.state };
          if (confirmed) {
            this.brandService.setBrandActivationState(Obj).subscribe(
              (data) => {
                this.spinner.hide();
                this.toastr.success(
                  this.translate.instant('brands.changeBranchStatus')
                );
                this.getBrands();
              },
              (err) => {
                this.spinner.hide();
                this.toastr.error(err.error.error.message);
              }
            );
          } else {
            branch.state = oldVal;
            this.getBrands();
            this.cdr.detectChanges();
          }
        },
        () => {
          branch.state = oldVal;
          this.getBrands();
          this.cdr.detectChanges();
        }
      );
  }
  openFoodics(id:any,foodicsData:string,integrationWay:number,type:string , syrveHost?: string, syrvePassword?: string) {
    const modalRef = this.modalService.open(FoodicsDetailsComponent, {
      size: 'md',
      backdrop: 'static',
      centered: true,
    });
    console.log('openFoodics:', {
  id,
  foodicsData,
  integrationWay,
  type,
  syrveHost,
  syrvePassword
});

    modalRef.componentInstance.id = id;
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.foodicsData = foodicsData;
    modalRef.componentInstance.integrationWay = integrationWay;

  modalRef.componentInstance.syrveUsername = syrveHost ?? '';
  modalRef.componentInstance.syrvePassword = syrvePassword ?? '';

    modalRef.result.then(hideFn, hideFn).catch((result) => {
      this.getBrands();
    });
  }
}
function hideFn(value: any) {
  throw new Error('Function not implemented.');
}

