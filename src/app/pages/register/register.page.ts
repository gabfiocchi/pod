import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, MenuController, NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UsersService } from 'src/app/services/users.service';
import { VALIDATORS_REGEX, STORAGE_LOCATIONS } from '../../../environments/environment';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  submitAttempt: boolean;
  showPassword: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private loadingController: LoadingController,
    private usersService: UsersService,
    private toastController: ToastController,
    private navController: NavController,
    private router: Router,
    private storage: Storage,
    private menu: MenuController,
  ) { }

  ngOnInit() {
    this.showPassword = false;
    this.buildRegisterForm();
  }

  ionViewDidEnter() {
    this.menu.enable(false, 'main');
  }


  private buildRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(VALIDATORS_REGEX.EMAIL)]],
      password: [null, [Validators.required]],
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  async register(): Promise<void> {
    this.submitAttempt = true;

    if (this.registerForm.invalid) {
      return;
    }

    const loader = await this.loadingController.create();
    await loader.present();

    const { username, ...user } = this.registerForm.value;

    try {
      await this.usersService.signUpWithEmail(this.registerForm.value);
      // const { data } = await this.usersService.signInWithEmail(user);
      // const userData = await this.usersService.getProfile();
      // console.log('data token', data.token);
      // console.log('data userData', userData);
      // this.usersService.user = userData.data;
      // this.usersService.token = data.token;

      // console.log('userData', userData)
      this.successSignUp();
    } catch (e) {
      console.log('error sign up with email', e);
      const errorToast = await this.toastController.create({
        message: 'El usuario ingresado o el correo ya existe',
        duration: 6000,
      });

      await errorToast.present();
    }

    await loader.dismiss();
  }

  private async successSignUp(): Promise<void> {
    const successToast = await this.toastController.create({
      message: 'La cuenta ha sido creada con éxito',
      duration: 6000,
    });

    await successToast.present();
    // this.navController.setDirection('root');
    // this.router.navigateByUrl('/home');
    this.requestCode();
  }

  async requestCode() {
    try {
      this.usersService.requestVerificationCode(this.registerForm.value.email);
      await this.storage.set(STORAGE_LOCATIONS.TEMP_EMAIL, this.registerForm.value.email);
      await this.storage.set(STORAGE_LOCATIONS.TEMP_PASS, this.registerForm.value.password);
      this.router.navigateByUrl('/verification-account');
    } catch (error) {
      console.log('error', error);
    }
  }
}
