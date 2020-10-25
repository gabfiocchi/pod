import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProfilePageRoutingModule } from './edit-profile-routing.module';

import { EditProfilePage } from './edit-profile.page';
import { BottomBarModule } from '../../components/bottom-bar/bottom-bar.module';
import { SelectColorsModule } from 'src/app/components/select-colors/select-colors.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditProfilePageRoutingModule,
    BottomBarModule,
    SelectColorsModule,
  ],
  declarations: [EditProfilePage]
})
export class EditProfilePageModule {}
