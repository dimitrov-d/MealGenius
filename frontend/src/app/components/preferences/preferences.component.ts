import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NotificationService } from '@services/notifications.service';
import { ErrorHandlerService } from '@services/error-handler.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent {

  diets: any[];
  allergens: any[];
  user: any;

  constructor(private http: HttpClient, private router: Router,
    private notifications: NotificationService, private errorHandler: ErrorHandlerService) { }

  ionViewWillEnter() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user = currentUser;
    this.http.get('http://localhost:3000/meals/diets').subscribe((diets: any[]) => {
      this.diets = diets;
      this.selectDiet(this.diets.findIndex(d => d._id === currentUser.diet._id));
    });
    this.http.get('http://localhost:3000/meals/allergens').subscribe((allergens: any[]) => {
      this.allergens = allergens;
      this.allergens.forEach(al => {
        if (currentUser.allergens.map(a => a._id).includes(al._id)) {
          // Mark all of the user's selected allergens as checked
          this.selectAllergen(this.allergens.findIndex(a => a._id === al._id));
        }
      });
    });
    this.http.post('http://localhost:3000/user/currentUser', { email: currentUser.email })
      .subscribe((user: any) => this.user = user);
  }

  selectDiet(idx) {
    for (let i = 0; i < this.diets.length; i++) {
      this.diets[i].selected = i === idx;
    }
  }

  selectAllergen(idx) {
    this.allergens[idx].selected = !this.allergens[idx].selected;
  }

  savePreferences() {
    const userObj = {
      ...this.user,
      diet: this.diets.find(x => x.selected),
      allergens: this.allergens.filter(x => x.selected)
    };
    this.errorHandler.addErrorHandler(this.http.post('http://localhost:3000/user/update', userObj)).subscribe(() => {
      this.router.navigate(['/tabs/plan'], { replaceUrl: true });
      this.notifications.showToast('Preferences saved successfully.');
      localStorage.setItem('currentUser', JSON.stringify(userObj));
    });
  }
}
