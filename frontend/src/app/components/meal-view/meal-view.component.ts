import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from './../../services/error-handler.service';
import { Component, ErrorHandler, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-meal-view',
  templateUrl: './meal-view.component.html',
  styleUrls: ['./meal-view.component.css']
})
export class MealViewComponent implements OnInit {

  meal: any;

  constructor(private route: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
    private http: HttpClient) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.errorHandler.addErrorHandler(this.http.get('http://localhost:3000/meals'))
      .subscribe((meals: any[]) => {
        this.meal = meals.find(m => m._id === id);
        console.log(this.meal);
      });
  }

}
