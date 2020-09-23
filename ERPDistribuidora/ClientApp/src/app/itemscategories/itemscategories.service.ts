import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IItemsCategory } from './itemscategory';

@Injectable({
  providedIn: 'root'
})
export class ItemscategoriesService {

  private apiUrl = this.baseUrl + "api/itemscategories";

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getItemsCategories(): Observable<IItemsCategory[]> {
    return this.http.get<IItemsCategory[]>(this.apiUrl);
  }

  getItemCategory(itemCategoryId: string): Observable<IItemsCategory> {
    return this.http.get<IItemsCategory>(this.apiUrl + '/' + itemCategoryId);
  }

  createItemCategory(itemCategory: IItemsCategory): Observable<IItemsCategory> {
    return this.http.post<IItemsCategory>(this.apiUrl, itemCategory);
  }

  updateItemCategory(itemCategory: IItemsCategory): Observable<IItemsCategory> {
    return this.http.put<IItemsCategory>(this.apiUrl + '/' + itemCategory.id, itemCategory);
  }

  deleteItemCategory(itemCategory: IItemsCategory): Observable<IItemsCategory> {
    return this.http.delete<IItemsCategory>(this.apiUrl + '/' + itemCategory.id);
  }

}
