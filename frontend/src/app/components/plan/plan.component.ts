import { ErrorHandlerService } from './../../services/error-handler.service';
import { UserService } from '@services/user.service';
import { Meal } from '@shared/models/Meal';
import { DataService } from '@services/data.service';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { PopoverComponent } from '@shared/components/popover/popover.component';
import { User } from '@shared/models/User';
import { ShoppingList } from '@shared/models/ShoppingList';
import { NotificationService } from '@services/notifications.service';

@Component({
  selector: 'app-home',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent {
  user: User;
  meals: Meal[];
  shoppingList: ShoppingList;

  constructor(private http: HttpClient,
    private dataService: DataService,
    public popoverController: PopoverController,
    private errorHandler: ErrorHandlerService,
    private notificationsService: NotificationService,
    private modalCtrl: ModalController) {
  }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getMeals();
  }

  getMeals() {
    this.dataService.getAllMeals((meals) => this.meals = meals.filter(m => m.type === this.user.diet.name));
    this.dataService.getShoppingLists((lists) => this.shoppingList = lists.find(l => l.type === this.user.diet.name));
  }


  async deleteItem(meal) {
    const confirmed = await this.notificationsService.presentConfirm('Confirm', 'Are you sure you want to delete this meal?');
    if (!confirmed) return;
    this.errorHandler.addErrorHandler(this.http.post('http://localhost:3000/meals/delete', { "_id": meal._id }))
      .subscribe(() => this.getMeals());
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

  async addNew() {
    const res = await this.notificationsService.presentAlertPrompt() as any;
    if (!res) return;
    this.errorHandler.addErrorHandler(this.http.post('http://localhost:3000/meals/add', { name: res.name, type: this.user.diet.name }))
      .subscribe(() => {
        this.notificationsService.showToast('Meal added successfully');
        return this.getMeals();
      });
  }

}
