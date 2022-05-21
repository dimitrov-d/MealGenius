import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '@environments/environment';
import { IonReorderGroup } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  appVersion: string;

  constructor() {
    this.appVersion = environment.version;
  }

  ngOnInit() {
  }

}
