import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ModalManageContactUsComponent } from './modal-manage-contact-us/modal-manage-contact-us.component';
import { ContactUsService } from 'src/app/services/api/contact-us.service';
import { ReadMoreComponent } from './read-more/read-more.component';
import { ContactUsMessageStatus } from 'src/app/services/enums/ContactUsStatus.enum';

@Component({
  selector: 'app-manage-contact-us',
  templateUrl: './manage-contact-us.component.html',
  styleUrls: ['./manage-contact-us.component.scss'],
})
export class ManageContactUsComponent implements OnInit    {

  AllData:any[]=[];
  page: number = 1;
  pageSize: number = 10;
  filterObj = this.initFilterObj();
  totalCount:number;

  ContactUsMessageStatus = ContactUsMessageStatus;
  status: number = 0;

  constructor(
    private contactUsService: ContactUsService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private cdRef: ChangeDetectorRef 

  ) {}


  getStatusKey(status: number): string {
    switch (status) {
      case 0:
        return 'STATUS.NEW';
      case 1:
        return 'STATUS.InProgress';
        case 2:
          return 'STATUS.Closed';
      default:
        return '';
    }
  }

//   {
//     New,
//     InProgress,
//     Closed
// }
  initFilterObj() {
    return {
      From: '',
      To: '',
      Sorting: 'id desc',     
      SkipCount: 0,
      MaxResultCount: this.pageSize

    };
  }

  
ngOnInit(): void {
  this.getAllMessage()
}

  getAllMessage()
  { 

    this.spinner.show();

    const startIndex = (this.page - 1) * this.pageSize;
    this.filterObj.SkipCount = startIndex;
    this.filterObj.MaxResultCount = this.pageSize;

    this.contactUsService.GetAllData(this.filterObj).subscribe((res: any) => {
      this.AllData= res.items;
      this.totalCount=res.totalCount
      this.spinner.hide();
      this.cdRef.detectChanges();

    });
  }
  


onStatusChange(event:any,item: any ): void {

  const changeStatus = {
    contactUsId: item, 
    status: event.target.value
  };

  

  this.contactUsService.status(changeStatus).subscribe({
  });
}

  viewUserModal(data:any) {
    const modalRef = this.modalService.open(ModalManageContactUsComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = data;
  }
  openModal(data:any) {
    const modalRef = this.modalService.open(ReadMoreComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = data;

  }

}
