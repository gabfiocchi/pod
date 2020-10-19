import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';
import { VALIDATORS_REGEX } from '../../../environments/environment';
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
  ) { }

  ngOnInit() {
    this.showPassword = false;
    this.buildRegisterForm();
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
      const { data } = await this.usersService.signInWithEmail(user);
      const userData = await this.usersService.getProfile(user.email);
      console.log('data token', data.token);
      console.log('data userData', userData);
      this.usersService.user = userData.data;
      this.usersService.token = data.token;

      console.log('userData', userData)
      this.successSignUp();
    } catch (e) {
      console.log('error sign up with email', e);
    }

    await loader.dismiss();
  }

  private async successSignUp(): Promise<void> {
    const successToast = await this.toastController.create({
      message: 'La cuenta ha sido creada con éxito',
      duration: 6000,
    });

    await successToast.present();
    this.navController.setDirection('root');
    this.router.navigateByUrl('/home');
  }
}
