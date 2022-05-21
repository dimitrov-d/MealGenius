import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonSlides, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [FormBuilder]
})

export class LoginComponent {
  public userId: string = null;
  platforms: string[];
  credentials: FormGroup;
  @ViewChild('slides', { static: false }) slides: IonSlides;
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
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    const loading = await this.loadingController.create({
      message: 'Logging in...',
      duration: 2000
    });
    await loading.present();
    loading.onDidDismiss().then(() => this.slides.slideTo(2));
  }

  selectCard(idx) {
    this.foodTypes[idx].selected = !this.foodTypes[idx].selected;
  }

  // Easy access for form fields
  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }
}
