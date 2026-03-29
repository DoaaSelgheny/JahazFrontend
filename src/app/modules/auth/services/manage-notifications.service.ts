import { Injectable } from '@angular/core';
import { WebApiService } from 'src/app/services/webApi.service';

@Injectable({
  providedIn: 'root',
})
export class ManageNotificationsService {
  constructor(private webApi: WebApiService) {}
  
  getAllManageNotifications(param?: any) {
    
    return this.webApi.get('/api/app/manage-notification', param);
  }

}
