import { Meal } from './../shared/models/Meal';
import { ErrorHandlerService } from '@services/error-handler.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShoppingList } from '@shared/models/ShoppingList';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private errorHandler: ErrorHandlerService, private http: HttpClient) { }

  getAllMeals(callback: (meals: Meal[]) => void) {
    this.errorHandler.addErrorHandler(this.http.get('http://localhost:3000/collections/meals'))
      .subscribe(callback);
  }

  getShoppingLists(callback: (meals: ShoppingList[]) => void) {
    this.errorHandler.addErrorHandler(this.http.get('http://localhost:3000/collections/shopping-list'))
      .subscribe(callback);
  }
}
