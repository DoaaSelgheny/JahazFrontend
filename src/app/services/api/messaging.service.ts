import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getMessaging, getToken } from 'firebase/messaging';
import { WebApiService } from '../webApi.service';
@Injectable({ providedIn: 'root' })
export class MessagingService {
  currentLanguage: string;
  currentMessage = new BehaviorSubject(null);
  private messageNo = new BehaviorSubject<Number>(0);
  messageNo$ = this.messageNo.asObservable();

  constructor(private webApi: WebApiService,

  ) {}

  requestPermission(branchId?:any) {

    const messaging = getMessaging();

    getToken(messaging, {
      vapidKey:
        'BHFuJO4hYIfRrvZtPfoCBUGkok-39WnrhyQ-uguhWvBZPVrR4_t1qQOZhtMJ5xkhBKzZXjtCWrYGK1TT8GSpqXA',
    })
      .then((currentToken:any) => {
        if (currentToken) {

          localStorage['firebaestoken'] = currentToken;
          var obj = { deviceId: currentToken,branchId:branchId};
          this.webApi
            .post(`api/app/manage-token/token`, obj)
            .subscribe((re) => {

            });
        } else {
          localStorage['firebaestoken'] = null;
        }
      })
      .catch((err:any) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  }
  deleteToken() {
    if(localStorage['firebaestoken']){
      let token=localStorage['firebaestoken']

      return this.webApi
      .delete(`api/app/manage-token?deviceId=${token}`)
      .subscribe((re) => {

        localStorage['firebaestoken'] = null;
        localStorage.removeItem('firebaestoken');
      });
    }

  }

  getUnReadNotification() {
    return this.webApi
      .get(`api/app/manage-notification/un-read-notifications-count`)
      .subscribe((re) => {
        this.messageNo.next(re);
      });
  }

  getReadNotifications(id:number) {
    return this.webApi
      .post(`/api/app/manage-notification/read-notification/${id}`)

  }
}
