import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemsService } from '../items.service';
import { MatDialogRef, MatTableDataSource, MatPaginator } from '@angular/material';
import { IItem } from '../item';

@Component({
  selector: 'app-items-modal',
  templateUrl: './items-modal.component.html',
  styleUrls: ['./items-modal.component.css']
})
export class ItemsModalComponent implements OnInit {

  selectedRowIndex: number;

  items: IItem[];
  displayedColumns: string[] = ['id', 'name', 'categoryName', 'price'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private itemsService: ItemsService, private dialogRef: MatDialogRef<ItemsModalComponent>) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.itemsService.getItems()
      .subscribe(items => this.updateDataSource(items),
        error => console.error(error));
  }

  updateDataSource(items: IItem[]) {
    this.items = items;
    this.dataSource = new MatTableDataSource(this.items);
    this.dataSource.paginator = this.paginator;

    this.dataSource.filterPredicate = (data, filter: string) => {
      const accumulator = (currentTerm, key) => {
        return this.nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    }
  }

  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onRowClicked(row) {
    this.selectedRowIndex = row.id;
  }

  onAcceptButton() {
    this.dialogRef.close(this.selectedRowIndex);
  }

  onCancelButton() {
    this.dialogRef.close();
  }
}
