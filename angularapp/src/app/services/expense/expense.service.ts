import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iif, Observable } from 'rxjs';
import baseUrl from '../url';
import { Expense } from './Expense';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(public http: HttpClient) {}
  public setAllExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${baseUrl}/expense`);
  }
  public saveExpense(formData: any): Observable<any> {
    return this.http.post(`${baseUrl}/expense/v1`, formData);
  }
  public updateExpense(expense: Expense): Observable<String> {
    return this.http.put<String>(
      `${baseUrl}/expense/${expense.expenseId}`,
      expense
    );
  }
  public setExpense(email: string) {
    return this.http.get<Expense[]>(`${baseUrl}/expense/${email}`);
  }
  public storeEmpExpenseByEmail(email: string) {
    this.setExpense(email).subscribe(
      (data: Expense[]) => {
        sessionStorage.setItem('expenses', JSON.stringify(data));
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public getExpenses() {
    return JSON.parse(sessionStorage.getItem('expenses'));
  }
  public deleteExpense(expenseId: string): Observable<String> {
    return this.http.delete<String>(`${baseUrl}/manager/${expenseId}`);
  }
  public setLimit(email: string): Observable<number> {
    return this.http.get<number>(`${baseUrl}/expense/sum-month/${email}`);
  }
}
