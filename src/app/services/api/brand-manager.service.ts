import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';

@Injectable({
  providedIn: 'root'
})
export class BrandManagerService {

  constructor(private webApi: WebApiService) { }
  getDirectorBranches(){
    return this.webApi.get(`api/app/manage-branch/director-branches`)
  }
  getRequests(obj:any){
    return this.webApi.get(`api/app/manage-request`,obj)
  }
  getDataStatistics(obj:any){
    
    return this.webApi.get(`api/app/manage-dashboard/data-statistics`,obj)
  }
}
