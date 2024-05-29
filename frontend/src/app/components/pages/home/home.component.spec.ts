import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { HomeComponent } from './home.component';
import { HeaderComponent } from '../../partials/header/header.component';
import { SearchComponent } from '../../partials/search/search.component';
import { NotFoundComponent } from '../../partials/not-found/not-found.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class MockFoodService {
  getAll() {
    return of([{ id: 1, name: 'Food 1' }, { id: 2, name: 'Food 2' }]);
  }

  getAllFoodBySearchTerm(searchTerm: string) {
    return of([{ id: 3, name: `Food matching ${searchTerm}` }]);
  }
}

class MockLocalstorageService {}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockActivatedRoute: any;
  let sessionStorageSpy: jasmine.Spy;

  beforeEach(async () => {
    mockActivatedRoute = {
      params: of({ searchTerm: null })
    };

    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ,HeaderComponent, SearchComponent,NotFoundComponent,AboutUsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: FoodService, useClass: MockFoodService },
        { provide: LocalstorageService, useClass: MockLocalstorageService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    // Set up spy before each test
    if (!sessionStorageSpy) {
      sessionStorageSpy = spyOn(sessionStorage, 'getItem');
    }
  });

  afterEach(() => {
    // Reset spy after each test
    if (sessionStorageSpy) {
      sessionStorageSpy.and.callThrough();
      sessionStorageSpy.calls.reset();
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch all foods on init', () => {
    expect(component.foods).toEqual([{ id: 1, name: 'Food 1' }, { id: 2, name: 'Food 2' }]);
  });

  it('should fetch foods based on search term', () => {
    mockActivatedRoute.params = of({ searchTerm: 'test' });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.foods).toEqual([{ id: 3, name: 'Food matching test' }]);
  });

  it('should set load based on session storage', () => {
    sessionStorageSpy.and.returnValue('true');
    component.ngOnInit();
    expect(component.load).toBeTrue();

    sessionStorageSpy.and.returnValue('false');
    component.ngOnInit();
    expect(component.load).toBeFalse();
  });

  it('should unsubscribe on destroy', () => {
    spyOn(component.foodSubscription!, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.foodSubscription!.unsubscribe).toHaveBeenCalled();
  });
});
