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

  constructor() {
    this.appVersion = environment.version;
  }

  ngOnInit() {
  }

}
