import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from '../url';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }

  public saveUser(emp:any): Observable<Boolean>
  {
    return this.http.post<Boolean>(`${baseUrl}/signup`,emp);
  }
}
