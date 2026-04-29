import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';
import { OrderManagementService } from 'src/app/services/api/user-management.service';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { VehicleDetailsDialogComponent } from '../vehicle-details-dialog/vehicle-details-dialog.component';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private _UserManagementService: OrderManagementService,
    private translate: TranslateService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal
  ) {}
  dropdownSettingBranch={}
  Branch:any
  lang: string = String(localStorage.getItem('language'));
  BranchText: string | undefined = this.lang === 'ar' ? 'بحث' : 'Search';
  totalCount: number;
  searchText: string = '';
  Search:string='';
  page: number = 1;
  pageSize: number = 10;
  allUsers: any[] = [];
  filterObj = this.initFilterObj();
  branchs:any[] = [];
  fromSearchInput: boolean = false;
searchTimeout: any;

  ngOnInit(): void {
    // this.getBranchs()
    this.dropdownSettingBranch = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      searchPlaceholderText: this.BranchText,
    }
    this.getAllUsersData();

  }



  rest() {
    this.searchText = '';
    this.getAllUsersData();
  }
  getAllUsersData() {

    this.spinner.show();
    const startIndex = (this.page - 1) * this.pageSize;
    this.filterObj.SkipCount = startIndex;
    this.filterObj.search = this.searchText;
    this.filterObj.MaxResultCount = this.pageSize;
    let myObj: any = { ...this.filterObj };


    if (this.Branch && this.Branch?.length) {
      myObj.BranchId = this.Branch?.[0].id;
    }

    this._UserManagementService.getAllUsers(myObj).subscribe((res) => {
      this.allUsers = res.items;
      this.totalCount = res.totalCount;
      this.spinner.hide();
      this.cdr.detectChanges();
    });
  }


  initFilterObj() {
    return {
      search: this.searchText,
      Sorting: 'id',
      SkipCount: 0,
      MaxResultCount: this.pageSize,
    };
  }


  viewUserModal(item: any)
  {
    const modalRef = this.modalService.open(VehicleDetailsDialogComponent, {
      windowClass: 'right-side-modal',
      backdrop: true,
      keyboard: true,
    });

    modalRef.componentInstance.data = item;
  }

onSearchChange() {
  clearTimeout(this.searchTimeout);

  this.searchTimeout = setTimeout(() => {
    this.page = 1;

    // لو فاضي → رجّع كل الداتا
    if (!this.searchText) {
      this.getAllUsersData();
      return;
    }

    if (this.searchText.length < 3) {
      return;
    }
    this.getAllUsersData();

  }, 400);
}

  openModal(data:any) {
    const modalRef = this.modalService.open(AddUserModalComponent, {
      size: 'md',
      backdrop: 'static',
    });

    modalRef.result.then(hideFn, hideFn).catch((result) => {
      this.getAllUsersData();

    });
  }
}
function hideFn(value: any) {
  throw new Error('Function not implemented.');
}
