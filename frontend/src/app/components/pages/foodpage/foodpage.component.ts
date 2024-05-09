
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
constructor(private FoodService:FoodService,activatedRoute:ActivatedRoute, private cartService:CartService, private router:Router)  {
  activatedRoute.params.subscribe(params => {
    this.FoodService.getFoodById(params.id).subscribe((data: any) => {
      this.food = data; 
      console.log(this.food); 
    });
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
}

