import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivePodPageRoutingModule } from './active-pod-routing.module';

import { ActivePodPage } from './active-pod.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivePodPageRoutingModule
  ],
  declarations: [ActivePodPage]
})
export class ActivePodPageModule {}
