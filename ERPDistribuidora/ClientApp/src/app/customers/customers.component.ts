import { Component, OnInit } from '@angular/core';
import { CustomersService } from './customers.service';
import { MatDialog } from '@angular/material';
import { ICustomer } from './customer';
import { DeleteConfirmationComponent } from '../home/delete-confirmation.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: ICustomer[];

  constructor(private customerService: CustomersService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  deleteConfirm(customer: ICustomer) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: {
        message: "Cliente " + customer.id + " - " + customer.name + "."
      }
    });

    dialogRef.afterClosed().subscribe(confirmresult => {
      //console.log(confirmresult);
      if (confirmresult) {
        this.delete(customer);
        //console.log("Borrado confirmado por el usuario.");
      } else {
        //console.log("Borrado cancelado por el usuario.");
      }
    });

  }

  delete(customer: ICustomer) {
    this.customerService.deleteCustomer(customer)
      .subscribe(customer => this.loadData(),
        error => console.error(error));
  }

  loadData() {
    this.customerService.getCustomers()
      .subscribe(customers => this.customers = customers,
        error => console.error(error));
  }

}
