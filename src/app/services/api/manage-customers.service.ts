import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ManageCustomersService {
  constructor(private webApi: WebApiService) {}

  getCustomersVisits(filterValue?: any) {
    let params = new HttpParams()
      .set('branchId', filterValue.branchId)
      .set('brandId', filterValue.brandId)
      .set('fromDate', filterValue.fromDate)
      .set('toDate', filterValue.toDate)
      .set('carModel', filterValue.carModel)
      .set('cityId', filterValue.cityId)
          .set('sorting', filterValue.sorting)
    .set('skipCount', filterValue.skipCount)
    .set('maxResultCount', filterValue.maxResultCount);
    return this.webApi.get(
      `api/app/manage-dashboard/customer-visits-statistics`,
      params
    );
  }

  getCustomersPoints(filterValue?: any) {
    let params = new HttpParams()
      .set('branchId', filterValue.branchId)
      .set('brandId', filterValue.brandId)
      .set('fromDate', filterValue.fromDate)
      .set('toDate', filterValue.toDate)
      .set('carModel', filterValue.carModel)
      .set('cityId', filterValue.cityId)
                .set('sorting', filterValue.sorting)
    .set('skipCount', filterValue.skipCount)
    .set('maxResultCount', filterValue.maxResultCount);

    return this.webApi.get(
      `api/app/manage-dashboard/customer-points-statistics`,
      params
    );
  }

  getCustomerStatistics(filterValue: any) {
    let params = new HttpParams()
      .set('branchId', filterValue.branchId)
      .set('brandId', filterValue.brandId)
      .set('fromDate', filterValue.fromDate)
      .set('toDate', filterValue.toDate)
      .set('carModel', filterValue.carModel)
      .set('cityId', filterValue.cityId);

    return this.webApi.get(
      'api/app/manage-dashboard/basic-customer-statistics',
      params
    );
  }
  getCustomerDetails(filterValue: any) {
    let params = new HttpParams()
      .set('brandId', filterValue.brandId)
      .set('branchId', filterValue.branchId)
      .set('CustomerId', filterValue.id);

    return this.webApi.get('api/app/manage-customer/customer-details', params);
  }

  getOrdersKpisStatistics(filterValue?: any) {
    let params = new HttpParams()
      .set('branchId', filterValue.branchId)
      .set('brandId', filterValue.brandId)
      .set('fromDate', filterValue.fromDate)
      .set('toDate', filterValue.toDate)
      .set('carModel', filterValue.carModel)
      .set('cityId', filterValue.cityId)
      .set('TimeZoneOffsetMinutes', -new Date().getTimezoneOffset());
    return this.webApi.get(
      `/api/app/manage-dashboard/orders-kpis-statistics`,
      params
    );
  }

  getOrdersTimeOfDayStatistics(filterValue?: any) {
    let params = new HttpParams()
      .set('branchId', filterValue.branchId)
      .set('brandId', filterValue.brandId)
      .set('fromDate', filterValue.fromDate)
      .set('toDate', filterValue.toDate)
      .set('carModel', filterValue.carModel)
      .set('cityId', filterValue.cityId)
      .set('granularity', filterValue.granularity)

      .set('TimeZoneOffsetMinutes', -new Date().getTimezoneOffset());
    return this.webApi.get(
      `/api/app/manage-dashboard/orders-time-of-day-statistics`,
      params
    );
  }

  getOrdersByHourStatistics(filterValue?: any) {
    let params = new HttpParams()
      .set('branchId', filterValue.branchId)
      .set('brandId', filterValue.brandId)
      .set('fromDate', filterValue.fromDate)
      .set('toDate', filterValue.toDate)
      .set('carModel', filterValue.carModel)
      .set('cityId', filterValue.cityId)
      .set('TimeZoneOffsetMinutes', -new Date().getTimezoneOffset());
    return this.webApi.get(
      `/api/app/manage-dashboard/today-orders-by-hour-statistics`,
      params
    );
  }

  getOrdersByitemsStatistics(filterValue?: any) {
    let params = new HttpParams()
      .set('branchId', filterValue.branchId)
      .set('brandId', filterValue.brandId)
      .set('fromDate', filterValue.fromDate)
      .set('toDate', filterValue.toDate)
      .set('carModel', filterValue.carModel)
      .set('cityId', filterValue.cityId)
      .set('TimeZoneOffsetMinutes', -new Date().getTimezoneOffset());
    return this.webApi.get(
      `api/app/manage-dashboard/order-items-statistics`,
      params
    );
  }

    getExcelExport(filterValue?: any) {
    let params = new HttpParams()
      .set('brandId', filterValue.brandId)
      .set('branchId', filterValue.branchId)
      .set('cityId', filterValue.cityId)
      .set('fromDate', filterValue.fromDate)
      .set('toDate', filterValue.toDate)
      .set('carModel', filterValue.carModel);
    return this.webApi.getFile(
      `/api/app/manage-dashboard/export-dashboard-statistics-to-excel`,
      params,
      
    );
  }
}
