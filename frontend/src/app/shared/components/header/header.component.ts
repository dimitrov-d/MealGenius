import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: 'header.component.html',
  selector: 'app-header',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  @Input() title;
  @Input() defaultHref: string;
  @Input() homeButton = true;
  onlineMarker = true;
  appVersion: string;
  authSub: Subscription;

  constructor(private router: Router) { }

  logout() {
    this.router.navigate(['/login']);
  }

  isTabPage() {
    return this.router.url.includes('tabs');
  }

}
