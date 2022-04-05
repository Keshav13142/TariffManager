import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Expense } from '../expense/Expense';
import baseUrl from '../url';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private router:Router , private http :HttpClient) { }
  public updateExpense(expense:Expense):Observable<any>{
       return this.http.put(`${baseUrl}/manager/expense/${expense.expenseId}`,expense);
  }
  public deleteExpense(expense:Expense):Observable<any>{
    return this.http.delete(`${baseUrl}/manager/expense/${expense.expenseId}`);
}
public setAllExpenses(){
  return this.http.get(`${baseUrl}/manager`);
}
public storeAllManagerExpenses()
{
  this.setAllExpenses().subscribe(
    (data:Expense[])=>{
      sessionStorage.setItem("managerExp",JSON.stringify(data));
    },
    (error)=>{
      console.log(error);
    }
  );
}
public getAllExpenses(){
  return JSON.parse(sessionStorage.getItem("managerExp"));
}
}
