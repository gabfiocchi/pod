import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { BottomBarModule } from '../../components/bottom-bar/bottom-bar.module';
import { ModalQrModule } from '../../components/modal-qr/modal-qr.module';
import { ModalLinksModule } from 'src/app/components/modal-links/modal-links.module';
import { ModalEditLinkModule } from 'src/app/components/modal-edit-link/modal-edit-link.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    BottomBarModule,
    ModalQrModule,
    ModalLinksModule,
    ModalEditLinkModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
