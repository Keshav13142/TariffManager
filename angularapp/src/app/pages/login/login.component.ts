import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  hide_cf = true;
  public login = {
    email: '',
    password: '',
    role: '',
  };
  constructor(
    private router: Router,
    public loginService: LoginService,
    public snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('role') != null) {
      this.router.navigate([localStorage.getItem('role')]);
    } else {
      localStorage.clear();
    }
  }
  validate() {
    if (
      this.login.email.trim() == null ||
      this.login.password.trim() == null ||
      this.login.email.trim() == '' ||
      this.login.password.trim() == ''
    ) {
      this.snack.open('Email or Password cannot be empty', 'ok', {
        duration: 3000,
      });
      return;
    }
    this.loginService.login(this.login);
  }
  clear() {
    this.login.email = '';
    this.login.password = '';
  }
}
