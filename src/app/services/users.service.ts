import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userToken: string;
  userData: any;
  private userSubject = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private navController: NavController
  ) { }

  signInWithEmail(body) {
    return this.http.post<any>(environment.apirest.base + environment.apirest.login, body).toPromise();
  }

  signUpWithEmail(body) {
    return this.http.post<any>(environment.apirest.base + environment.apirest.user, {
      ...body,
      status: 'active'
    }).toPromise();
  }
}
