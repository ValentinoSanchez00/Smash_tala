import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private apiUrl = 'http://localhost:3000/log';
  constructor(private http: HttpClient) { }
  getLogs(page: number = 1, limit: number = 10) {
    return this.http.get<any>(this.apiUrl+`?page=${page}&limit=${limit}`);
  }
  getLogsMes(page: number = 1, limit: number = 10){
    return this.http.get<any>(this.apiUrl+"/mes"+`?page=${page}&limit=${limit}`);
  }
}
