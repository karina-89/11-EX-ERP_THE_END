import { IItem } from "../items/item";

export interface IOrderLine {
  orderId: number;
  id: number;
  itemId: number;
  description: string;
  quantity: number;
  price: number;
  amount: number;
  item: IItem;
}
