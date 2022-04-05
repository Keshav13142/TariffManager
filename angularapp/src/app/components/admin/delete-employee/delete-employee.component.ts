import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin/admin.service';
import { EmployeeService } from 'src/app/services/Employee/employee.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css'],
})
export class DeleteEmployeeComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private diag: MatDialogRef<DeleteEmployeeComponent>,
    private snack: MatSnackBar,
    private adminService: AdminService,
    private empService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public emp: any
  ) {}

  ngOnInit(): void {
    this.diag.backdropClick().subscribe((result) => {
      this.diag.close(false);
    });
  }
  close() {
    this.diag.close(false);
  }
  delete() {
    this.adminService.deleteEmployees(this.emp.email).subscribe(
      (data) => {
        this.snack.open('Deleted Successfully', 'OK', {
          duration: 3000,
        });
        this.diag.close(true);
      },
      (error) => {
        console.log(error);
        error;
      }
    );
  }
}
