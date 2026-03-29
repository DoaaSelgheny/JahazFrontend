import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';

@Injectable({
  providedIn: 'root',
})
export class ManageRequestsService {
  constructor(private webApi: WebApiService) {}
  getAllRequests(param?: any) {
    return this.webApi.get('api/app/manage-request', param);
  }
  
}
