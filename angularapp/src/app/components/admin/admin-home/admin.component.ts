import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Employee } from 'src/app/services/Employee/Employee';
import { EmployeeService } from 'src/app/services/Employee/employee.service';
import { DeleteEmployeeComponent } from '../delete-employee/delete-employee.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { ViewemployeeComponent } from '../viewemployee/viewemployee.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  search = "Name";
  searchVal = ""; 
  empList: Employee[] = [];
  empl: Employee[] = [];
  constructor(private adminService: AdminService, public router: Router, private snack: MatSnackBar, private employeeService: EmployeeService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.setEmployees();
  }
  view(empl: any) {
    const dialogRef = this.dialog.open(ViewemployeeComponent, { data: empl });
    dialogRef.afterClosed().subscribe(result => {});
  }
  edit(empl: any) {
    const dialogRef = this.dialog.open(EditEmployeeComponent, { data: empl });
    dialogRef.afterClosed().subscribe(result => {
      if(result)
      this.refresh();
    });
  }
  delete(empl: any) {
    const dialogRef = this.dialog.open(DeleteEmployeeComponent, { data: empl });
    dialogRef.afterClosed().subscribe(result => {
      if(result)
      this.refresh();
    });
  }
  Search() {
    this.empl = this.empList;
    if (this.search == "Name") {
      this.empl = this.empl.filter(res => {
        return res.username.toLocaleLowerCase().match(this.searchVal.toLocaleLowerCase());
      });
    }
    if (this.search == "Email") {
      this.empl = this.empl.filter(res => {
        return res.email.toLocaleLowerCase().match(this.searchVal.toLocaleLowerCase());
      });
    }
  }
  reset() {
    this.searchVal = "";
    this.empl = this.empList;
  }
  setEmployees() {
    this.empList = this.adminService.getEmployees();
    this.empl = this.adminService.getEmployees();
  }
  refresh()
  {
    this.adminService.setAllEmployees().subscribe(
      (data: Employee[]) => {
        this.empList=data;
        this.empl=data;
        sessionStorage.setItem("adminAllEmp",JSON.stringify(data));
      },
      (error) => {
        this.snack.open("Something Went wrong", "OK", { duration: 3000 });
      }
    );
  }
}
