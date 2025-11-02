import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Register {
  userName: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private apiURL = `${environment.apiUrl}/Users`
  constructor(private http:HttpClient) { }

  register(register: Register):Observable<any>{
    return this.http.post(`${this.apiURL}/register`,register);
  }
}
