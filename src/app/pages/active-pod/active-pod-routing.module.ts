import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivePodPage } from './active-pod.page';

const routes: Routes = [
  {
    path: '',
    component: ActivePodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivePodPageRoutingModule {}
