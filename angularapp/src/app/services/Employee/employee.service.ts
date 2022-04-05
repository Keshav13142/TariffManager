import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from '../admin/admin.service';
import { ExpenseService } from '../expense/expense.service';
import { ManagerService } from '../manager/manager.service';

import baseUrl from '../url';
import { Employee } from './Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  role: string;
  constructor(private managerService: ManagerService, public snack: MatSnackBar, public http: HttpClient, private router: Router, private adminService: AdminService, private expenseService: ExpenseService) { }
  public setEmployee(email: string) {
    this.http.get<Employee>(`${baseUrl}/employee/${email}`).subscribe(
      (data: Employee) => {
        if (data.active == false) {
          Swal.fire("Account not Authorized","Contact Admin for Further Details","info");
          return;
        }
        else {
          sessionStorage.setItem("role", data.role);
          if (data.role == "admin") {
            this.adminService.storeAllAdminEmployees();
          }
          else if (data.role == "manager") {
            this.expenseService.storeEmpExpenseByEmail(data.email);
            this.managerService.storeAllManagerExpenses();
            this.setAllEmployees();
          }
          else if (data.role == "employee") {
            this.expenseService.storeEmpExpenseByEmail(data.email);
          }
          sessionStorage.setItem("emp", JSON.stringify(data));
          Swal.fire({
            title: 'Welcome',
            text: "Login Success!",
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate([data.role]);
            }
          });
        }
      },
      (error) => {
        this.snack.open("Something Went Wrong", "OK", { duration: 3000 });
      }
    );
  }
  public setAllEmployees() {
    this.http.get<Employee[]>(`${baseUrl}/manager/emp`).subscribe(
      (data: Employee[]) => {
        sessionStorage.setItem("Allemp", JSON.stringify(data));
      },
      (error) => {
        this.snack.open("Something Went Wrong", "OK", { duration: 3000 });
      }
    );
  }
  public getEmployee() {
    return JSON.parse(sessionStorage.getItem("emp"));
  }
  public getAllEmp() {
    return JSON.parse(sessionStorage.getItem("Allemp"));
  }
}
