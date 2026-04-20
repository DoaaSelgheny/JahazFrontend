import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private webApi: WebApiService) {}





    getCards(param?: any) {
    return this.webApi.get('/api/app/visits/kpis', param);
  }

  getAllBrands(param?: any) {
    return this.webApi.get(
      'api/app/manage-brand/brands',
      param
    );
  }
  getAllCountries() {
    return this.webApi.get(
      'api/app/manage-country',

    );
  }
  setBrandBranchActivationState(Obj:any){
    return this.webApi.post('api/app/manage-branch/set-brand-activation-state', Obj);
  }
  getAllCitites(CountryId:number) {
    return this.webApi.get(
      `api/app/manage-city?CountryId=${CountryId}`,
    );
  }
  addBrand(Obj: any) {
    return this.webApi.post('api/app/manage-brand/brand', Obj);
  }
  getLastBrands(params: any) {
    return this.webApi.get('api/app/manage-brand/brands-with-activation-state', params);
  }
  setBrandActivationState(Obj:any){
    return this.webApi.post('api/app/manage-brand/set-brand-activation-state', Obj);
  }
  setBrandAccessToken(Obj:any){
    return this.webApi.post('api/app/manage-brand/set-brand-access-token', Obj);
  }

}
