import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrder } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private apiUrl = this.baseUrl + "api/orders";

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.apiUrl);
  }

  getOrdersByEmployee(employeeId: number): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.apiUrl + '/emp/' + employeeId);
  }

  getOrdersByCustomer(customerId: number): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.apiUrl + '/cust/' + customerId);
  }

  getOrder(orderId: string): Observable<IOrder> {
    return this.http.get<IOrder>(this.apiUrl + '/' + orderId);
  }

  getFullOrder(orderId: string): Observable<IOrder> {
    let params = new HttpParams().set('includeLines', "true");
    return this.http.get<IOrder>(this.apiUrl + '/' + orderId, { params: params });
  }

  createOrder(order: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>(this.apiUrl, order);
  }

  updateOrder(order: IOrder): Observable<IOrder> {
    let neworder: IOrder = order;

    return this.http.put<IOrder>(this.apiUrl + '/' + neworder.id, neworder);
  }

  deleteOrder(order: IOrder): Observable<IOrder> {
    return this.http.delete<IOrder>(this.apiUrl + '/' + order.id);
  }
}
