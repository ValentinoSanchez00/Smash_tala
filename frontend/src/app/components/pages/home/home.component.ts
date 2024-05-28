import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { Subscription } from 'rxjs';
import { LocalstorageService } from 'src/app/services/localstorage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foods: any[] = [];
  foodSubscription: Subscription | undefined;

  load: boolean = false;
  datos: any = {};

  constructor(
    private foodService: FoodService,
    activatedRoute: ActivatedRoute,
    private localStorageService: LocalstorageService,
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
         
        });
      }
    });

    
  }

  ngOnInit(): void {
    const isLoad = sessionStorage.getItem('isLoad');
    if (isLoad !== null) {
      this.load = isLoad === 'true';
    }
    else{
      this.load = false;
    }
   
  }

  ngOnDestroy(): void {
    if (this.foodSubscription) {
      this.foodSubscription.unsubscribe();
    }
  }
}
