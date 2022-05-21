import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { PlanComponent } from './components/plan/plan.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ExpandableComponent } from './components/expandable/expandable.component';
import { PopoverComponent } from './components/popover/popover.component';

@NgModule({
  imports: [
    CommonModule, IonicModule, FormsModule
  ],
  declarations: [HeaderComponent, PlanComponent, ExpandableComponent, PopoverComponent],
  exports: [HeaderComponent, PlanComponent, FormsModule, ExpandableComponent, PopoverComponent],
})
export class SharedModule { }
