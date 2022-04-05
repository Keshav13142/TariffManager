import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Employee } from 'src/app/services/Employee/Employee';
import { DeleteEmployeeComponent } from '../delete-employee/delete-employee.component';
import { ViewemployeeComponent } from '../viewemployee/viewemployee.component';

@Component({
  selector: 'app-admin-authorize',
  templateUrl: './admin-authorize.component.html',
  styleUrls: ['./admin-authorize.component.css']
})
export class AdminAuthorizeComponent implements OnInit {

  role="employee";
  empList: Employee[] = [];
  notAuth: Employee[] = [];
  constructor(private adminService: AdminService, private snack: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.setEmployees();
  }
  setEmployees() {
    this.empList = this.adminService.getEmployees();
    this.setNotAuth();
  }
  setNotAuth()
  {
    this.notAuth = [];
    for (let emp of this.empList) {
      if (!emp.active) {
        this.notAuth.push(emp);
      }
    }
  }

  auth(emp: Employee, status: string) {
    let action: string;
    if (status == "true") {
      emp.role=this.role;
      emp.active = true;
      action = "Authorized";
    }
    else {
      this.delete(emp);
      return;
    }
    this.adminService.updateEmployees(emp).subscribe(
      (data) => {
        this.adminService.setAllEmployees().subscribe(
          (data:Employee[]) => {
            this.empList = data;
            this.setNotAuth();
            sessionStorage.setItem("adminAllEmp", JSON.stringify(data));
            this.snack.open("Employee " + action, "OK", {
              duration: 3000
            });
          },
          (error) => { console.log(error); }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }
  delete(empl: any) {
    const dialogRef = this.dialog.open(DeleteEmployeeComponent, { data: empl });
    dialogRef.afterClosed().subscribe(result => {
      if(result)
      this.refresh();
    });
  }
  view(empl: any) {
    const dialogRef = this.dialog.open(ViewemployeeComponent, { data: empl });
    dialogRef.afterClosed().subscribe(result => {
      this.setEmployees();
    });
  }
  refresh()
  {
   this.adminService.setAllEmployees().subscribe(
     (data:Employee[]) => {
       this.empList = data;
       this.setNotAuth();
       sessionStorage.setItem("adminAllEmp", JSON.stringify(data))
     },
     (error) => { console.log(error);
      this.snack.open("Something Went wrong", "OK", { duration: 3000 }); }
   );
  }
}
