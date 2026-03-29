import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';

@Injectable({
  providedIn: 'root',
})
export class ManageNotificationsService {
  constructor(private webApi: WebApiService) {}
  getAllManageNotifications(param?: any) {
    return this.webApi.get('/api/app/manage-notification', param);
  }
  usedNotifications(notificationID?: any) {
    return this.webApi.post(`/api/app/manage-notification/used-notification/${notificationID}`);
  }
  openNotifications(notificationID?: any) {
    return this.webApi.post(`/api/app/manage-notification/open-notification/${notificationID}`);
  }
 
}
