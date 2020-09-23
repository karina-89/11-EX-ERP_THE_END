import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICustomer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private apiUrl = this.baseUrl + "api/customers";

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getCustomers(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(this.apiUrl);
  }

  getCustomer(customerId: string): Observable<ICustomer> {
    return this.http.get<ICustomer>(this.apiUrl + '/' + customerId);
  }

  createCustomer(customer: ICustomer): Observable<ICustomer> {
    return this.http.post<ICustomer>(this.apiUrl, customer);
  }

  updateCustomer(customer: ICustomer): Observable<ICustomer> {
    return this.http.put<ICustomer>(this.apiUrl + '/' + customer.id, customer);
  }

  deleteCustomer(customer: ICustomer): Observable<ICustomer> {
    return this.http.delete<ICustomer>(this.apiUrl + '/' + customer.id);
  }
}
