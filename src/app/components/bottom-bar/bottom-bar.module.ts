import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomBarComponent } from './bottom-bar.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BottomBarComponent],
  exports: [BottomBarComponent],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule
  ]
})
export class BottomBarModule { }
