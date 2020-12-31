import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, MenuController, ToastController } from '@ionic/angular';
import { ERROR_CODES, VALIDATORS_REGEX, STORAGE_LOCATIONS } from '../../../environments/environment';
import { UsersService } from '../../services/users.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private toast: HTMLIonToastElement;
  showPassword: boolean;
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private usersService: UsersService,
    private storage: Storage,
    private menu: MenuController,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  ionViewDidEnter() {
    this.menu.enable(false, 'main');
  }

  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(VALIDATORS_REGEX.EMAIL)]],
      password: [null, [Validators.required, Validators.minLength(5)]],
    });
  }


  async onSubmit(): Promise<void> {
    this.dismissToast();
    if (this.loginForm.invalid) {
      return;
    }

    const loader = await this.loadingController.create();
    await loader.present();

    try {
      const { data } = await this.usersService.signInWithEmail(this.loginForm.value);
      const userData = await this.usersService.getProfile(this.loginForm.value.email);

      console.log('data', data)
      console.log('data', userData)
      this.usersService.user = userData.data;
      this.usersService.token = data.token;
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } catch (error) {
      console.log('error', error.error.error.code);
      if (error.error.error.code === 103) {
        const toast = await this.toastController.create({
          message: 'Es necesario que verifiques la cuenta',
          buttons: [{
            text: 'Verificar',
            role: 'cancel'
          }]
        });

        toast.present();
        await toast.onWillDismiss();
        await this.requestCode();
      } else {
        this.showToast(ERROR_CODES[error.error.error.code], 'danger');
      }
    }

    await loader.dismiss();
  }
  async showToast(message, color?) {
    console.log('message', message)
    this.dismissToast();
    this.toast = await this.toastController.create({
      color,
      message,
      buttons: [{
        text: 'Aceptar',
        role: 'cancel'
      }]
    });

    this.toast.present();
  }

  private dismissToast() {
    if (this.toast) {
      this.toast.dismiss();
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  async requestCode() {
    try {
      this.usersService.requestVerificationCode(this.loginForm.value.email);
      await this.storage.set(STORAGE_LOCATIONS.TEMP_EMAIL, this.loginForm.value.email);
      await this.storage.set(STORAGE_LOCATIONS.TEMP_PASS, this.loginForm.value.password);
      this.router.navigateByUrl('/verification-account');
    } catch (error) {
      console.log('error', error);
    }
  }
}
