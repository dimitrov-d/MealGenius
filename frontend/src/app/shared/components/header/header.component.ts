import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: 'header.component.html',
  selector: 'app-header',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Input() title;
  @Input() defaultHref: string;
  @Input() homeButton = true;
  onlineMarker = true;
  appVersion: string;
  authSub: Subscription;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToHome() {
  }

  logout() {
    this.router.navigate(['/login']);
  }

}
