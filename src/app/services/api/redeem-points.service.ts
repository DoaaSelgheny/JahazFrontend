import { Injectable } from "@angular/core";
import { WebApiService } from "../webApi.service";

@Injectable({
  providedIn: 'root',
})
export class RedeemPointsService {
  constructor(private webApi: WebApiService) {}
  getAllRedeemPoints(param?: any) {
    return this.webApi.get(
      'api/app/manage-points-exchange',
      param
    );
  }
  addredeemPoints(Obj: any) {
    return this.webApi.post('api/app/manage-points-exchange/points-exchange', Obj);
  }

  getredeemPointsId(Id:any){
    return this.webApi.get(`api/app/manage-points-exchange/points-exchange-details/${Id}`)
  }

  viewPointsDetails(body:any){
    return this.webApi.post('api/app/manage-points-exchange/view-points-details',body)
  }
  savePointsExchange(body:any){
    return this.webApi.post('api/app/manage-points-exchange/save-points-exchange',body)
  }

  GetCategory(id:number)
  {
    return this.webApi.get(`/api/app/manage-categories/categories-dropdown?BrandId=${id}`);
  }

  ChangePoints(PointNo:number, CarId:number,BranchId:number,)
  {
    return this.webApi.get(`/api/app/manage-points-exchange/price-by-points?PointNo=${PointNo}&CarId=${CarId}&BranchId=${BranchId}`);
  }
}
