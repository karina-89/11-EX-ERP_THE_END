import { Component } from '@angular/core';
import { AccountService } from '../account/account.service';
import { IUser } from '../account/user';
import { IUserRole } from '../account/roles';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  userData = new IUser();
  userRole = IUserRole;
  userDataSubscription: any;

  constructor(private accountService: AccountService,
    private router: Router) {
    this.accountService.setUserDetails();
    this.userDataSubscription = this.accountService.userData.asObservable()
      .subscribe(data => { this.userData = data });
  }

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/']);
  }

  userIsLogged() {
    return this.accountService.userIsLogged();
  }
}
