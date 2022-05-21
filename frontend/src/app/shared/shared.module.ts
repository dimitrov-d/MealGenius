import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ExpandableComponent } from './components/expandable/expandable.component';
import { PopoverComponent } from './components/popover/popover.component';

@NgModule({
  imports: [
    CommonModule, IonicModule, FormsModule
  ],
  declarations: [HeaderComponent, HomeComponent, ExpandableComponent, PopoverComponent],
  exports: [HeaderComponent, HomeComponent, FormsModule, ExpandableComponent, PopoverComponent],
})
export class SharedModule { }
