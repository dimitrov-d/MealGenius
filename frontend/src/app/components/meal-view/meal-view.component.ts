import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '@services/error-handler.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meal } from '@shared/models/meal';

@Component({
  selector: 'app-meal-view',
  templateUrl: './meal-view.component.html',
  styleUrls: ['./meal-view.component.css']
})
export class MealViewComponent implements OnInit {
  editMode = false;
  meal: any;

  constructor(private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
    private http: HttpClient) { }

  ngOnInit() {
    this.getMeal();
  }

  getMeal() {
    const id = this.route.snapshot.paramMap.get('id');
    this.errorHandler.addErrorHandler(this.http.get('http://localhost:3000/collections/meals'))
      .subscribe((meals: Meal[]) => this.meal = meals.find(m => m._id === id));
  }

  edit() {
    this.editMode = true;
  }

  save() {
    this.http.post('http://localhost:3000/meals/update', { ...this.meal })
      .subscribe(() => {
        this.editMode = false;
        this.getMeal();
      });
  }

}
