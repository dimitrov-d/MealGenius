import { Component } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent {
  ingredients: any[];

  constructor(private navParams: NavParams) {
    this.ingredients = navParams.get('ingredients');
  }
}
