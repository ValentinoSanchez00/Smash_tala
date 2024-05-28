import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private apiUrl = 'http://localhost:3000/log';
  constructor(private http: HttpClient) { }
  getLogs() {
    return this.http.get<any>(this.apiUrl);
  }
  getLogsMes(){
    return this.http.get<any>(this.apiUrl+"/mes");
  }
}
