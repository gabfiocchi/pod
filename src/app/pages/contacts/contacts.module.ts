import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactsPageRoutingModule } from './contacts-routing.module';

import { ContactsPage } from './contacts.page';
import { BottomBarModule } from '../../components/bottom-bar/bottom-bar.module';
import { FilterModalModule } from '../../components/filter-modal/filter-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactsPageRoutingModule,
    BottomBarModule,
    FilterModalModule
  ],
  declarations: [ContactsPage]
})
export class ContactsPageModule {}
