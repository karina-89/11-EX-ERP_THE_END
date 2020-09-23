import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { IUserInfo } from '../user-info';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router) { }

  formGroup: FormGroup;

  ngOnInit() {
    this.formGroup = this.fb.group({
      userName: '',
      password: '',
    });
  }

  login() {
    let userInfo: IUserInfo = Object.assign({}, this.formGroup.value);
    this.accountService.login(userInfo).subscribe(token => {
      this.getToken(token);
    },
      error => this.handleError(error));
  }

  getToken(token) {
    localStorage.setItem('token', token.token);
    this.router.navigate([""]);
  }

  handleError(error) {
    if (error && error.error) {
      alert(error.error[""]);
    }
  }
}
