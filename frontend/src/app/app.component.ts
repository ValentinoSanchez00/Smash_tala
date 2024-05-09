import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from './services/localstorage.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  datos: any;

  constructor(private local: LocalstorageService) {}

  ngOnInit(): void {
   
  }
}
