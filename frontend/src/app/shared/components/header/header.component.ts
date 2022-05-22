import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationService } from '@services/notifications.service';
import { ErrorHandlerService } from '@services/error-handler.service';

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

  constructor(private http: HttpClient, private router: Router,
    private notifications: NotificationService, private errorHandler: ErrorHandlerService) { }

  logout() {
    this.http.get('http://localhost:3000/clearMeals');
    this.router.navigate(['/login']);
  }

  isTabPage() {
    return this.router.url.includes('tabs');
  }

}
