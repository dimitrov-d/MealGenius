import { Meal } from './../../shared/models/Meal';
import { DataService } from '@services/data.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '@shared/components/popover/popover.component';
import { User } from '@shared/models/User';
import { ShoppingList } from '@shared/models/ShoppingList';

@Component({
  selector: 'app-home',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent {
  user: User;
  meals: Meal[];
  shoppingList: ShoppingList;

  constructor(private http: HttpClient, private dataService: DataService,
    public popoverController: PopoverController) {
  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getMeals();
  }

  getMeals() {
    this.dataService.getAllMeals((meals) => this.meals = meals.filter(m => m.type === this.user.diet.name));
    this.dataService.getShoppingLists((lists) => this.shoppingList = lists.find(l => l.type === this.user.diet.name));
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
