import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/services/Employee/Employee';
import { Expense } from 'src/app/services/expense/Expense';
import { ManagerService } from 'src/app/services/manager/manager.service';
import { ViewExpenseComponent } from '../../employee/view-expense/view-expense.component';
import { ManagerDeclineComponent } from '../manager-decline/manager-decline.component';

@Component({
  selector: 'app-manager-approve',
  templateUrl: './manager-approve.component.html',
  styleUrls: ['./manager-approve.component.css'],
})
export class ManagerApproveComponent implements OnInit {
  emp: Employee;
  expenses: Expense[] = [];
  approved: Expense[] = [];
  pending: Expense[] = [];
  declined: Expense[] = [];
  constructor(
    public dialog: MatDialog,
    public managerService: ManagerService,
    private snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.emp = JSON.parse(localStorage.getItem('emp'));
    this.setExpenses();
  }
  public setExpenses() {
    this.expenses = this.managerService.getAllExpenses();
    this.seperate();
  }
  public approveExpense(exp: Expense) {
    exp.reviewedBy = this.emp.username;
    exp.status = 'approved';
    exp.remark = 'PAID';
    this.managerService.updateExpense(exp).subscribe(
      (data: any) => {
        this.snack.open('Expense Approved', 'ok', { duration: 3000 });
        this.refresh();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public declineExpense(e: Expense) {
    e.reviewedBy = this.emp.username;
    const dialogRef = this.dialog.open(ManagerDeclineComponent, { data: e });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refresh();
        this.snack.open('Expense Declined', 'ok', { duration: 3000 });
      }
    });
  }
  public deleteExpense(exp: Expense) {
    this.managerService.deleteExpense(exp).subscribe(
      (data: any) => {
        this.snack.open(data, 'ok', { duration: 3000 });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  view(exp: any) {
    exp.reviewedBy = this.emp.username;
    const dialogRef = this.dialog.open(ViewExpenseComponent, { data: exp });
    dialogRef.afterClosed().subscribe((result) => {});
  }
  refresh() {
    this.managerService.setAllExpenses().subscribe(
      (data: Expense[]) => {
        this.expenses = data;
        this.seperate();
        localStorage.setItem('managerExp', JSON.stringify(data));
      },
      (error) => {
        console.log(error);
      }
    );
  }
  seperate() {
    this.pending = [];
    this.approved = [];
    this.declined = [];
    for (let exp of this.expenses) {
      if (exp.claimedBy.email != this.emp.email) {
        if (exp.remark == '' || exp.remark == null) exp.remark = 'Processing';
        if (exp.status == 'approved') this.approved.push(exp);
        if (exp.status == 'pending') this.pending.push(exp);
        if (exp.status == 'declined') this.declined.push(exp);
      }
    }
  }
}
