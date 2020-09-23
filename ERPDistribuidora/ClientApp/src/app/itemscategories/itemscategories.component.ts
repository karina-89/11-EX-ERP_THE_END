import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ItemscategoriesService } from './itemscategories.service';
import { IItemsCategory } from './itemscategory';
import { DeleteConfirmationComponent } from '../home/delete-confirmation.component';

@Component({
  selector: 'app-itemscategories',
  templateUrl: './itemscategories.component.html',
  styleUrls: ['./itemscategories.component.css']
})
export class ItemscategoriesComponent implements OnInit {

  itemsCategories: IItemsCategory[];

  constructor(private itemsCategoriesService: ItemscategoriesService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  deleteConfirm(itemsCategory: IItemsCategory) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: {
        message: "Categoría " + itemsCategory.id + " - " + itemsCategory.name + "."
      }
    });

    dialogRef.afterClosed().subscribe(confirmresult => {
      if (confirmresult) {
        this.delete(itemsCategory);
        //console.log("Borrado confirmado por el usuario.");
      } else {
        //console.log("Borrado cancelado por el usuario.");
      }
    });

  }

  delete(itemsCategory: IItemsCategory) {
    this.itemsCategoriesService.deleteItemCategory(itemsCategory)
      .subscribe(itemsCategory => this.loadData(),
        error => console.error(error));
  }

  loadData() {
    this.itemsCategoriesService.getItemsCategories()
      .subscribe(itemsCategories => this.itemsCategories = itemsCategories,
        error => console.error(error));
  }
}
