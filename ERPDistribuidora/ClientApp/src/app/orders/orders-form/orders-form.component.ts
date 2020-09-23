import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { OrdersService } from '../orders.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { OrderlinesService } from '../../orderlines/orderlines.service';
import { ItemsService } from '../../items/items.service';
import { CustomersService } from '../../customers/customers.service';
import { EmployeesService } from '../../employees/employees.service';
import { AccountService } from '../../account/account.service';
import { IOrderLine } from '../../orderlines/orderline';
import { IOrder } from '../order';
import { DatePipe } from '@angular/common';
import { CustomersModalComponent } from '../../customers/customers-modal/customers-modal.component';
import { ICustomer } from '../../customers/customer';
import { EmployeesModalComponent } from '../../employees/employees-modal/employees-modal.component';
import { IEmployee } from '../../employees/employee';
import { ItemsModalComponent } from '../../items/items-modal/items-modal.component';
import { IItem } from '../../items/item';
import { DeleteConfirmationComponent } from '../../home/delete-confirmation.component';

@Component({
  selector: 'app-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.css']
})
export class OrdersFormComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private ordersService: OrdersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private orderLinesService: OrderlinesService,
    private itemsService: ItemsService,
    private customersService: CustomersService,
    private employeesService: EmployeesService,
    private accountService: AccountService) { }

  editField: string;
  editMode: boolean = false;
  formGroup: FormGroup;
  orderId: number;
  employeeId: number;
  linesToDelete: IOrderLine[] = [];
  orderStatuses = [
    { id: 'Pendiente de tratar' },
    { id: 'En proceso' },
    { id: 'En reparto' },
    { id: 'Entregado' },
    { id: 'Cancelado' }
  ];

  ngOnInit() {
    var dp = new DatePipe(navigator.language);
    var format = "yyyy-MM-dd";

    this.formGroup = this.fb.group({
      customerId: '',
      customerName: '',
      customerAddress: '',
      customerCity: '',
      customerCounty: '',
      creationDate: dp.transform(new Date(), format),
      shipDate: '',
      assignDate: dp.transform(new Date(), format),
      orderStatus: 'Pendiente de tratar',
      employeeId: 0,
      employeeName: '',
      totalAmount: 0,
      totalAmountInclVAT: 0,
      orderLines: this.fb.array([])
    });

    this.activatedRoute.params.subscribe(params => {
      if (params["id"] == undefined) {
        return;
      }

      this.editMode = true;

      this.orderId = params["id"];

      this.ordersService.getFullOrder(this.orderId.toString())
        .subscribe(order => this.loadForm(order),
          error => this.router.navigate(["/orders"]));
    });

    this.accountService.setUserDetails();
    if (this.accountService.getUserRole() != 'Admin') {
      this.formGroup.controls['employeeId'].disable();
      if (!this.editMode) {
        this.accountService.userData.subscribe(data => {
          this.employeeId = data.userId;
          this.formGroup.controls['employeeId'].setValue(data.userId);
          this.formGroup.controls['employeeName'].setValue(data.firstName);
        });
      }
    }
  }

  loadForm(order: IOrder) {
    var dp = new DatePipe(navigator.language);
    var format = "yyyy-MM-dd";
    this.formGroup.patchValue({
      customerId: order.customerId,
      customerName: order.customer.name,
      customerAddress: order.customer.address,
      customerCity: order.customer.postalCode + ' ' + order.customer.city,
      customerCounty: order.customer.county,
      creationDate: dp.transform(order.creationDate, format),
      shipDate: dp.transform(order.shipDate, format),
      assignDate: dp.transform(order.assignDate, format),
      orderStatus: order.orderStatus,
      employeeId: order.employeeId,
      employeeName: order.employee ? order.employee.name : '',
      totalAmount: 0,
      totalAmountInclVAT: 0,
      orderLines: order.orderLines
    });

    let orderLines = this.formGroup.controls['orderLines'] as FormArray;
    order.orderLines.forEach(line => {
      let lineFG = this.buildLine();
      lineFG.patchValue(line);
      orderLines.push(lineFG);
    });

    var forms = orderLines.controls as FormGroup[];
    var amountFormControls = forms.map(x => x.get('amount'));
    amountFormControls.forEach(a => a.setValue(parseFloat(a.value).toFixed(2)));

    var qtyFormControls = forms.map(x => x.get('quantity'));

    qtyFormControls.forEach(qfc => {
      var parent = qfc.parent; //FormGroup
      qfc.valueChanges.subscribe(qty => {
        var itemTotal = qty * parent.get('price').value;
        parent.get('amount').setValue(itemTotal.toFixed(2));
        this.updateSubtotal();
      })
    });
    if (qtyFormControls.length > 0) {
      this.updateSubtotal();
    }
  }

  selectCustomer(event) {
    event.srcElement.blur();
    event.preventDefault();
    const dialogRef = this.dialog.open(CustomersModalComponent);

    dialogRef.afterClosed().subscribe(confirmresult => {
      if (confirmresult) {
        this.customersService.getCustomer(confirmresult).subscribe(customer => this.validateCustomer(customer), error => console.error(error));
      }
    });
  }

  validateCustomer(customer: ICustomer) {
    this.formGroup.controls['customerId'].setValue(customer.id);
    this.formGroup.controls['customerName'].setValue(customer.name);
    this.formGroup.controls['customerAddress'].setValue(customer.address);
    this.formGroup.controls['customerCity'].setValue(customer.postalCode + ' ' + customer.city);
    this.formGroup.controls['customerCounty'].setValue(customer.county);
  }

  selectEmployee(event) {
    event.srcElement.blur();
    event.preventDefault();
    const dialogRef = this.dialog.open(EmployeesModalComponent);

    dialogRef.afterClosed().subscribe(confirmresult => {
      if (confirmresult) {
        this.employeesService.getEmployee(confirmresult).subscribe(employee => this.validateEmployee(employee), error => console.error(error));
      }
    })
  }

  validateEmployee(employee: IEmployee) {
    this.formGroup.controls['employeeId'].setValue(employee.id);
    this.formGroup.controls['employeeName'].setValue(employee.name);

    var dp = new DatePipe(navigator.language);
    var format = "yyyy-MM-dd";

    this.formGroup.controls['assignDate'].setValue(dp.transform(new Date(), format));
  }

  selectItem(event, index: number) {
    event.srcElement.blur();
    event.preventDefault();
    const dialogRef = this.dialog.open(ItemsModalComponent);

    dialogRef.afterClosed().subscribe(confirmresult => {
      if (confirmresult) {
        this.itemsService.getItem(confirmresult).subscribe(item => this.validateItem(index, item), error => console.error(error));
      }
    });
  }

  validateItem(index: number, item: IItem) {
    let lines = this.formGroup.get('orderLines') as FormArray;
    let lineToUpdate = lines.at(index) as FormGroup;
    lineToUpdate.controls['itemId'].setValue(item.id);
    lineToUpdate.controls['description'].setValue(item.name);
    lineToUpdate.controls['price'].setValue(item.price);
    var qty = lineToUpdate.controls['quantity'].value;
    if (qty != 0) {
      lineToUpdate.controls['amount'].setValue((qty * item.price).toFixed(2));
      this.updateSubtotal();
    }
  }

  save() {
    let order: IOrder = Object.assign({}, this.formGroup.value);

    if (this.editMode) {
      order.id = this.orderId;
      this.ordersService.updateOrder(order)
        .subscribe(() => this.updateLinesDeleted(),
          error => console.error(error));
    } else {
      if (this.employeeId != null) {
        order.employeeId = this.employeeId;
      }
      this.ordersService.createOrder(order)
        .subscribe(() => this.onSaveSucess(),
          error => console.error(error));
    }
  }

  updateLinesDeleted() {
    if (this.linesToDelete.length === 0) {
      this.onSaveSucess();
      return;
    }

    this.orderLinesService.deleteLines(this.linesToDelete)
      .subscribe(() => this.onSaveSucess(),
        error => console.error(error));
  }

  deleteLineConfirm(index: number) {
    let lines = this.formGroup.get('orderLines') as FormArray;
    let lineToDelete = lines.at(index) as FormGroup;
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: {
        message: "Línea " + lineToDelete.controls['id'].value + " del pedido " + lineToDelete.controls['orderId'].value + "."
      }
    });

    dialogRef.afterClosed().subscribe(confirmresult => {
      if (confirmresult) {
        this.deleteLine(index);
        //console.log("Borrado confirmado por el usuario.");
      } else {
        //console.log("Borrado cancelado por el usuario.");
      }
    });
  }

  deleteLine(index: number) {
    let lines = this.formGroup.get('orderLines') as FormArray;
    let lineToDelete = lines.at(index) as FormGroup;
    let orderLine: IOrderLine = Object.assign({}, lineToDelete.value);
    if (lineToDelete.controls['id'].value != '0') {
      this.linesToDelete.push(orderLine);
    }
    lines.removeAt(index);
    this.updateSubtotal();
  }

  addLine() {
    let orderLines = this.formGroup.get('orderLines') as FormArray;
    let lineFG = this.buildLine();
    orderLines.push(lineFG);

    var forms = orderLines.controls as FormGroup[];
    var qtyFormControls = forms.map(x => x.get('quantity'));

    qtyFormControls.forEach(qfc => {
      var parent = qfc.parent; //FormGroup
      qfc.valueChanges.subscribe(qty => {
        var itemTotal = qty * parent.get('price').value;
        parent.get('amount').setValue(itemTotal.toFixed(2));
        this.updateSubtotal();
      })
    });
    this.updateSubtotal();
  }

  buildLine() {
    return this.fb.group({
      id: '0',
      itemId: '',
      description: '',
      quantity: 0,
      price: 0,
      amount: 0.00,
      orderId: this.orderId != null ? this.orderId : 0
    });
  }

  onSaveSucess() {
    this.router.navigate(["/orders"]);
  }

  updateSubtotal() {
    var orderLines = this.formGroup.controls['orderLines'] as FormArray;
    var forms = orderLines.controls as FormGroup[];
    const newSubTotal = forms.map(x => +x.get('amount').value).reduce((acc, val) => acc + val);

    this.formGroup.controls.totalAmount.setValue(newSubTotal);
    this.formGroup.controls.totalAmountInclVAT.setValue(newSubTotal * 1.21);
  }
}
