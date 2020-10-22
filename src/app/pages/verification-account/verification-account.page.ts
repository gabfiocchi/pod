import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';

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
  ) { }

  ngOnInit() {
  }

  // this called only if user entered full code
  async onCodeCompleted(code: string) {
    console.log('code', code);
    const loader = await this.loadingController.create();
    await loader.present();
    try {
      const dataMe = await this.usersService.getMeProfile();
      const { data } = await this.usersService.getProfile(dataMe.data.email);
      if (data.verification_code === code.toString()) {
        this.navController.setDirection('root');
        this.router.navigateByUrl('/home');
      } else {
        // 
        this.showToast('El código no es válido', 'danger');
        this.code = null;
      }
    } catch (error) {

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
}
