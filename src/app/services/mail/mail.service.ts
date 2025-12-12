import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Mail{
  to: string;
  subject:string;
  body:string;
}
@Injectable({
  providedIn: 'root'
})
export class MailService {
  private apiURL = `${environment.apiUrl}/Mail`
  constructor(private http: HttpClient) { }

  SendMail(mail:Mail):Observable<any>{
    return this.http.post(`${this.apiURL}/send`,mail)
  }
}
