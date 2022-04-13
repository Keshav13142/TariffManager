import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExpenseService } from 'src/app/services/expense/expense.service';
import { ManagerService } from 'src/app/services/manager/manager.service';

@Component({
  selector: 'app-manager-decline',
  templateUrl: './manager-decline.component.html',
  styleUrls: ['./manager-decline.component.css'],
})
export class ManagerDeclineComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public expense: any,
    public this_dialog: MatDialogRef<ManagerDeclineComponent>,
    public expenseService: ExpenseService,
    private managerService: ManagerService
  ) {}
  role: string;
  date: any;
  remarks: '';
  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.setDate();
    this.this_dialog.backdropClick().subscribe((result) => {
      this.this_dialog.close(false);
    });
  }
  setDate() {
    this.date = new Date(this.expense.datedOn).toLocaleDateString();
    if (this.expense.remark == '' || this.expense.remark == null)
      this.expense.remark == 'Processing';
  }
  close() {
    this.this_dialog.close();
  }
  submit() {
    this.expense.status = 'declined';
    this.expense.remark = this.remarks;
    this.managerService.updateExpense(this.expense).subscribe(
      (data: any) => {
        this.this_dialog.close(true);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
