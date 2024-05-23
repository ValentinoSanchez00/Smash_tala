import { PedidoService } from './../../../services/pedido.service';
import { Component, OnInit } from '@angular/core';

import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  perfil:any;
  constructor(private local: LocalstorageService,private PedidoService:PedidoService){
   this.perfil=JSON.parse(sessionStorage.getItem('user') ||'{}');
   console.log(this.perfil);

  }
  
  
  OnInit(): void {
 
    
  }

}
