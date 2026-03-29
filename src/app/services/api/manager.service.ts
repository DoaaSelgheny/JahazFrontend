import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  constructor(private webApi: WebApiService) {}
  getLastBranch(params?:any) {
    return this.webApi.get('api/app/manage-dashboard/last-update-of-branch',params);
  }
  getChart() {
    return this.webApi.get('api/app/manage-dashboard/updated-data');
  }
 
}
