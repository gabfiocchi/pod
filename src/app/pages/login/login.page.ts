import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { VALIDATORS_REGEX } from '../../../environments/environment';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  submitAttempt: boolean;
  showPassword: boolean;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private usersService: UsersService,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(VALIDATORS_REGEX.EMAIL)]],
      password: [null, [Validators.required, Validators.minLength(5)]],
    });
  }


  async onSubmit(): Promise<void> {
    this.submitAttempt = true;

    if (this.loginForm.invalid) {
      return;
    }

    const loader = await this.loadingController.create();
    await loader.present();

    try {
      const { data } = await this.usersService.signInWithEmail(this.loginForm.value);
      const userData = await this.usersService.getProfile(this.loginForm.value.email);

      console.log('data', data)
      this.usersService.user = userData.data;
      this.usersService.token = data.token;
      this.navController.setDirection('root');
      this.router.navigateByUrl('/home');
    } catch (error) {
      this.showToast(error.error.error);
    }

    await loader.dismiss();
  }
  async showToast(error) {
    const toast = await this.toastController.create({
      // message: ERROR_CODES[error.code],
      message: 'Ups ha habido un error.',
      buttons: [{
        text: 'Aceptar',
        role: 'cancel'
      }]
    });

    toast.present();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
