import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IOrderLine } from './orderline';

@Injectable({
  providedIn: 'root'
})
export class OrderlinesService {

  private apiUrl = this.baseUrl + "api/orderlines";

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  deleteLines(orderLines: IOrderLine[]) {
    return this.http.post<void>(this.apiUrl + '/delete/list', orderLines);
  }
}
