import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from 'src/app/modules/SharedComponent/SharedComponent/confirmation-dialog/confirmation-dialog.service';
import { BranchesService } from 'src/app/services/api/branches.service';
import { BrandService } from 'src/app/services/api/brand.service';
import { CahierStatus } from 'src/app/services/enums/cashiers.enum';
import { ViewBrachManagerComponent } from '../view-brach-manager/view-brach-manager.component';
import { AddBranchManagerComponent } from '../add-branch-manager/add-branch-manager.component';
import { BranchManagerService } from 'src/app/services/api/branch-manager.service';

@Component({
  selector: 'app-branch-manager-management',
  templateUrl: './branch-manager-management.component.html',
  styleUrls: ['./branch-manager-management.component.scss'],
})
export class BranchManagerManagementComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private branchManagerService: BranchManagerService,
    private spinner: NgxSpinnerService,
    private brandService: BrandService,
    private branchService: BranchesService,
    private confirmationDialogService: ConfirmationDialogService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private modalService: NgbModal
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
    this.filterObj.Text = this.Email;

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

    this.branchManagerService.getAllBranchManager(myObj).subscribe((res) => {
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
      Text: this.Email,
    };
  }
  changAccountState(player: any) {
    let oldVal = player.state;
    player.state =
      player.state == this.cashierState.Active
        ? this.cashierState.Inactive
        : this.cashierState.Active;

    this.confirmationDialogService
      .confirm(
        this.translate.instant('cashier.confirmModalTitle'),
        this.translate.instant('cashier.activeMessage'),
        '',
        false
      )
      .then(
        (confirmed: any) => {
          this.spinner.show();
          let userstate = { id: player.id, state: player.state };
          if (confirmed) {
            this.branchManagerService.changeStatus(userstate).subscribe({
              next: (next) => {
                this.spinner.hide();
                this.toastr.success(
                  this.translate.instant('cashier.changeAccountStatus')
                );
                this.getData();
              },
              error: (error) => {
                this.spinner.hide();
                this.toastr.error(error.error.error.message);
              },
            });
          } else {
            this.getData();
            this.cdr.detectChanges();
          }
        },
        () => {
          player.state = oldVal;
          this.getData();
          this.cdr.detectChanges();
        }
      );
  }
  viewUserModal(item: any) {
    const modalRef = this.modalService.open(ViewBrachManagerComponent, {
      size: 'md',
      backdrop: 'static',
      centered: true,
    });
    modalRef.componentInstance.data = item;
  }

  addUserModel() {
    const modalRef = this.modalService.open(AddBranchManagerComponent, {
      size: 'md',
      backdrop: 'static',
      centered: true,
    });

    modalRef.result.then(hideFn, hideFn).catch((result) => {
      this.getData();
    });
  }
}
function hideFn(value: any) {
  throw new Error('Function not implemented.');
}
