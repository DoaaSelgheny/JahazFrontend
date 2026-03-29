import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  NotificationRead,
  NotificationType,
} from 'src/app/services/enums/notification.enum';
import { MessagingService } from 'src/app/services/api/messaging.service';
import { AddUserModalComponent } from '../user-management/add-user-modal/add-user-modal.component';
import { getMessaging, onMessage } from 'firebase/messaging';
import { TranslationService } from 'src/app/i18n/translation.service';
import { AuthService } from '../../auth';
import { ManageRequestsService } from 'src/app/services/api/manage-requests.service';
import { BrandManagerService } from 'src/app/services/api/brand-manager.service';
import { VisibilityService } from 'src/app/services/api/mimize-browser.service';
import { ManageNotificationsService } from 'src/app/services/api/manage-notifications.service';
import { ViewCarHistoryComponent } from '../user-management/view-car-history/view-car-history.component';
import { Constants } from 'src/app/services/Constants/constants';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/services/api/header.service';
import { RedeemPointsCashierComponent } from '../user-management/redeem-points-cashier/redeem-points-cashier.component';

@Component({
  selector: 'app-dashboard-management',
  templateUrl: './dashboard-management.component.html',
  styleUrls: ['./dashboard-management.component.scss'],
})
// AdsService
export class DashboardManagementComponent implements OnInit {
  allUsers: any[] = [];
  pastOrders: any = [];
  currentCarData: any;
  notificationRead = NotificationRead;
  allManageNotifications: any[] = [];
  currentUser: any;
  totalCars: any;
  totalCarsInMonth: any;
  totalCarsInWeek: any;
  averageWaitingTime: any;
  brandId:any;
  constructor(
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private visibilityService: VisibilityService,
    private manageRequestsService: ManageRequestsService,
    private manageNotificationsService: ManageNotificationsService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService,
    private messagingService: MessagingService,
    private translate: TranslationService,
    private brandmanagerService: BrandManagerService,
    private headerService: HeaderService,
  ) {}
 roles=Constants.AllRoles
  ngOnInit(): void {

    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.getDataFromInit();
    } else {
      this.spinner.show();
      this.authService.getcurrentUser().subscribe((res) => {
        this.spinner.hide();
        this.currentUser = res.currentUser;
        this.getDataFromInit();
      });
    }

  }
  getDataFromInit() {
    if (this.currentUser.roles[0] == Constants.AllRoles.ThalolCasheir) {
      this.listen();
      this.messagingService.requestPermission();

      this.visibilityService.visibilityChange$.subscribe((isVisible) => {
        if (isVisible) {
          this.getAllOrderData(false);
          this.getAllOrder();
        }
      });
      if (this.currentUser.roles[0] == Constants.AllRoles.ThalolCasheir) {
        this.getAllOrderData();
        this.getAllOrder();
        this.getBrandId();
      }
      this.authService.getcurrentUser().subscribe((res) => {
        this.currentUser = res.currentUser;


      });
    } else {
      this.router.navigate(['/home']);
    }
  }
