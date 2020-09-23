import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { AccountService } from '../account/account.service';
import { MatDialog } from '@angular/material';
import { IOrder } from './order';
import { DeleteConfirmationComponent } from '../home/delete-confirmation.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: IOrder[];
  filterById: number;

  constructor(private ordersService: OrdersService,
    private accountService: AccountService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.accountService.setUserDetails();
    if (this.accountService.getUserRole() != 'Admin') {
      this.filterById = this.accountService.userId;
    }

    this.loadData();
  }

  deleteConfirm(order: IOrder) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: {
        message: "Pedido " + order.id + " del cliente " + order.customer.name + "."
      }
    });

    dialogRef.afterClosed().subscribe(confirmresult => {
      if (confirmresult) {
        this.delete(order);
        //console.log("Borrado confirmado por el usuario.");
      } else {
        //console.log("Borrado cancelado por el usuario.");
      }
    });

  }

  delete(order: IOrder) {
    this.ordersService.deleteOrder(order)
      .subscribe(orders => this.loadData(),
        error => console.error(error));
  }

  loadData() {
    if (this.filterById == null) {
      this.ordersService.getOrders()
        .subscribe(orders => this.orders = orders,
          error => console.error(error));
    } else {
      console.log('Filter by: ' + this.filterById);
      this.ordersService.getOrdersByEmployee(this.filterById)
        .subscribe(orders => this.orders = orders,
          error => console.error(error));
    }
  }
}
