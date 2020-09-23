import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from './user';
import { map } from 'rxjs/operators';
import { IUserInfo } from './user-info';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiURL = this.baseUrl + "api/users";
  userData = new BehaviorSubject<IUser>(new IUser());
  private userIsLoggedIn = false;
  private userRole: string;
  userId: number;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  login(userInfo: IUserInfo): Observable<any> {
    return this.http.post<any>(this.apiURL + "/login", userInfo)
      .pipe(map(response => {
        localStorage.setItem('token', response.token);
        this.setUserDetails();
        return response;
      }));
  }

  setUserDetails() {
    if (localStorage.getItem('token')) {
      const userDetails = new IUser();
      const decodeUserDetails = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));

      userDetails.userId = decodeUserDetails.unique_name;
      userDetails.firstName = decodeUserDetails.firstName;
      userDetails.initials = userDetails.firstName.split(' ').map(x => x[0]).join('');
      //userDetails.userName =
      userDetails.role = decodeUserDetails.role;
      userDetails.isLoggedIn = true;

      this.userData.next(userDetails);
      this.userIsLoggedIn = true;
      this.userId = userDetails.userId;
      this.userRole = userDetails.role;
    }
  }

  getToken(): string {
    return localStorage.getItem("token");
  }

  logout() {
    localStorage.removeItem("token");
    this.userRole = '';
    this.userIsLoggedIn = false;
    this.userId = 0;
    this.userData.next(new IUser());
  }

  userIsLogged(): boolean {

    if (!this.getToken()) {
      return false;
    }

    this.setUserDetails();
    return true;
  }

  getUserRole(): string {
    return this.userRole;
  }

}
