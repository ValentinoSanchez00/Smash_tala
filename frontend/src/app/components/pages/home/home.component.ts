import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foods: any[] = [];
  foodSubscription: Subscription | undefined;

  constructor(
    private foodService: FoodService,
    activatedRoute: ActivatedRoute,
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm) {
        this.foodSubscription = this.foodService.getAllFoodBySearchTerm(params.searchTerm)
        .subscribe(foods => {
          this.foods = foods; 
        });
      } else {
        this.foodSubscription = this.foodService.getAll()
        .subscribe(foods => {
          this.foods = foods; 
          console.log(this.foods)
        });
      }
    });

    
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.foodSubscription) {
      this.foodSubscription.unsubscribe();
    }
  }
}
