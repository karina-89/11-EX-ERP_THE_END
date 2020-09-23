import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeesService } from '../employees.service';
import { MatDialogRef, MatTableDataSource, MatPaginator } from '@angular/material';
import { IEmployee } from '../employee';

@Component({
  selector: 'app-employees-modal',
  templateUrl: './employees-modal.component.html',
  styleUrls: ['./employees-modal.component.css']
})
export class EmployeesModalComponent implements OnInit {

  selectedRowIndex: number;

  employees: IEmployee[];
  displayedColumns: string[] = ['id', 'name'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private employeesService: EmployeesService, private dialogRef: MatDialogRef<EmployeesModalComponent>) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.employeesService.getEmployees()
      .subscribe(employees => this.updateDataSource(employees),
        error => console.error(error));
  }

  updateDataSource(employees: IEmployee[]) {
    this.employees = employees;
    this.dataSource = new MatTableDataSource(this.employees);
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
