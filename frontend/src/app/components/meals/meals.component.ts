import { DataService } from '@services/data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Meal } from '@shared/models/meal';
import { User } from '@shared/models/User';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {

  meals: Meal[];
  user: User;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.dataService.getAllMeals((meals) => this.meals = meals.filter(m => m.type === this.user.diet.name));
  }

  openMeal(id) {
    this.router.navigate(['/tabs/meal', id]);
  }

}
