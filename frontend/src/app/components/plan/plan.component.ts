import { DataService } from '@services/data.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '@environments/environment';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '@shared/components/popover/popover.component';

@Component({
  selector: 'app-home',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent {
  appVersion: string;
  user: any;
  meals: any[];

  constructor(private http: HttpClient, private dataService: DataService,
    public popoverController: PopoverController) {
    this.appVersion = environment.version;
  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getMeals();
  }

  getMeals() {
    this.dataService.getAllMeals((meals) => this.meals = meals.filter(m => m.type === this.user.diet.name));
  }

  async presentPopover(event: any, meal: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event,
      translucent: true,
      componentProps: { ingredients: meal.ingredients }
    });
    await popover.present();

    popover.onDidDismiss().then(() => {
      this.http.post('http://localhost:3000/meals/update', { ...meal })
        .subscribe(() => this.getMeals());
    });
  }

}
