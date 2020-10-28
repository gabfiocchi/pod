import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment, STORAGE_LOCATIONS } from '../../environments/environment';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

// const profileFields = '*,color.*,links.link.image.data,links.link.*,links.value,links.id,qr.data.*,friends.friend.*,friends.friend.links.link.image.data,friends.created,friends.friend.links.link.*,friends.friend.links.value';
const profileFields = '*.*.*.*';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userToken: string;
  userData: any;
  private userSubject = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private router: Router,
    private navController: NavController
  ) { }

  get user() {
    return this.userData;
  }

  set user(value) {
    this.userData = value;
    this.refreshSubject();
  }

  get token(): string {
    return this.userToken;
  }
  set token(value: string) {
    this.storage.set(STORAGE_LOCATIONS.USER_SESSION, value);
    this.userToken = value;
  }
  get user$(): Observable<any> {
    return this.userSubject.asObservable();
  }
  refreshSubject() {
    this.userSubject.next(this.userData || null);
  }

  signInWithEmail(body: { email: string, password: string }) {
    return this.http.post<any>(environment.apirest.base + environment.apirest.login, body).toPromise();
  }

  signUpWithEmail(body: { email: string, password: string, username: string }) {
    return this.http.post<any>(environment.apirest.base + environment.apirest.user, body).toPromise();
  }

  getProfile() {
    return this.http.get<any>(environment.apirest.base + environment.apirest.user + `?single=1&fields=${profileFields}`).toPromise();
  }

  updateProfile(id, body) {
    return this.http.patch<any>(environment.apirest.base + environment.apirest.user + `/${id}?single=1&fields=${profileFields}`, body).toPromise();
  }


  async refreshToken() {
    const token = await this.storage.get(STORAGE_LOCATIONS.USER_SESSION);

    return this.http.post(environment.apirest.base + environment.apirest.refreshToken, { token }).toPromise();
  }

  requestPassword(email: string) {
    return this.http.post(environment.apirest.base + environment.apirest.requestPassword, { email }).toPromise();
  }

  resetPassword(token: string, password: string) {
    return this.http.post(environment.apirest.base + environment.apirest.resetPassword, { token, password }).toPromise();
  }

  signOut(): Promise<boolean> {
    return new Promise(async (resolve) => {
      this.storage.remove(STORAGE_LOCATIONS.USER_SESSION);
      this.storage.remove(STORAGE_LOCATIONS.REFRESH_TOKEN);
      this.user = null;
      this.refreshSubject();
      this.navController.setDirection('root');
      this.router.navigateByUrl('/welcome');
      resolve(true);
    });
  }

  requestVerificationCode(email: string) {
    return this.http.post(environment.apirest.base + environment.apirest.requestCode, { email }).toPromise();
  }
  verifyVerificationCode(email: string, verification_code: string) {
    return this.http.post(environment.apirest.base + environment.apirest.verifyCode, { email, verification_code }).toPromise();
  }

  profileColors() {
    return this.http.get<any>(environment.apirest.base + environment.apirest.colors).toPromise();
  }

  profileLinks() {
    return this.http.get<any>(environment.apirest.base + environment.apirest.links + '?fields=*,image.data').toPromise();
  }
}
