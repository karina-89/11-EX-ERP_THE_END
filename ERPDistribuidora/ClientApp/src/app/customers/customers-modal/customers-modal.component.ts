import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomersService } from '../customers.service';
import { MatDialogRef, MatTableDataSource, MatPaginator } from '@angular/material';
import { ICustomer } from '../customer';

@Component({
  selector: 'app-customers-modal',
  templateUrl: './customers-modal.component.html',
  styleUrls: ['./customers-modal.component.css']
})
export class CustomersModalComponent implements OnInit {

  selectedRowIndex: number;

  customers: ICustomer[];
  displayedColumns: string[] = ['id', 'name', 'address', 'postalCode', 'city', 'county'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private customersService: CustomersService, private dialogRef: MatDialogRef<CustomersModalComponent>) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.customersService.getCustomers()
      .subscribe(customers => this.updateDataSource(customers),
        error => console.error(error));
  }

  updateDataSource(customers: ICustomer[]) {
    this.customers = customers;
    this.dataSource = new MatTableDataSource(this.customers);
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
