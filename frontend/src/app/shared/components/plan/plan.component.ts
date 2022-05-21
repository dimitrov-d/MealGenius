import { ErrorHandlerService } from './../../../services/error-handler.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '@environments/environment';
import { IonReorderGroup } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  appVersion: string;

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) {
    this.appVersion = environment.version;
    this.errorHandler.addErrorHandler(this.http.get('http://localhost:3000/meals'))
    .subscribe(console.log);
  }

  ngOnInit() {
  }

}
