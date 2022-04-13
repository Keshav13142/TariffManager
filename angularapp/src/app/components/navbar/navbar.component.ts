import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(public loginService: LoginService) {}

  ngOnInit(): void {}
  Logout() {
    this.loginService.logout();
    localStorage.clear();
    localStorage.clear();
  }
}
