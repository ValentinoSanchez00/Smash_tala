import { Router } from '@angular/router';
import { PedidoService } from './../../../services/pedido.service';
import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  perfil: any;

  constructor(private local: LocalstorageService, private PedidoService: PedidoService,private Router: Router) {
    this.perfil = JSON.parse(sessionStorage.getItem('user') || '{}');
  }
  comprobar(){
    let isLoaded = sessionStorage.getItem('isLoad');
    console.log(isLoaded);

    if(isLoaded === null || isLoaded === 'false') {
      this.Router.navigate(['/home']);
    }

  }

  ngOnInit(): void {
   this.comprobar();
  }
}
