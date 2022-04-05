import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/services/Employee/Employee';
import { EmployeeService } from 'src/app/services/Employee/employee.service';
import { ExpenseService } from 'src/app/services/expense/expense.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
})
export class AddExpenseComponent implements OnInit {
  status: boolean;
  curr_date = new Date();
  max_date = new Date(
    this.curr_date.getFullYear(),
    this.curr_date.getMonth() + 1,
    0
  );
  min_date = new Date(
    this.curr_date.getFullYear(),
    this.curr_date.getMonth(),
    1
  );
  message: '';
  receipt: any = File;
  email = '';
  curr_mon = 0;
  limit = 0;
  date = new FormControl({ values: '', disabled: true });
  public emp: Employee;
  expense = {
    expenseId: null,
    description: null,
    billNumber: null,
    billCost: null,
    datedOn: null,
    claimedBy: null,
  };
  constructor(
    private snack: MatSnackBar,
    public expenseService: ExpenseService,
    private empService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.date.disable();
    this.email = localStorage.getItem('email');
    this.setEmployees();
    this.setLimit();
  }
  submit() {
    if (
      this.date.value == null ||
      this.expense.billCost <= 0 ||
      this.expense.billCost == null
    )
      this.snack.open('Price or Date Cannot be Empty!!', 'Ok');
    else if (this.expense.billCost > this.limit) {
      Swal.fire({
        title: "This month's quota Exceeded limit",
        text: `Quota Left : ${this.limit}`,
        icon: 'warning',
        confirmButtonColor: '#F80707',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.close();
        }
      });
    } else {
      this.expense.billNumber = this.getRandomInt(
        this.date.value.getSeconds(),
        2000
      );
      this.expense.expenseId = 'exp_' + this.date.value.getTime();
      this.expense.claimedBy = this.emp;
      this.expense.datedOn = this.date.value;
      const formData = new FormData();
      formData.append('expense', JSON.stringify(this.expense));
      formData.append('file', this.receipt);
      this.expenseService.saveExpense(formData).subscribe(
        (data: any) => {
          this.snack.open('Expense Added Sucessfully', 'OK', {
            duration: 2000,
          });
          this.expenseService.setLimit(this.emp.email);
          this.expenseService.storeEmpExpenseByEmail(this.emp.email);
        },
        (error) => {
          console.log(error);
          this.snack.open('Something Went Wrong', 'OK', { duration: 2000 });
        }
      );
    }
  }
  setEmployees() {
    this.emp = this.empService.getEmployee();
  }
  setLimit() {
    this.expenseService.setLimit(this.emp.email).subscribe(
      (data: number) => {
        this.curr_mon = data;
        if (this.curr_mon > 5000) {
          this.limit = 0;
        } else {
          this.limit = 5000 - this.curr_mon;
        }
        if (this.limit == 0) this.status = false;
        else this.status = true;
      },
      (error) => {
        console.log(error);
      }
    );
    if (this.curr_mon == null) {
      this.curr_mon = 0;
    }
  }

  selectFile(event) {
    const file = event.target.files[0];
    this.receipt = file;
  }
  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    let res = Math.floor(Math.random() * (max - min + 1)) + min;
    return res;
  }
}
