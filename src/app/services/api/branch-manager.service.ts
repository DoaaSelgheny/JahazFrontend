import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';

@Injectable({
  providedIn: 'root',
})
export class BranchManagerService {
  constructor(private webApi: WebApiService) { }
  getAllBranchManager(param?: any) {
    return this.webApi.get(
      'api/app/manage-branch-director',
      param
    );
  }
  addBranchManager(body:any){
    return this.webApi.post('api/app/manage-branch-director/register-branch-director',body)
  }
  getBranchManagerInfo(Id:any){
    return this.webApi.get(`api/app/manage-branch-director/by-id/${Id}`);
  }
  addBranch(Obj: any) {
    return this.webApi.post('api/app/manage-branch/branch', Obj);
  }
  changeStatus(Obj: any) {
    return this.webApi.post('api/app/manage-branch-director/set-branch-director-account-state', Obj);
  }
  getNationality() {
    return this.webApi.get('api/app/manage-nationality/nationalities');
  }

  getBranchByBrand(BrandId:any){
    return this.webApi.get(`api/app/manage-branch/branch-by-brand-id/${BrandId}`)
  }
  getDirectorBranches(){
    return this.webApi.get(`api/app/manage-branch/director-branches`)
  }


}
