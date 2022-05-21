import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonSlides, ToastController } from '@ionic/angular';
import { ErrorHandlerService } from '@services/error-handler.service';
import { NotificationService } from '@services/notifications.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  credentials: FormGroup;
  @ViewChild(IonSlides) slides: IonSlides;
  diets: any[];

  constructor(private fb: FormBuilder,
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
    setTimeout(() => {
      this.http.get('http://localhost:3000/diets').subscribe((diets: any[]) => this.diets = diets);
      return this.slides.lockSwipes(true);
    });
  }

  async register() {
    this.errorHandler.addErrorHandler(
      this.http.post('http://localhost:3000/register', {
        ...this.credentials.value
      }))
      .subscribe(() => {
        this.notificationService.showToast('User saved successfully.');
        this.slides.lockSwipes(false);
        this.slides.slideNext();
      });
  }

  selectCard(idx) {
    this.diets[idx].selected = !this.diets[idx].selected;
  }

  // Easy access for form fields
  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }

  signIn() {
    this.router.navigate(['/login']);
  }

}
