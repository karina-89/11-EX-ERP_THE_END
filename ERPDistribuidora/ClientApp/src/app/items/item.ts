import { IItemsCategory } from "../itemscategories/itemscategory";

export interface IItem {
  id: number;
  name: string;
  price: number;
  itemsCategoryId: number;
  itemsCategory: IItemsCategory;
}
