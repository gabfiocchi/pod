import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment, STORAGE_LOCATIONS, ERROR_CODES } from '../../environments/environment';
import { tap, switchMap } from 'rxjs/operators';
import { UsersService } from '../services/users.service';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private userService: UsersService,
        private storage: Storage,
        private toastController: ToastController,
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.storage.get(STORAGE_LOCATIONS.USER_SESSION))
            .pipe(
                switchMap(userToken => {
                    const isPrivate = this.isPrivateRequest(req.method, req.url);

                    if (isPrivate) {
                        let token = userToken || isPrivate.defaultToken;

                        if (token) {
                            req = req.clone({
                                setHeaders: {
                                    Authorization: `Bearer ${token}`
                                }
                            });
                        }
                    }
                    return next.handle(req).pipe(
                        tap(
                            async (event) => {
                                const isLazySave = this.isLazySave(req.url);

                                if (event instanceof HttpResponse && isLazySave && isLazySave.key) {
                                    const resp = event.body.data;

                                    if (!resp.user) {
                                        await this.storage.set(isLazySave.key, resp);
                                    }

                                    if (resp.token && isLazySave.token) {
                                        const timestamp = (new Date()).getTime()
                                        await this.storage.set(STORAGE_LOCATIONS.USER_SESSION, resp.token);
                                        await this.storage.set(STORAGE_LOCATIONS.REFRESH_TOKEN, timestamp);
                                    }


                                    if (!resp.token && (await this.isValidToken() && await this.isPeriodToken())) {
                                        this.updateToken();
                                    }
                                }
                            },
                            async (error) => {
                                if (error.error.error.code === 3) {
                                    await this.doLogOut();
                                }
                            }
                        )
                    );
                })
            );
    }

    private isLazySave(url: string) {
        const routes = [{
            url: environment.apirest.login,
            key: STORAGE_LOCATIONS.USER_SESSION,
            token: true,
        }, {
            url: environment.apirest.refreshToken,
            key: STORAGE_LOCATIONS.USER_SESSION,
            token: true
        }];

        return routes.find(route => url.startsWith(environment.apirest.base + route.url));
    }

    private isPrivateRequest(method: string, url: string) {
        const routes = [{
            method: 'GET',
            url: environment.apirest.me,
            defaultToken: null
        }, {
            method: 'GET',
            url: environment.apirest.links,
            defaultToken: null
        }, {
            method: ['GET', 'PATCH'],
            url: environment.apirest.user,
            defaultToken: null
        }];

        return routes.find(route => {
            let cleanRoute = route.url.match(/^(.*?)(?=\?|$)/)[0];
            cleanRoute = cleanRoute.replace(/{{(query|params)}}/g, '');

            const checkRouteMethod = this.checkRouteMethod(route.method, method);
            const URLStartsWith = url.startsWith(environment.apirest.base + cleanRoute);

            return checkRouteMethod && URLStartsWith;
        });
    }

    private checkRouteMethod(routeMethod: string | Array<string>, requestMethod: string) {
        if (Array.isArray(routeMethod)) {
            return routeMethod.includes(requestMethod);
        }

        return routeMethod === requestMethod
    }

    private async isValidToken() {
        const oldTimestamp = parseInt(await this.storage.get(STORAGE_LOCATIONS.REFRESH_TOKEN));
        const ttlToken = environment.apirest.ttl;
        const expirationToken = new Date(oldTimestamp + ttlToken * 60000).getTime();

        return oldTimestamp < expirationToken;
    }

    private async isPeriodToken() {
        const oldTimestamp = parseInt(await this.storage.get(STORAGE_LOCATIONS.REFRESH_TOKEN));
        const ttlTokenAverage = environment.apirest.ttl / 3;
        const periodRefreshToken = new Date(oldTimestamp + ttlTokenAverage * 60000).getTime();

        return oldTimestamp - periodRefreshToken < 0;
    }

    private async doLogOut() {
        (await this.toastController.create({
            message: ERROR_CODES['3'],
            color: 'danger',
            buttons: [{ text: 'Aceptar', role: 'cancel' }]
        })).present()

        this.userService.signOut();
    }

    private async updateToken() {
        const oldToken = this.storage.get(STORAGE_LOCATIONS.USER_SESSION);

        if (oldToken && this.isValidToken()) {
            await this.userService.refreshToken();
        } else {
            await this.doLogOut();
        }
    }
}
