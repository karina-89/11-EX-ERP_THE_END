import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEmployee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private apiUrl = this.baseUrl + "api/employees";

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  getEmployees(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.apiUrl);
  }

  getEmployee(employeeId: string): Observable<IEmployee> {
    return this.http.get<IEmployee>(this.apiUrl + '/' + employeeId);
  }

  createEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.http.post<IEmployee>(this.apiUrl, employee);
  }

  updateEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.http.put<IEmployee>(this.apiUrl + '/' + employee.id, employee);
  }

  deleteEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.http.delete<IEmployee>(this.apiUrl + '/' + employee.id);
  }
}
