import { DataService } from '@services/data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from '@services/error-handler.service';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {

  meals: any[];
  user: any;

  constructor(private http: HttpClient, private router: Router,
    private dataService: DataService, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.dataService.getAllMeals((meals) => this.meals = meals.filter(m => m.type === this.user.diet.name));
  }

  openMeal(id) {
    this.router.navigate(['/tabs/meal', id]);
  }

}
