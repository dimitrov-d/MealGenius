import { Component } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent {
  data: string;

  constructor(private navParams: NavParams) {
    this.data = navParams.get('data');
  }
}
