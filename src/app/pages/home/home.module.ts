import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { BottomBarModule } from '../../components/bottom-bar/bottom-bar.module';
import { ModalQrModule } from '../../components/modal-qr/modal-qr.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    BottomBarModule,
    ModalQrModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
