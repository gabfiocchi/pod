import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { STORAGE_LOCATIONS } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(
        private router: Router,
        private storage: Storage,
    ) { }

    async canActivate(): Promise<boolean> {
        const hasToken = await this.storage.get(STORAGE_LOCATIONS.USER_SESSION)

        if (!hasToken) {
            this.router.navigateByUrl('welcome');
            return false;
        }

        return true;
    }
}
