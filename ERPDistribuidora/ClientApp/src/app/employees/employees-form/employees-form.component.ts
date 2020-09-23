import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeesService } from '../employees.service';
import { OrdersService } from '../../orders/orders.service';
import { AccountService } from '../../account/account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IOrder } from '../../orders/order';
import { IEmployee } from '../employee';

@Component({
  selector: 'app-employees-form',
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.css']
})
export class EmployeesFormComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private employeesService: EmployeesService,
    private ordersService: OrdersService,
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  editMode: boolean = false;
  formGroup: FormGroup;
  employeeId: number;
  roles = [
    { id: 'Admin', name: 'Administrador' },
    { id: 'User', name: 'Usuario' }
  ];
  lastRole: string;
  orders: IOrder[];

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: '',
      address: '',
      city: '',
      postalCode: '',
      county: '',
      salary: 0,
      userName: '',
      password: '',
      role: ''
    });

    this.activatedRoute.params.subscribe(params => {
      if (params["id"] == undefined) {
        return;
      }

      this.editMode = true;

      this.employeeId = params["id"];

      this.employeesService.getEmployee(this.employeeId.toString())
        .subscribe(item => this.loadForm(item),
          error => this.router.navigate(["/employees"]));
    });
    this.accountService.setUserDetails();
    if (this.employeeId === this.accountService.userId) {
      this.formGroup.controls['role'].disable();
    }
  }

  loadForm(employee: IEmployee) {
    this.formGroup.patchValue({
      name: employee.name,
      address: employee.address,
      city: employee.city,
      postalCode: employee.postalCode,
      county: employee.county,
      salary: employee.salary,
      userName: employee.userName,
      password: employee.password,
      role: employee.role
    });
    this.lastRole = employee.role;

    this.ordersService.getOrdersByEmployee(employee.id)
      .subscribe(orders => this.orders = orders,
        error => console.error(error));

  }

  save() {
    let employee: IEmployee = Object.assign({}, this.formGroup.value);

    if (this.editMode) {
      employee.id = this.employeeId;
      employee.role = this.lastRole;
      this.employeesService.updateEmployee(employee)
        .subscribe(item => this.onSaveSucess(),
          error => console.error(error));
    } else {
      this.employeesService.createEmployee(employee)
        .subscribe(item => this.onSaveSucess(),
          error => console.error(error));
    }
  }

  onSaveSucess() {
    this.router.navigate(["/employees"]);
  }
}
