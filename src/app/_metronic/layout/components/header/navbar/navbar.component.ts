import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AddUserModalComponent } from 'src/app/modules/admin/user-management/add-user-modal/add-user-modal.component';
import { MessagingService } from 'src/app/services/api/messaging.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { NotificationRead } from 'src/app/services/enums/notification.enum';
import { HeaderService } from 'src/app/services/api/header.service';
import { AuthService } from 'src/app/modules/auth';
import { Constants } from 'src/app/services/Constants/constants';
import { ManageNotificationsService } from 'src/app/services/api/manage-notifications.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() appHeaderDefaulMenuDisplay: boolean;
  @Input() isRtl: boolean;
  notificationRead = NotificationRead;
  allManageNotifications: any[] = [];
  itemClass: string = 'ms-1 ms-lg-3';
  btnClass: string =
    'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px';
  userAvatarClass: string = 'symbol-35px symbol-md-40px';
  btnIconClass: string = 'svg-icon-1';

  constructor(
    private messageService: MessagingService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private router: Router,
    private _ManageNotificationsService: ManageNotificationsService,
    private headerService: HeaderService,
    public authService: AuthService
  ) {}
  userName: any;
  messageNo: Number;
  branches: any;
  currentUser: any;
  Constants = Constants;
  isAdmin: boolean;
  roles: any;
  ngOnInit(): void {
    this.getBranches();
    this.roles = Constants.AllRoles;
    this.authService.getcurrentUser().subscribe((res) => {
      this.currentUser = res.currentUser;
      this.userName = res.name;
      if (this.currentUser.roles[0] == Constants.AllRoles.ThalolCasheir) {
        this.isAdmin = true;
        this.getData();
      } else {
        this.isAdmin = false;
      }
      if (this.currentUser.roles[0] === Constants.AllRoles.ThalolCasheir) {
        this.getInfo();
      }
    });
  }
  userData: any;
  getInfo() {
    this.headerService.getProfileInfo().subscribe({
      next: (next) => {
        this.userData = next;
        this.cdr.detectChanges();
      },
    });
  }
  notActiveBranches: any;
  getBranches() {

    this.headerService.getCashierBranches().subscribe({
      next: (next) => {
        this.branches = next;

        this.notActiveBranches = this.branches.filter(
          (x: any) => x.isCurrentBranch === false
        );
        console.log(this.notActiveBranches);

        this.cdr.detectChanges();
      },
    });
  }

  getData() {
    if (this.currentUser.roles[0] === Constants.AllRoles.ThalolCasheir) {
      this.getNotification();
      this.messageService.getUnReadNotification();
      this.messageService.messageNo$.subscribe((messageNo) => {
        this.messageNo = messageNo;
      });
    }
  }
  getNotification() {
    this._ManageNotificationsService
      .getAllManageNotifications({
        notificationRead: this.notificationRead.UnReaded,
        IsDesc: true,
      })
      .subscribe((res:any) => {
        this.allManageNotifications = res.items;

        this.cdr.detectChanges();
      });
  }

  openUserMangment(row?: any) {
    //call UnRead Notification
    this.messageService.getReadNotifications(row.id).subscribe((res) => {
      this.getData();
    });
    const modalRef = this.modalService.open(AddUserModalComponent, {
      size: 'md',
      backdrop: 'static',
    });
    modalRef.componentInstance.cameraNumber=row.cameraNumber
    modalRef.componentInstance.id = row.redirectUrl;
    modalRef.componentInstance.notificationID = row.id;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry: any) => {
      if (receivedEntry) {
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.router.navigate(['/admin/user-management']));
      }
    });
  }

  onItemSelect(item: any) {
    this.headerService.changeBranch(item.id).subscribe({
      next: (next) => {
        this.getInfo();
        this.getBranches();
        this.cdr.detectChanges();
        window.location.reload();
      },
    });
  }
}
function hideFn(value: any) {
  throw new Error('Function not implemented.');
}
