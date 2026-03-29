import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FirstTabService {
  constructor(private webApi: WebApiService) {}

  getCarBrands(filterValue: any) {
    let params = new HttpParams()
      .set('branchId', filterValue.branchId)
      .set('brandId', filterValue.brandId)
      .set('fromDate', filterValue.fromDate)
       .set('toDate', filterValue.toDate)
      .set('carModel', filterValue.carModel)
      .set('cityId', filterValue.cityId);
    return this.webApi.get(
      'api/app/manage-dashboard/cars-brands-statistics',
      params
    );
  }

  getvisitHours(filterValue: any) {
    let params = new HttpParams()
      .set('branchId', filterValue.branchId)
      .set('brandId', filterValue.brandId)
      .set('fromDate', filterValue.fromDate)
      .set('toDate', filterValue.toDate)
     .set('carModel', filterValue.carModel)
      .set('cityId', filterValue.cityId)
      .set('TimeZoneOffsetMinutes',(-(new Date()).getTimezoneOffset()));

    return this.webApi.get(
      'api/app/manage-dashboard/visit-hours-statistics',
      params
    );
  }

  getCustomerStatistics() {
    return this.webApi.get(
      'api/app/manage-dashboard/basic-customer-statistics'
    );
  }

  carColors(filterValue: any) {
    let params = new HttpParams()
      .set('branchId', filterValue.branchId)
      .set('brandId', filterValue.brandId)
      .set('fromDate', filterValue.fromDate)
      .set('toDate', filterValue.toDate)
      .set('carModel', filterValue.carModel)
      .set('cityId', filterValue.cityId);

    return this.webApi.get(
      'api/app/manage-dashboard/car-colors-statistics',
      params
    );
  }

  ManageCity(id: number) {
    return this.webApi.get(`api/app/manage-city?CountryId=${id}`);
  }
}
