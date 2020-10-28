import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalEditLinkComponent } from './modal-edit-link.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ModalEditLinkComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class ModalEditLinkModule { }
