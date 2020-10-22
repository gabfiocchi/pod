import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificationAccountPageRoutingModule } from './verification-account-routing.module';

import { VerificationAccountPage } from './verification-account.page';
import { CodeInputModule } from 'angular-code-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificationAccountPageRoutingModule,
    CodeInputModule
  ],
  declarations: [VerificationAccountPage]
})
export class VerificationAccountPageModule {}
