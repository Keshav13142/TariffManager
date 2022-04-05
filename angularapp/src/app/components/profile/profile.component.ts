import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Employee } from 'src/app/services/Employee/Employee';
import { EmployeeService } from 'src/app/services/Employee/employee.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  emp: Employee;
  status: string;
  constructor(public empService: EmployeeService, private snack: MatSnackBar) {
  }

  ngOnInit(): void {
    this.setEmployee();
  }
  setEmployee() {
    this.emp=this.empService.getEmployee();
    if (this.emp.active == true)
          this.status = "ACTIVE";
        else
          this.status = "INACTIVE";
  }
}
