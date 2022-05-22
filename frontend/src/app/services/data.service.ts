import { ErrorHandlerService } from '@services/error-handler.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private errorHandler: ErrorHandlerService, private http: HttpClient) { }

  getAllMeals(callback: (meals: any[]) => void) {
    this.errorHandler.addErrorHandler(this.http.get('http://localhost:3000/meals/all'))
      .subscribe(callback);
  }
}
