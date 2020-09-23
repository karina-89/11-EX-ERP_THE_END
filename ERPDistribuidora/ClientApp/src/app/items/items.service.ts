import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IItem } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private apiUrl = this.baseUrl + "api/items";

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getItems(): Observable<IItem[]> {
    return this.http.get<IItem[]>(this.apiUrl);
  }

  getItem(itemId: string): Observable<IItem> {
    return this.http.get<IItem>(this.apiUrl + '/' + itemId);
  }

  createItem(item: IItem): Observable<IItem> {
    return this.http.post<IItem>(this.apiUrl, item);
  }

  updateItem(item: IItem): Observable<IItem> {
    return this.http.put<IItem>(this.apiUrl + '/' + item.id, item);
  }

  deleteItem(item: IItem): Observable<IItem> {
    return this.http.delete<IItem>(this.apiUrl + '/' + item.id);
  }

}
