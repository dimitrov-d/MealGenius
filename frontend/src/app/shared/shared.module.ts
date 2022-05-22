import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ExpandableComponent } from './components/expandable/expandable.component';
import { PopoverComponent } from './components/popover/popover.component';

@NgModule({
  imports: [
    CommonModule, IonicModule, FormsModule
  ],
  declarations: [HeaderComponent, ExpandableComponent, PopoverComponent],
  exports: [HeaderComponent, FormsModule, ExpandableComponent, PopoverComponent],
})
export class SharedModule { }
