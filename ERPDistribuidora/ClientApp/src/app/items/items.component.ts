import { Component, OnInit } from '@angular/core';
import { ItemsService } from './items.service';
import { MatDialog } from '@angular/material';
import { IItem } from './item';
import { DeleteConfirmationComponent } from '../home/delete-confirmation.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: IItem[];

  constructor(private itemsService: ItemsService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  deleteConfirm(item: IItem) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: {
        message: "Producto " + item.id + " - " + item.name + "."
      }
    });

    dialogRef.afterClosed().subscribe(confirmresult => {
      if (confirmresult) {
        this.delete(item);
        //console.log("Borrado confirmado por el usuario.");
      } else {
        //console.log("Borrado cancelado por el usuario.");
      }
    });

  }

  delete(item: IItem) {
    this.itemsService.deleteItem(item)
      .subscribe(item => this.loadData(),
        error => console.error(error));
  }

  loadData() {
    this.itemsService.getItems()
      .subscribe(items => this.items = items,
        error => console.error(error));
  }
}
