import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';

@Injectable({
  providedIn: 'root',
})
export class ManageRequestsService {
  constructor(private webApi: WebApiService) {}

    getCards(param?: any) {
    return this.webApi.get('/api/app/visits/kpis', param);
  }
  getAllRequests(param?: any) {
    return this.webApi.get('api/app/manage-request', param);
  }

  getAllVists(param?: any) {
    return this.webApi.get('/api/app/visits', param);
  }

    getcarMake(param?: any) {
    return this.webApi.get('/api/app/lookups/car-make', param);
  }


 getExport(param?: any) {
    return this.webApi.getFile('/api/app/visits/export/csv', param);
  }

}
