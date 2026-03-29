import { Injectable } from "@angular/core";
import { WebApiService } from "../webApi.service";

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private webApi: WebApiService) {}
  getAllCategories(param?: any) {
    return this.webApi.get(
      'api/app/manage-categories',
      param
    );
  }
  deleteCategory(id:any){
    return this.webApi.delete(`api/app/manage-categories/${id}/category`)
  }
  addCategory(Obj: any) {
    return this.webApi.post('api/app/manage-categories/category', Obj);
  }
  editCategory(Obj: any) {
    return this.webApi.patch('api/app/manage-categories/edit-category', Obj);
  }
  getMinByBrandId(BrandId:any){
    return this.webApi.get(`api/app/manage-categories/min-category-point/${BrandId}`)
  }

}
