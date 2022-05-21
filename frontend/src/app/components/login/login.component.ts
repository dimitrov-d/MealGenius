import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { ErrorHandlerService } from '@services/error-handler.service';
import { NotificationService } from '@services/notifications.service';

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
    private notifications: NotificationService,
    private toastController: ToastController) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    this.errorHandler.addErrorHandler(
      this.http.post('http://localhost:3000/login', { ...this.credentials.value }))
      .subscribe(() => {
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
