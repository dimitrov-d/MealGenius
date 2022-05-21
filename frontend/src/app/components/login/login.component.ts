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
  @ViewChild(IonSlides) slides: IonSlides;
  foodTypes = [
    {
      name: 'Carnivore',
      imgUrl: 'https://tse2.mm.bing.net/th?id=OIP.N4BH0m2WWOsev6FZ55LMMwHaHa',
      selected: false
    },
    {
      name: 'Vegetarian',
      imgUrl: 'https://tse2.mm.bing.net/th?id=OIP.uZ1xUy8MpkmoRgypB-wMuQHaHa',
      selected: false
    },
    {
      name: 'Vegan',
      imgUrl: 'https://thumbs.dreamstime.com/b/vector-cartoon-avocado-illustration-icon-design-isolated-white-background-vector-cartoon-avocado-illustration-icon-design-185826718.jpg',
      selected: false
    }
  ]

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
    setTimeout(() => this.slides.lockSwipes(true));
  }

  async login() {
    this.errorHandler.addErrorHandler(
      this.http.post('http://localhost:3000/login', { ...this.credentials.value }))
      .subscribe(() => {
        this.notifications.showToast('Login successful.');
        this.router.navigate(['/tabs/plan']);
      })
  }

  selectCard(idx) {
    this.foodTypes[idx].selected = !this.foodTypes[idx].selected;
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
