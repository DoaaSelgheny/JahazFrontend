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
import { TruckImagesComponent } from './truck-images/truck-images.component';

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
  cards:any;
  vists:any[]=[];
  Search:string='';
makeCar:any;
selectedCarMake: string = '';
fromDate: string = '';
toDate: string = '';

  public lang: string = String(localStorage.getItem('language'));

  ngOnInit(): void {
    this.getCard();
    this.getVists();
    this.getcarMakeModel();
    }


toggleMenu(selectedItem: any) {
  this.vists.forEach(item => {
    item.isOpen = item === selectedItem ? !item.isOpen : false;
  });
}


onCarMakeChange() {
  this.page = 1;
  this.getVists();
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
  modalRef.componentInstance.cards = this.cards;
}


TruckImages(item: any) {
  const modalRef = this.modalService.open(TruckImagesComponent, {
    windowClass: 'right-side-modal',
    backdrop: true,
    keyboard: true,
  });

  modalRef.componentInstance.data = item;
}


getCard()
{

    this.filterObj.fromDate = this.fromDate;
    this.filterObj.toDate = this.toDate;

    let myObj: any = { ...this.filterObj };

  this.manageRequestsService.getCards(myObj).subscribe((res)=>{
    this.cards=res

  })
}

getVists()
{
    this.spinner.show();

      const startIndex = (this.page - 1) * this.pageSize;
    this.filterObj.SkipCount = startIndex;
    this.filterObj.MaxResultCount = this.pageSize;
    this.filterObj.Search = this.Search;
    this.filterObj.CarMake = this.selectedCarMake;
    this.filterObj.fromDate = this.fromDate;
    this.filterObj.toDate = this.toDate;

    let myObj: any = { ...this.filterObj };
  this.manageRequestsService.getAllVists(myObj).subscribe((res)=>{
    this.vists=res.items;
      this.totalCount = res.totalCount;
      this.spinner.hide();
      this.cdr.detectChanges();


  })
}

onSearchChange() {
  this.page = 1;
  this.getVists();
}


onDateChange() {
  this.page = 1;
  this.getVists();
  this.getCard();
  this.getExport()
}

getcarMakeModel()
{

  this.manageRequestsService.getcarMake().subscribe((res)=>{
    this.makeCar=res;

  })
}


getExport() {
    this.spinner.show();

    this.filterObj.Search = this.Search;
        this.filterObj.CarMake = this.selectedCarMake;
    this.filterObj.fromDate = this.fromDate;
    this.filterObj.toDate = this.toDate;
    let myObj: any = { ...this.filterObj };

  this.manageRequestsService.getExport(myObj).subscribe((res: Blob) => {

    const blob = new Blob([res], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'visits.csv'; // اسم الملف
    a.click();

    window.URL.revokeObjectURL(url);

    this.spinner.hide();
            this.toastr.success(this.translate.instant('Download is Success'));
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
          this.getVists();
        }
      });


  }
  initFilterObj() {
    return {
      Sorting: 'id',
      SkipCount: 0,
      MaxResultCount: this.pageSize,
      Search: this.Search,
       CarMake: this.selectedCarMake || '',
        fromDate: this.fromDate || '',
    toDate: this.toDate || ''
    };
  }
}
function hideFn(value: any) {
  throw new Error('Function not implemented.');
}

