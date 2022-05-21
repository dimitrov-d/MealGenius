import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

  diets: any[];
  allergens: any[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');
    this.http.get('http://localhost:3000/diets').subscribe((diets: any[]) => this.diets = diets);
    this.http.get('http://localhost:3000/allergens').subscribe((allergens: any[]) => this.allergens = allergens);
  }

  selectDiet(idx) {
    for (let i = 0; i < this.diets.length; i++) {
      this.diets[i].selected = i === idx;
    }
  }

  selectAllergen(idx) {
    this.allergens[idx].selected = !this.allergens[idx].selected;
  }

}
