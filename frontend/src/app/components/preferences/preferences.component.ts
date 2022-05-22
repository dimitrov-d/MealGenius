import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@services/notifications.service';
import { ErrorHandlerService } from '@services/error-handler.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

  diets: any[];
  allergens: any[];
  user: any;

  constructor(private http: HttpClient, private router: Router,
    private notifications: NotificationService, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user = currentUser;
    this.http.get('http://localhost:3000/diets').subscribe((diets: any[]) => {
      this.diets = diets;
      this.selectDiet(this.diets.findIndex(d => d._id === currentUser.diet._id));
    });
    this.http.get('http://localhost:3000/allergens').subscribe((allergens: any[]) => {
      this.allergens = allergens;
      this.allergens.forEach(al => {
        if (currentUser.allergens.map(a => a._id).includes(al._id)) {
          this.selectAllergen(this.allergens.findIndex(a => a._id === al._id));
        }
      });
    });
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
    this.errorHandler.addErrorHandler(this.http.post('http://localhost:3000/update', { ...this.user }))
      .subscribe(() => {
        this.router.navigate(['/tabs/plan']);
        this.notifications.showToast('Preferences saved successfully.');
        localStorage.setItem('currentUser', JSON.stringify({ ...this.user, allergens: this.allergens, diet: this.diets.find(d => d.selected) }));
      });
  }
}
