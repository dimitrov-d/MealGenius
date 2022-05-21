import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ErrorHandlerService } from '@services/error-handler.service';
import { NotificationService } from '@services/notifications.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private http: HttpClient,
    public toastController: ToastController,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  async register() {
    this.errorHandler.addErrorHandler(
      this.http.post('http://localhost:3000/register', {
        ...this.credentials.value
      }))
      .subscribe(() => {
        this.notificationService.showToast('Register successful.')
        this.router.navigate(['/login']);
      });
  }

  // Easy access for form fields
  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

}
