import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/services/Employee/Employee';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ViewExpenseComponent } from '../../employee/view-expense/view-expense.component';
@Component({
  selector: 'app-viewemployee',
  templateUrl: './viewemployee.component.html',
  styleUrls: ['./viewemployee.component.css']
})
export class ViewemployeeComponent implements OnInit {
  constructor(public dialog:MatDialogRef<ViewExpenseComponent>,@Inject(MAT_DIALOG_DATA) public emp: any) { }

  ngOnInit(): void {
  }
  close()
  {
    this.dialog.close();
  }
}
