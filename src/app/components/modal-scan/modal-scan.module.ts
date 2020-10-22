import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalScanComponent } from './modal-scan.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ModalScanComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
  ]
})
export class ModalScanModule { }
