import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UsersService } from 'src/app/services/users.service';
import { STORAGE_LOCATIONS } from '../../../environments/environment';

@Component({
  selector: 'app-verification-account',
  templateUrl: './verification-account.page.html',
  styleUrls: ['./verification-account.page.scss'],
})
export class VerificationAccountPage implements OnInit {

  code;
  constructor(
    private router: Router,
    private navController: NavController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private usersService: UsersService,
    private storage: Storage,
  ) { }

  async ngOnInit() {
    const hasEmail = await this.storage.get(STORAGE_LOCATIONS.TEMP_EMAIL);
    if (!hasEmail) {
      this.navController.setDirection('root');
      this.router.navigateByUrl('/login');
    }
  }

  // this called only if user entered full code
  async onCodeCompleted(code: string) {
    console.log('code', code);
    const loader = await this.loadingController.create();
    await loader.present();
    try {
      const tempEmail = await this.storage.get(STORAGE_LOCATIONS.TEMP_EMAIL);
      const tempPassword = await this.storage.get(STORAGE_LOCATIONS.TEMP_PASS);
      await this.usersService.verifyVerificationCode(tempEmail, code);

      const { data } = await this.usersService.signInWithEmail({ email: tempEmail, password: tempPassword });
      const userData = await this.usersService.getProfile(tempEmail);

      await this.storage.remove(STORAGE_LOCATIONS.TEMP_EMAIL);
      await this.storage.remove(STORAGE_LOCATIONS.TEMP_PASS);

      this.usersService.user = userData.data;
      this.usersService.token = data.token;

      this.router.navigateByUrl('/home', { replaceUrl: true });
    } catch (error) {
      this.showToast(error.error.error.message, 'danger');
    }
    await loader.dismiss();
  }

  async showToast(message, color) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 3000,
      buttons: [{
        text: 'Aceptar',
        role: 'cancel'
      }]
    });

    toast.present();
  }

  async resendCode() {
    const loader = await this.loadingController.create();
    await loader.present();
    try {
      const tempEmail = await this.storage.get(STORAGE_LOCATIONS.TEMP_EMAIL);
      await this.usersService.requestVerificationCode(tempEmail);
    } catch (error) {
      console.log('resendCode error', error)
    }
    await loader.dismiss();
  }
}
