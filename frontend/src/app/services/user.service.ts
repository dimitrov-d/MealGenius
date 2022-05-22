import { ErrorHandlerService } from './error-handler.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { environment } from '@environments/environment';
import { Router } from '@angular/router';
import { User } from '@shared/models/User';
import { NotificationService } from './notifications.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isJwtAuthenticated());
    currentUserSubject = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private router: Router,
        private errorHandler: ErrorHandlerService, private notifications: NotificationService) { }

    async login(email: string, password: string) {

        try {
            const response = await this.errorHandler.addErrorHandler(
                this.http.post('http://localhost:3000/auth/login', { email, password })).toPromise();
            this.setAccessToken((response as { token: string }).token);
            this.updateIsAuthenticatedSubject(true);
            this.notifications.showToast('Login successful.');
            this.router.navigate(['/tabs/plan']);
            return true;
        } catch (error) {
            this.updateIsAuthenticatedSubject(false);
            this.updateCurrentUser(null);
            if (error.status === 401) {
                // First login, the user has to change the password
                return false;
            }

            throw error.status === 400
                ? error.error.validationErrors[0].errorMessage
                : 'Unknown error';
        }
    }

    logout(addReturnUrl = true) {
        if (this.hasAccessToken()) {
            localStorage.removeItem(this.getAccessTokenKey());
            localStorage.removeItem('currentUser');
        }

        this.updateIsAuthenticatedSubject(false);
        this.updateCurrentUser(null);

        const routerOptions = addReturnUrl ? { queryParams: { returnUrl: this.router.url } } : {};
        return this.router.navigate(['/login'], routerOptions);
    }

    getAccessTokenKey() {
        return environment.accessToken;
    }


    getAccessToken() {
        return localStorage.getItem(this.getAccessTokenKey());
    }

    hasAccessToken() {
        return !!this.getAccessToken();
    }

    setAccessToken(accessToken: string) {
        localStorage.setItem(this.getAccessTokenKey(), accessToken);
        localStorage.setItem('currentUser', JSON.stringify(this.getCurrentUser()));

    }

    getCurrentUser(): User {
        return this.parseJwt(this.getAccessToken());
    }

    private updateIsAuthenticatedSubject(value) {
        if (this.isAuthenticatedSubject.getValue() !== value) {
            this.isAuthenticatedSubject.next(value);
        }
    }

    private updateCurrentUser(user) {
        if (this.currentUserSubject.getValue() !== user) {
            this.currentUserSubject.next(user);
        }
    }

    private parseJwt(token): any {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));

        return JSON.parse(jsonPayload);
    }

    getJwtPayload() {
        const token = localStorage.getItem(environment.accessToken);
        if (!token) {
            return null;
        }

        return this.parseJwt(token);
    }

    private isJwtAuthenticated() {
        try {
            const payload = this.getJwtPayload();

            if (!payload) {
                return false;
            }

            return new Date(payload.time * 1000) > new Date();
        } catch (ex) {
            console.error(ex);
            return false;
        }
    }
}
