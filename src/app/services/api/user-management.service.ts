import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';

@Injectable({
  providedIn: 'root',
})
export class OrderManagementService {
  constructor(private webApi: WebApiService) {}
  getAllOrders(param?: any) {
    return this.webApi.get('api/app/manage-foodics/orders', param);
  }

  getOrderByID(id?: any) {
    return this.webApi.get(`api/app/manage-foodics/order-details/${id}`);
  }
  viewUser(id?: any) {
    return this.webApi.get(`api/app/manage-car/customer-cars/${id}`);
  }

  viewCarHistory(id?: any,brandId?:any) {
    return this.webApi.get(`api/app/manage-car/car-history?Id=${id}&brandId=${brandId}`);
  }

  visitsHistory(id?: any) {
    return this.webApi.get(`api/app/manage-car/customers-history/${id}`);
  }
  getAllUsers(param?: any) {
    return this.webApi.get(`/api/app/users`, param);
  }
  addUser(body?: any) {
    return this.webApi.post(`api/app/manage-customer/register-customer`, body);
  }
  getcarType() {
    return this.webApi.get(`api/app/manage-car-type/car-type`);
  }
  manageCarbyid(id:any) {
    return this.webApi.get(`api/app/manage-car/by-id/${id}`);
  }

  getcarModel(id: any) {
    return this.webApi.get(`api/app/manage-model/model-by-type-id/${id}`);
  }
}
