import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactProfilePageRoutingModule } from './contact-profile-routing.module';

import { ContactProfilePage } from './contact-profile.page';
import { BottomBarModule } from '../../components/bottom-bar/bottom-bar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactProfilePageRoutingModule,
    BottomBarModule
  ],
  declarations: [ContactProfilePage]
})
export class ContactProfilePageModule {}
