import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin/admin.service';
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  status = "active";
  hide = true;
  hide_cf = true;
  pass = '';
  pass_match = true;
  constructor(public dialog: MatDialog, private diag: MatDialogRef<EditEmployeeComponent>, private snack: MatSnackBar, private adminService: AdminService, @Inject(MAT_DIALOG_DATA) public emp: any) { }

  ngOnInit(): void {
    this.diag.backdropClick().subscribe(result => {
      this.diag.close(false);
    });
  }
  close() {
    this.diag.close(false);
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
      this.snack.open("Passwords Don't Match", "OK");
    }
    else {
      if (this.status == "active") { this.emp.active = true; }
      else { this.emp.active = false; }
      this.adminService.updateEmployees(this.emp).subscribe(
        (data) => {
          this.diag.close(true);
          this.snack.open("Updated Successfully", "OK", {
            duration: 3000
          });
          this.adminService.setAllEmployees();
          this.diag.close(true);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
