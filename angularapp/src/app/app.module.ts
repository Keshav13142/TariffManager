import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserhomeComponent } from './pages/userhome/userhome.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserexpensesComponent } from './components/employee/userexpenses/userexpenses.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddExpenseComponent } from './components/employee/add-expense/add-expense.component';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { ViewExpenseComponent } from './components/employee/view-expense/view-expense.component';
import { ViewemployeeComponent } from './components/admin/viewemployee/viewemployee.component';
import { ManagerApproveComponent } from './components/manager/manager-approve/manager-approve.component';
import {MatSelectModule} from '@angular/material/select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { EditEmployeeComponent } from './components/admin/edit-employee/edit-employee.component';
import { DeleteEmployeeComponent } from './components/admin/delete-employee/delete-employee.component';
import { ViewFileComponent } from './components/employee/view-file/view-file.component';
import { AdminComponent } from './components/admin/admin-home/admin.component';
import { EmployeeDashboardComponent } from './components/dashboard/employee-dashboard.component';
import { AdminAddEmployeeComponent } from './components/admin/admin-add-employee/admin-add-employee.component';
import { AdminAuthorizeComponent } from './components/admin/admin-authorize/admin-authorize.component';
import { ManagerDeclineComponent } from './components/manager/manager-decline/manager-decline.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    UserhomeComponent,
    SidebarComponent,
    ProfileComponent,
    UserexpensesComponent,
    AddExpenseComponent,
    ViewExpenseComponent,
    AdminComponent,
    ViewemployeeComponent,
    ManagerApproveComponent,
    EditEmployeeComponent,
    DeleteEmployeeComponent,
    EmployeeDashboardComponent,
    ViewFileComponent,
    AdminAddEmployeeComponent,
    AdminAuthorizeComponent,
    ManagerDeclineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    NgxUiLoaderModule,
    ReactiveFormsModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true
    }),
    MatSelectModule,
    Ng2SearchPipeModule,
    MatRadioModule
  ],
  providers: [
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    UserhomeComponent,
    SidebarComponent,
    ProfileComponent,
    UserexpensesComponent,
    AddExpenseComponent,
    ViewExpenseComponent,
    AdminComponent,
    ViewemployeeComponent,
    ManagerApproveComponent,
    EditEmployeeComponent,
    DeleteEmployeeComponent,
    EmployeeDashboardComponent,
    ViewFileComponent,
    AdminAddEmployeeComponent,
    AdminAuthorizeComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
