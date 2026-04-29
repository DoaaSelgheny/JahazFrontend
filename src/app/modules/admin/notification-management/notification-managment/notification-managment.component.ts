import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ManageNotificationsService } from 'src/app/services/api/manage-notifications.service';
import { MessagingService } from 'src/app/services/api/messaging.service';
import { AddUserModalComponent } from '../../user-management/add-user-modal/add-user-modal.component';
import { Router } from '@angular/router';
import { NotificationRead } from 'src/app/services/enums/notification.enum';

@Component({
  selector: 'app-notification-managment',
  templateUrl: './notification-managment.component.html',
  styleUrls: ['./notification-managment.component.scss'],
})
export class NotificationManagmentComponent implements OnInit {
  constructor(
    private _NotificationService: ManageNotificationsService,
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private messageService: MessagingService,
    public datepipe: DatePipe,
    private router: Router
  ) {}
  theNotificationRead = NotificationRead;
  All = this.theNotificationRead.All;
  from: any;
  to: any;
  dateText1: any;
  dateText2: any;
  startDate: any;
  totalCount: number;
  payMent: number = 0;
  page: number = 1;
  pageSize: number = 9;
  filterObj = this.initFilterObj();
  allNotifications: any[] = [];
  isDate: boolean = false;
  ngOnInit(): void {
    this.getUserAllNotifications();
  }
  getUserAllNotifications() {
    this.spinner.show();
    if (this.dateText2 != null && this.dateText2 != '') {
      this.to = this.dateText2;

      let myDate2 = this.to;
      const date2: NgbDate = new NgbDate(
        myDate2.year,
        myDate2.month,
        myDate2.day
      );
      const jsDate2 = new Date(date2.year, date2.month - 1, date2.day);
      this.to = this.datepipe.transform(jsDate2, 'yyyy-MM-dd');
    } else {
      this.to = '';
    }
    const startIndex = (this.page - 1) * this.pageSize;
    this.filterObj.SkipCount = startIndex;
    this.filterObj.MaxResultCount = this.pageSize;
    if (this.dateText1 != null && this.dateText1 != '') {
      this.from = this.dateText1;
      let myDate1 = this.from;

      const date1: NgbDate = new NgbDate(
        myDate1.year,
        myDate1.month,
        myDate1.day
      );
      const jsDate1 = new Date(date1.year, date1.month - 1, date1.day);
      this.from = this.datepipe.transform(jsDate1, 'yyyy-MM-dd');
    } else {
      this.from = '';
    }
    this.filterObj.From = this.from;
    this.filterObj.To = this.to;
    if (this.All === this.theNotificationRead.All) {
      this.filterObj.NotificationRead = this.theNotificationRead.All;
      this._NotificationService
        .getAllManageNotifications(this.filterObj)
        .subscribe((data) => {
          this.allNotifications = data.items;
          this.totalCount = data.totalCount;
          this.spinner.hide();
          this.cdr.detectChanges();
        });
    } else {
      this.filterObj.NotificationRead = this.theNotificationRead.UnReaded;
      this._NotificationService
        .getAllManageNotifications(this.filterObj)
        .subscribe((data) => {
          this.allNotifications = data.items;
          this.totalCount = data.totalCount;
          this.spinner.hide();
          this.cdr.detectChanges();
        });
    }
  }
  initFilterObj() {
    return {
      From: null,
      To: null,
      Sorting: 'id',
      isOpen:true,
      IsDesc:true,
      SkipCount: 0,
      MaxResultCount: this.pageSize,
      NotificationRead: this.theNotificationRead.All,
    };
  }

  returnType(event: any) {
    if (event.target.type === 'date') this.isDate = true;
  }
}

