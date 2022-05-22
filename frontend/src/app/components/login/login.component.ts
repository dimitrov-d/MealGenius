import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '@services/error-handler.service';
import { NotificationService } from '@services/notifications.service';
import { User } from '@shared/models/User';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [FormBuilder]
})

export class LoginComponent {
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private notifications: NotificationService) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    this.errorHandler.addErrorHandler(
      this.http.post('http://localhost:3000/auth/login', { ...this.credentials.value }))
      .subscribe(({ user }: { user: User }) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.notifications.showToast('Login successful.');
        this.router.navigate(['/tabs/plan']);
      })
  }

  signUp() {
    this.router.navigate(['/register']);
  }

  // Easy access for form fields
  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }
}
