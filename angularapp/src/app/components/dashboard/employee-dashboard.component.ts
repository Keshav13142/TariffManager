import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/services/Employee/Employee';
import { EmployeeService } from 'src/app/services/Employee/employee.service';
import { Expense } from 'src/app/services/expense/Expense';
import { ExpenseService } from 'src/app/services/expense/expense.service';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  role = '';
  email = '';
  expense: Expense[] = [];
  emp = {
    active: null,
    email: null,
    mobileNumber: null,
    password: null,
    role: null,
    username: null,
  };
  approved: number;
  pending: number;
  total: number;
  totalemp: number;
  declined: number;
  employees: Employee[] = [];
  constructor(
    private snack: MatSnackBar,
    private expenseService: ExpenseService,
    private empService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.setEmployee();
    this.setDetails();
  }
  setExpenses() {
    this.expense = this.expenseService.getExpenses();
  }
  setEmployee() {
    this.emp = this.empService.getEmployee();
    if (this.role == 'manager') {
      this.employees = this.empService.getAllEmp();
    }
  }
  setDetails() {
    this.setExpenses();
    this.declined = 0;
    this.approved = 0;
    this.pending = 0;
    this.total = 0;
    this.totalemp = 0;
    for (let i = 0; i < this.expense.length; i++) {
      if (this.expense[i].status == 'approved') {
        this.approved += this.expense[i].billCost;
      }
      if (this.expense[i].status == 'pending') {
        this.pending += this.expense[i].billCost;
      }
      if (this.expense[i].status == 'declined') {
        this.declined += this.expense[i].billCost;
      }
      this.total += this.expense[i].billCost;
    }
    if (this.emp.role == 'manager') {
      for (let i = 0; i < this.employees.length; i++) {
        if (this.employees[i].role == 'employee') this.totalemp++;
      }
    }
  }
  refresh() {
    this.setDetails();
  }
}
