import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomersService } from '../customers.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../orders/orders.service';
import { IOrder } from '../../orders/order';
import { ICustomer } from '../customer';

@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.css']
})
export class CustomersFormComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private customerService: CustomersService,
    private ordersService: OrdersService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  editMode: boolean = false;
  formGroup: FormGroup;
  customerId: number;
  orders: IOrder[];

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: '',
      address: '',
      city: '',
      postalCode: '',
      county: ''
    });

    this.activatedRoute.params.subscribe(params => {
      if (params["id"] == undefined) {
        return;
      }

      this.editMode = true;

      this.customerId = params["id"];

      this.customerService.getCustomer(this.customerId.toString())
        .subscribe(customer => this.loadForm(customer),
          error => this.router.navigate(["/customers"]));
    });
  }

  loadForm(customer: ICustomer) {
    this.formGroup.patchValue({
      name: customer.name,
      address: customer.address,
      city: customer.city,
      postalCode: customer.postalCode,
      county: customer.county
    });

    this.ordersService.getOrdersByCustomer(customer.id)
      .subscribe(orders => this.orders = orders,
        error => console.error(error));
  }

  save() {
    let customer: ICustomer = Object.assign({}, this.formGroup.value);

    if (this.editMode) {
      customer.id = this.customerId;
      this.customerService.updateCustomer(customer)
        .subscribe(customer => this.onSaveSucess(),
          error => console.error(error));
    } else {
      this.customerService.createCustomer(customer)
        .subscribe(customer => this.onSaveSucess(),
          error => console.error(error));
    }
  }

  onSaveSucess() {
    this.router.navigate(["/customers"]);
  }

}
