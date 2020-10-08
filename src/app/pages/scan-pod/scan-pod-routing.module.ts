import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanPodPage } from './scan-pod.page';

const routes: Routes = [
  {
    path: '',
    component: ScanPodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanPodPageRoutingModule {}
