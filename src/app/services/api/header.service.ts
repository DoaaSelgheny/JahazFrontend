import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HeaderService {
    constructor(private webApi: WebApiService) { }
    getProfileInfo() {
        return this.webApi.get(`api/app/manage-cashier/cashier-profile-info`);
    }

    changeBranch(BranchId: any):Observable<any> {
        return this.webApi.put(`api/app/manage-cashier/change-active-branch/${BranchId}`);
    }
    getCashierBranches(){
        return this.webApi.get('api/app/manage-branch/cashier-branches')
    }


}
