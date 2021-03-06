import { Component, OnInit } from '@angular/core';

import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UsersService } from './services/users.service';
import { Storage } from '@ionic/storage';
import { STORAGE_LOCATIONS } from '../environments/environment';
import { ModalScanComponent } from './components/modal-scan/modal-scan.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  userLogged: boolean;
  user;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private usersService: UsersService,
    private modalController: ModalController,
    private loadingController: LoadingController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleBlackOpaque();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.loadUser()
  }

  async loadUser() {
    console.log('loadUser');
    this.userLogged = false;
    const hasToken = await this.storage.get(STORAGE_LOCATIONS.USER_SESSION);
    console.log('hasToken', hasToken);

    if (hasToken) {
      const loader = await this.loadingController.create();
      await loader.present();
      try {
        const dataMe = await this.usersService.getMeProfile();
        const { data } = await this.usersService.getProfile(dataMe.data.email);
        console.log('data', data)
        this.usersService.user = data;
      } catch (error) {

      }
      await loader.dismiss();
    };

    this.usersService.user$.subscribe(user => {
      this.userLogged = !!user;
      if (user) {
        this.user = user;
      }
    });
  }

  async signOut() {
    await this.usersService.signOut();
  }

  async scanPod() {
    const modal = await this.modalController.create({
      component: ModalScanComponent,
      cssClass: 'bottom-sheet',
    });
    await modal.present();
  }
}
