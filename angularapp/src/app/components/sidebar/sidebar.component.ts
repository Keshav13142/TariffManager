import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  role = '';
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
  }
  status: boolean = false;
  clickEvent() {
    this.status = !this.status;
  }
}
