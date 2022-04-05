import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin/admin.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-add-employee',
  templateUrl: './admin-add-employee.component.html',
  styleUrls: ['./admin-add-employee.component.css']
})
export class AdminAddEmployeeComponent implements OnInit {

  hide = true;
  hide_cf = true;
  pass_match = true;
  pass = '';
  emp = {
    id: null,
    active:true,
    email: null,
    mobileNumber: null,
    password: null,
    role: 'employee',
    username: null,
  };
  constructor(private adminService: AdminService, private snack: MatSnackBar) { }

  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Cannot be Empty';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  ngOnInit(): void {
  }
  formSubmit() {
    if (this.emp.username == '' || this.emp.username == null || this.emp.email == '' || this.emp.email == null) {
      this.snack.open("Mandatory fields cannot be empty", "ok", {
        duration: 3000,
      });
      return;
    }
    if (this.emp.password != this.pass) {
      this.pass_match = false;
      this.snack.open("Passwords Don't Match", "OK", {
        duration: 3000,
      });
    }
    else {
      this.adminService.addEmployees(this.emp).subscribe(
        (data: any) => {
          this.snack.open("Added Successfully", "ok", { duration: 3000 });
          this.adminService.storeAllAdminEmployees();
        },
        (error: HttpErrorResponse) => {
          Swal.fire("Employee with email " + this.emp.email + " already Exists", "Cannot add duplicates", "error");
          console.log(error.error);
        }
      );

    }
  }

}
