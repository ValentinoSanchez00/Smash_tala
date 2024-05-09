;
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  private dataSubject = new BehaviorSubject<any>(null);

  constructor() {
    this.syncData();
  }

  private syncData() {
    // Obtener los datos iniciales del sessionStorage
    const data = JSON.parse(sessionStorage.getItem('id_token_claims_obj') || '{}');
    this.dataSubject.next(data);

    // Escuchar los cambios en el sessionStorage y emitirlos al BehaviorSubject
    window.addEventListener('storage', () => {
      const newData = JSON.parse(sessionStorage.getItem('id_token_claims_obj') || '{}');
      this.dataSubject.next(newData);
    });
  }

  setData(key: string, value: any) {
    const newData = { ...this.dataSubject.getValue(), [key]: value };
    sessionStorage.setItem('id_token_claims_obj', JSON.stringify(newData));
    this.dataSubject.next(newData);
  }

  getData(): BehaviorSubject<any> {
    return this.dataSubject;
  }
}