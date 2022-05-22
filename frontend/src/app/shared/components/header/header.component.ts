import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'header.component.html',
  selector: 'app-header',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  @Input() title;
  @Input() defaultHref: string;

  constructor(private http: HttpClient, private router: Router) { }

  logout() {
    // Unmark all of the selected meals
    this.http.post('http://localhost:3000/meals/clearAll', {}).subscribe();
    this.router.navigate(['/login']);
  }

  isTabPage() {
    return this.router.url.includes('tabs');
  }

}
