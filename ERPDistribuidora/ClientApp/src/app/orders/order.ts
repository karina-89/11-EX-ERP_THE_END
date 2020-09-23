import { ICustomer } from "../customers/customer";
import { IOrderLine } from "../orderlines/orderline";
import { IEmployee } from "../employees/employee";

export interface IOrder {
  id: number;
  customerId: number;
  customer: ICustomer;
  employeeId: number;
  employee: IEmployee;
  creationDate: Date;
  shipDate: Date;
  assignDate: Date;
  orderStatus: string;
  orderLines: IOrderLine[];
}