getBrandId(){
  this.headerService.getProfileInfo().subscribe({
    next: (next) => {

      this.brandId = next.brandId;
      this.cdr.detectChanges();
    },
  });
}
  getCurrentCarData() {
    this.currentCarData = null;
    this.cdr.detectChanges();
    if (this.allUsers.length) {
      let myDate = new Date(this.allUsers[0].date);
      var newDate = new Date(
        myDate.getTime() - myDate.getTimezoneOffset() * 60 * 1000
      );

      const currentDate = new Date();
      const timeDifference = currentDate.getTime() - newDate.getTime();

      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days == 0 && hours == 0) {
        if (minutes < 3) {
          this.currentCarData = this.allUsers[0];
          let newMinutes = 3 - minutes;
          let myMinutes = newMinutes < 0 ? newMinutes * -1 : newMinutes;

          const delayInMilliseconds = myMinutes * 60 * 1000;
          setTimeout(() => {
            this.getAllOrderData();
          }, delayInMilliseconds);

          this.cdr.detectChanges();
        }
      }
    }
  }

  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload: any) => {

      if (this.translate.getSelectedLanguage() === 'en') {
        this.toastr.info(payload.data?.titleEn);
      } else {
        this.toastr.info(payload.data?.titleAr);
      }

      if (payload.data?.NotificationType == NotificationType.InActiveBranch) {
        setTimeout(() => {
          this.authService.logout();
        }, 1000);
      } else {
        if (
          payload.data?.NotificationType == NotificationType.TiknalConfirmed ||
          payload.data?.NotificationType == NotificationType.carRecorder
        ) {
          this.spinner.show();
          this.getAllOrderData();
          this.getAllOrder();
        }
        setTimeout(() => {
          if (localStorage.getItem('access_token_zalool')) {
            this.messagingService.getUnReadNotification();
          }
        }, 1000);
      }
    });
  }

  openUserMangment(row?: any) {
    this.messagingService.getReadNotifications(row.id).subscribe((res) => {
      this.messagingService.getUnReadNotification();
    });
    const modalRef = this.modalService.open(AddUserModalComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.cameraNumber = row.cameraNumber;
    modalRef.componentInstance.id = row.id;
    modalRef.componentInstance.notificationID = row.id;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
      this.getAllOrderData();
    });
  }
  userMangment(row?: any) {
    const modalRef = this.modalService.open(AddUserModalComponent, {
      size: 'md',
      backdrop: 'static',
    });
    // console.log(row);
    modalRef.componentInstance.id = row.id;
    modalRef.componentInstance.notificationID = row.id;
    modalRef.componentInstance.cameraNumber = row.cameraNumber;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
      if (receivedEntry == true) {
        this.manageNotificationsService
          .openNotifications(row.id)
          .subscribe((res) => {
            this.getAllOrder();
            this.getAllOrderData();
            this.cdr.detectChanges();
          });
      }
    });
  }

  viewPointModel(pointNo:number){
    this.modalService.dismissAll('Cross click');
    const modalRef = this.modalService.open(RedeemPointsCashierComponent, {
      size: '500px',
      backdrop: 'static',
    });
  }

  viewCarHistory(row?: any) {
    this.manageNotificationsService
      .openNotifications(row.id)
      .subscribe((res) => {

      });
    const modalRef = this.modalService.open(ViewCarHistoryComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.id = row.car.id;
    modalRef.componentInstance.brandId = this.brandId;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
      setTimeout(() => {
        this.getAllOrderData();
      }, 1000);

      if (receivedEntry === true) {
      }
    });
  }
  getAllOrderData(showSpinner: boolean = true) {
    if (showSpinner && this.allUsers?.length == 0) {
      this.spinner.show();
    }

    this.manageNotificationsService
      .getAllManageNotifications({
        Sorting: 'id',
        SkipCount: 0,
        MaxResultCount: 6,
        isOpen: false,
        IsDesc: true,
      })
      .subscribe((res) => {
        this.allUsers = res.items;
        let myObjData: any = {
          BranchId: '',
        };
        this.brandmanagerService.getDataStatistics(myObjData).subscribe({
          next: (nextData) => {
            this.totalCars = nextData.totalCars;
            this.totalCarsInMonth = nextData.totalCarsInMonth;
            this.totalCarsInWeek = nextData.totalCarsInDay;
            this.averageWaitingTime = parseFloat(
              nextData.averageWaitingTime
            ).toFixed(2);

            this.spinner.hide();
            this.cdr.detectChanges();
          },
        });
        this.spinner.hide();
        this.getCurrentCarData();
        this.cdr.detectChanges();
      });
  }

  getAllOrder(showSpinner: boolean = true) {
    if (showSpinner && this.pastOrders?.length == 0) {
      this.spinner.show();
    }

    this.manageRequestsService
      .getAllRequests({
        Sorting: 'id',
        SkipCount: 0,
        MaxResultCount: 6,
      })
      .subscribe((res) => {
        this.pastOrders = res.items;
        this.spinner.hide();
        this.getCurrentCarData();
        this.cdr.detectChanges();
      });
  }
}
