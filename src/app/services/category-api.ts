import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',

})
export class CategoryApi {
  private categories = ['الكل', 'زينة وفوانيس', 'مستلزمات السفرة', 'مذاق رمضان','هدايا رمضانية']

  getCategories(){
    return this.categories;
  }
}