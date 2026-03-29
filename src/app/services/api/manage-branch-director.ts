import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';

@Injectable({
  providedIn: 'root',
})
export class ManageBranchDirectorService {
  constructor(private webApi: WebApiService) {}
  getAllBranchDirector(param?: any) {
    return this.webApi.get(
      'api/app/manage-brand-director',
      param
    );
  }

  addBranchDirector(Obj: any) {
    return this.webApi.post('api/app/manage-brand-director/register-brand-director', Obj);
  }

 getByID(id:number){
  return this.webApi.get(
    `api/app/manage-brand-director/by-id/${id}`
    
  );
  
 }
  
}
