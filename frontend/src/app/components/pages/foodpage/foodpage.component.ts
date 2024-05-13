
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Hamburguer } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-foodpage',
  templateUrl: './foodpage.component.html',
  styleUrls: ['./foodpage.component.css']
})
export class FoodpageComponent {

food!:any;
isLogin!:any;
openModal: boolean = false;
alergenos!:any;
constructor(private FoodService:FoodService,activatedRoute:ActivatedRoute, private cartService:CartService, private router:Router)  {
  activatedRoute.params.subscribe(params => {
    this.FoodService.getFoodById(params.id).subscribe((data: any) => {
      this.food = data; 
    });

this.FoodService.getAlergenos(params.id).subscribe((data: any) => {
    this.alergenos = data;
    this.alergenos=this.alergenos.filter((alergeno:any)=>{
      return alergeno.alergeno!=null
    });
    console.log(this.alergenos)
  });
  
  
 this.isLogin= sessionStorage.getItem('isLoad');
console.log(this.isLogin)
  if(this.isLogin==null){
    this.isLogin=false;
  }
  else{
    this.isLogin=true;
  }

  });
}

  ngOnInit(): void {
    
  }
  goBack(){
    window.history.back()
  }

  addToCart(){
    this.cartService.addToCart(this.food)
    this.router.navigateByUrl('/home')
  }

  addToFavorites(){
    console.log(this.food)


  }

  abrirModal() {
   this.openModal = !this.openModal;
}

}