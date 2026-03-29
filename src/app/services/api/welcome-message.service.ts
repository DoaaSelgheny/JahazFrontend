import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';

@Injectable({
  providedIn: 'root'
})
export class WelcomeMessageService {

  constructor(private webApi: WebApiService) {}
  getAllMessage(param?: any) {
    return this.webApi.get(
      'api/app/manage-branch/search-welcome-messages',
      param
    );
  }

  addMessage(Obj: any) {
    return this.webApi.post('api/app/manage-branch/welcome-message', Obj);
  }

 getByID(id:number){
  return this.webApi.get(
    `api/app/manage-branch/welcome-message-by-id/${id}`
    
  );
  
 }
 getLatestNotification(BranchId:number){
  return this.webApi.get(
    `/api/app/manage-notification/latest-notification-for-welcome-screen/${BranchId}`
    
  );
  
 }
  
}

