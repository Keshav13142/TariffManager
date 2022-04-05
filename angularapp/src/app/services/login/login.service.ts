import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminService } from '../admin/admin.service';
import { EmployeeService } from '../Employee/employee.service';
import { ExpenseService } from '../expense/expense.service';
import { ManagerService } from '../manager/manager.service';
import baseUrl from '../url';
import { Login } from './Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  status = false;
  constructor(private expeneService: ExpenseService, private router: Router, public http: HttpClient, public snack: MatSnackBar, private empService: EmployeeService, private adminService: AdminService, private managerService: ManagerService) { }
  public login(login: Login) {
    return this.http.post<Boolean>(`${baseUrl}/login`, login).subscribe(
      (data: boolean) => {
        if (data == true) {
          this.setStatus(true);
          sessionStorage.setItem("email", login.email);
          this.empService.setEmployee(login.email);
        }
        else {
          this.snack.open("Invalid Credentials", "OK", {
            duration: 3000,
          });
        }
      },
      (error: HttpErrorResponse) => {
        this.snack.open("User Does Not exist", "OK", {
          duration: 3000,
        });
      }
    );
  }
  route() {
    let role = sessionStorage.getItem("role");
    this.router.navigate([role]);
  }
  public setStatus(s: boolean) {
    this.status = s;
  }
  public isLoggedIn() {
    return this.status;
  }
  public logout() {
    sessionStorage.clear();
    this.status = false;
  }
}