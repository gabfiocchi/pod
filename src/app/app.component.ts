import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UsersService } from './services/users.service';
import { Storage } from '@ionic/storage';
import { STORAGE_LOCATIONS } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  userLogged: boolean;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private usersService: UsersService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
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
      const dataMe = await this.usersService.getMeProfile();
      console.log('dataMe', dataMe.data.email);
      const { data } = await this.usersService.getProfile(dataMe.data.email);
      console.log('data', data)
      this.usersService.user = data;
    };

    this.usersService.user$.subscribe(async user => {
      this.userLogged = !!user;
    });
  }

  async signOut() {
    await this.usersService.signOut();
  }
}
