import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanPodPageRoutingModule } from './scan-pod-routing.module';

import { ScanPodPage } from './scan-pod.page';
import { BottomBarModule } from '../../components/bottom-bar/bottom-bar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanPodPageRoutingModule,
    BottomBarModule
  ],
  declarations: [ScanPodPage]
})
export class ScanPodPageModule {}
