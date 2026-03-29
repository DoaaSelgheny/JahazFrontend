import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';

@Injectable({
  providedIn: 'root',
})
export class BranchesService {
  constructor(private webApi: WebApiService) {}
  getAllBranches(param?: any) {
    return this.webApi.get(
      '/api/app/manage-branch',
      param
    );
  }

  addBranch(Obj: any) {
    return this.webApi.post('api/app/manage-branch/branch', Obj);
  }
  editCamera(Obj: any) {
    return this.webApi.post('api/app/manage-branch/edit-camera', Obj);
  }

  setBranchActivationState(Obj:any){
    return this.webApi.post('api/app/manage-branch/set-branch-activation-state', Obj);
  }
 manageCamera(id:number){
  return this.webApi.get(
    `/api/app/manage-branch/branch-cameras/${id}`
    
  );
  
 }
 checkRefrence(refrenceNumber:any)
 {
  return this.webApi.get(
    `/api/app/manage-branch/validate-is-exist-branch-reference-key?ReferenceKey=${refrenceNumber}`
    
  );
  
 }
  
}
