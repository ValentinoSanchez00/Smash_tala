import { Injectable } from '@angular/core';
import { Hamburguer } from '../shared/models/Food';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private apiUrl = 'http://localhost:3000/hamburguesa';
  constructor(private http: HttpClient) { }


  getAll(): Observable<Hamburguer[]> {
    let data=this.http.get<Hamburguer[]>(this.apiUrl);
    return data;
  }


  getAllFoodBySearchTerm(searchTerm: string): Observable<Hamburguer[]> {
    return this.http.get<Hamburguer[]>(`${this.apiUrl}?searchTerm=${searchTerm}`);
  }

  getFoodById(foodId: number): Observable<Hamburguer[]> {
    return this.http.get<Hamburguer[]>(`${this.apiUrl}/${foodId}`);
  }

  getAlergenos(foodId: number):Observable<any>{
    return this.http.get<any>(`http://localhost:3000/hamburguesa/${foodId}/ingredientes-alergenos`);
  }




}