import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@services/notifications.service';
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
    private notifications: NotificationService, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.errorHandler.addErrorHandler(this.http.get('http://localhost:3000/meals'))
    .subscribe((meals: any[]) => {
      this.meals = meals.filter(m => m.type === this.user.diet.name);
    });
  }

}
