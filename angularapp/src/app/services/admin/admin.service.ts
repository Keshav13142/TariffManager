import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Employee } from '../Employee/Employee';
import baseUrl from '../url';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient, private snack: MatSnackBar) { }
  public setAllEmployees() {
    return this.http.get<Employee[]>(`${baseUrl}/admin`);
  }
  public storeAllAdminEmployees() {
    this.setAllEmployees().subscribe(
      (data: Employee[]) => {
        sessionStorage.setItem("adminAllEmp", JSON.stringify(data));
      },
      (error) => {
        this.snack.open("Something Went wrong", "OK", { duration: 3000 });
      }
    );
  }

  public setEmployee(email: string) {
    this.http.get<Employee>(`${baseUrl}/admin/${email}`).subscribe(
      (data: any) => {
        sessionStorage.setItem("adminEmp", JSON.stringify(data));
      },
      (error) => {
        this.snack.open("Something Went wrong", "OK", { duration: 3000 });
      }
    );
  }
  public  getEmployee() {
    return JSON.parse(sessionStorage.getItem("adminEmp"));
  }
  public getEmployees() {
    return JSON.parse(sessionStorage.getItem("adminAllEmp"));
  }
  public addEmployees(emp: Employee): Observable<string> {
    return this.http.post<string>(`${baseUrl}/admin`, emp);
  }
  public updateEmployees(emp: Employee): Observable<string> {
    return this.http.put<string>(`${baseUrl}/admin/${emp.email}`, emp);
  }
  public deleteEmployees(email: string): Observable<string> {
    return this.http.delete<string>(`${baseUrl}/admin/${email}`);
  }
}

