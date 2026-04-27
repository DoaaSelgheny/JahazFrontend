import { Injectable } from '@angular/core';
import { WebApiService } from 'src/app/services/webApi.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private webApi: WebApiService) {}



  vistsHourly(parms?: any) {
    return this.webApi.get(`/api/app/visits/hourly` ,parms);
  }

    vistsLongest(parms?: any) {
    return this.webApi.get(`/api/app/visits/longest-stay` ,parms);
  }

      vistsByVehicles(parms?: any) {
    return this.webApi.get(`/api/app/visits/stay-time-by-vehicles` ,parms);
  }


        vistsByStayDuration(parms?: any) {
    return this.webApi.get(`/api/app/visits/stay-duration-distribution` ,parms);
  }



}
