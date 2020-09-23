import { Component, OnInit } from '@angular/core';
import { EmployeesService } from './employees.service';
import { MatDialog } from '@angular/material';
import { IEmployee } from './employee';
import { DeleteConfirmationComponent } from '../home/delete-confirmation.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: IEmployee[];

  constructor(private employeesService: EmployeesService, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  deleteConfirm(employee: IEmployee) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: {
        message: "Empleado " + employee.id + " - " + employee.name + "."
      }
    });

    dialogRef.afterClosed().subscribe(confirmresult => {
      //console.log(confirmresult);
      if (confirmresult) {
        this.delete(employee);
        //console.log("Borrado confirmado por el usuario.");
      } else {
        //console.log("Borrado cancelado por el usuario.");
      }
    });

  }

  delete(employee: IEmployee) {
    this.employeesService.deleteEmployee(employee)
      .subscribe(employee => this.loadData(),
        error => console.error(error));
  }

  loadData() {
    this.employeesService.getEmployees()
      .subscribe(employees => this.employees = employees,
        error => console.error(error));
  }
}
