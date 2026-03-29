import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';

@Injectable({
  providedIn: 'root',
})
export class CashiersService {
  constructor(private webApi: WebApiService) { }
  getAllCashier(param?: any) {
    return this.webApi.get(
      'api/app/manage-cashier/cashiers',
      param
    );
  }

  addBranch(Obj: any) {
    return this.webApi.post('api/app/manage-branch/branch', Obj);
  }
  changeStatus(Obj: any) {
    return this.webApi.post('api/app/manage-cashier/set-account-state', Obj);
  }
  getNationality() {
    return this.webApi.get('api/app/manage-nationality/nationalities');
  }
  getCashierInfo(Id:any){
    return this.webApi.get(`api/app/manage-cashier/cashier-by-id/${Id}`);
  }
  getBranchByBrand(BrandId:any){
    return this.webApi.get(`api/app/manage-branch/branch-by-brand-id/${BrandId}`)
  }
  getDirectorBranches(){
    return this.webApi.get(`api/app/manage-branch/director-branches`)
  }
  addCashier(body:any){
    return this.webApi.post('api/app/manage-cashier/register-cashier',body)
  }

}
