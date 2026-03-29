import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth';
import { MessagingService } from 'src/app/services/api/messaging.service';
import { WelcomeMessageService } from 'src/app/services/api/welcome-message.service';
import screenfull from 'screenfull';
import { getMessaging, onMessage } from 'firebase/messaging';
import { NotificationType } from 'src/app/services/enums/notification.enum';
import { NgxSpinnerService } from 'ngx-spinner';
import { VisibilityService } from 'src/app/services/api/mimize-browser.service';
@Component({
  selector: 'app-review-welcome-message',
  templateUrl: './review-welcome-message.component.html',
  styleUrls: ['./review-welcome-message.component.scss'],
})
export class ReviewWelcomeMessageComponent implements OnInit {
  data: any;
  id: any;
  latestNotification: any;
  private faviconUrl: string = 'assets/imgs/logo-white.svg';
  isFullScreen: boolean;
  carData: any;
  constructor(
    private welcomeMessageService: WelcomeMessageService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private visibilityService: VisibilityService,
    private router: Router,
    private ngxSpinnerService: NgxSpinnerService,
    private messagingService: MessagingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.router.url.includes('/welcome/')) {
      this.isFullScreen = true;

      this.messagingService.requestPermission(this.id);
      this.listen();
    }

    if (this.id) {
      this.getData();
      this.visibilityService.visibilityChange$.subscribe((isVisible) => {
        if (isVisible) {
this.getLatestNotificationAfterFiveMin()
        }
      });

    }
  }

  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload: any) => {
      // this.carData = JSON.parse(payload.data.Car);
      // this.getLatestNotification();
      this.getLatestNotificationAfterFiveMin();
      this.cdr.detectChanges();

      if (
        payload.data?.NotificationType == NotificationType.TiknalConfirmed ||
        payload.data?.NotificationType == NotificationType.carRecorder
      ) {

        // this.carData = JSON.parse(payload.data.Car);
      }
    });
  }
  private updateFavicon(): void {
    const link: HTMLLinkElement =
      document.querySelector("link[rel*='icon']") ||
      document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = this.faviconUrl;
    document.getElementsByTagName('head')[0].appendChild(link);
    document.title = this.data.branch;
  }

  getData() {
    this.ngxSpinnerService.show();
    this.welcomeMessageService.getByID(this.id).subscribe((res) => {
      this.id = res.id;
      this.data = res;
      this.cdr.detectChanges();
      this.getLatestNotificationAfterFiveMin();
      this.faviconUrl = this.data?.logoUrl;
      this.updateFavicon();
    });
  }

  getLatestNotificationAfterFiveMin() {

    this.welcomeMessageService
      .getLatestNotification(this.id)
      .subscribe((data) => {
        this.ngxSpinnerService.hide();
        let myDate = new Date(data.date);
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
          if (minutes < 5) {
            let newMinutes = 5 - minutes;
            let myMinutes = newMinutes < 0 ? newMinutes * -1 : newMinutes;
            this.latestNotification = null;
            this.cdr.detectChanges();
            this.latestNotification = data;

            const delayInMilliseconds = myMinutes * 60 * 1000;
            setTimeout(() => {

              this.latestNotification = null;
              this.cdr.detectChanges();
            }, delayInMilliseconds);
            this.cdr.detectChanges();
          } else {
            this.latestNotification = null;
          }
        }
      });
  }
  redirect() {
    this.router.navigate(['admin/welcome-message/', this.id]);
  }

  toggleFullscreen() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }
}
