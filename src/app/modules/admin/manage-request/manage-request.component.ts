import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BranchesService } from 'src/app/services/api/branches.service';
import { BrandService } from 'src/app/services/api/brand.service';
import { CashiersService } from 'src/app/services/api/cashier.service';
import { ConfirmationDialogService } from '../../SharedComponent/SharedComponent/confirmation-dialog/confirmation-dialog.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageRequestsService } from 'src/app/services/api/manage-requests.service';
import { AddCashierComponent } from '../manage-cashier/add-cashier/add-cashier.component';
import { AddUserModalComponent } from '../user-management/add-user-modal/add-user-modal.component';
import { VehicleDetailsDialogComponent } from './vehicle-details-dialog/vehicle-details-dialog.component';

@Component({
  selector: 'app-manage-request',
  templateUrl: './manage-request.component.html',
  styleUrls: ['./manage-request.component.scss'],
})
export class ManageRequestComponent implements OnInit {
  constructor(
    private cdr: ChangeDetectorRef,
    private manageRequestsService: ManageRequestsService,
    private spinner: NgxSpinnerService,

    private confirmationDialogService: ConfirmationDialogService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  totalCount: number;
  searchText: string = '';
  page: number = 1;
  pageSize: number = 10;
  data: any[] = [];
  filterObj = this.initFilterObj();

  public lang: string = String(localStorage.getItem('language'));

  ngOnInit(): void {
    this.getData();
  }


toggleMenu(selectedItem: any) {
  this.data.forEach(item => {
    item.isOpen = item === selectedItem ? !item.isOpen : false;
  });
}


viewImages(item: any) {
  console.log('Images:', item);
}



viewDetails(item: any) {
  const modalRef = this.modalService.open(VehicleDetailsDialogComponent, {
    windowClass: 'right-side-modal',
    backdrop: true,
    keyboard: true,
  });

  modalRef.componentInstance.data = item;
}


  getData() {
    this.spinner.show();
    const startIndex = (this.page - 1) * this.pageSize;
    this.filterObj.SkipCount = startIndex;
    this.filterObj.MaxResultCount = this.pageSize;
    let myObj: any = { ...this.filterObj };
    this.manageRequestsService.getAllRequests(myObj).subscribe((res) => {
      this.data = res.items;
      this.spinner.hide();
      this.totalCount = res.totalCount;
      this.spinner.hide();
      this.cdr.detectChanges();
    });
  }
  openUserMangment(row?: any) {

      const modalRef = this.modalService.open(AddUserModalComponent, {
        size: 'md',
        backdrop: 'static',
      });
      modalRef.componentInstance.id = row.id;
      modalRef.componentInstance.notificationID = row.notificationId;
      modalRef.componentInstance.cameraNumber = row.cameraNumber;
      modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {

        if (receivedEntry === true) {
          this.getData();
        }
      });


  }
  initFilterObj() {
    return {
      Sorting: 'id',
      SkipCount: 0,
      MaxResultCount: this.pageSize,
    };
  }
}
function hideFn(value: any) {
  throw new Error('Function not implemented.');
}

