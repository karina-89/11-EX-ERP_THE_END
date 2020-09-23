import { IItem } from "../items/item";

export interface IItemsCategory {
  id: number;
  name: string;
  items: IItem[];
}
