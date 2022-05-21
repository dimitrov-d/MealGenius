import { ErrorHandlerService } from './../../../services/error-handler.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '@environments/environment';
import { IonReorderGroup, PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';

@Component({
  selector: 'app-home',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  appVersion: string;

  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService,
    public popoverController: PopoverController) {
    this.appVersion = environment.version;
    this.errorHandler.addErrorHandler(this.http.get('http://localhost:3000/meals'))
      .subscribe(console.log);
  }

  ngOnInit() {
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
