import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificationAccountPage } from './verification-account.page';

const routes: Routes = [
  {
    path: '',
    component: VerificationAccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationAccountPageRoutingModule {}
