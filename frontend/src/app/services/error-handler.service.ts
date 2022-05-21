import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { NotificationService } from './notifications.service';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {

    constructor(public loadingCtrl: LoadingController,
        private notificationService: NotificationService) { }

    addErrorHandler(observable: Observable<any>) {
        return new Observable((observer) => {
            this.loadingCtrl.create().then(loader => {
                loader.present();
                return this.invokeSubscription({ observable, observer, loader });
            });
        });
    }

    invokeSubscription(subscriptionData) {
        const { observable, observer, loader = null } = subscriptionData;
        const subscription = observable.pipe(timeout(8000)).subscribe(value => observer.next(value),
            error => {
                this.exceptionHandler(error);
                loader?.dismiss();
            }, () => {
                loader?.dismiss();
                return observer.complete();
            });

        return () => subscription.unsubscribe();
    }

    exceptionHandler(error) {
        if (_.get(error, 'error.errorMessage')) {
            this.notificationService.showErrorMessage(error.error.errorMessage);
        } else if (_.get(error, 'error.errors')) {
            this.notificationService.showErrorMessage(error.error.errors[0]);
        } else if (_.get(error, 'error.ErrorMessage')) {
            this.notificationService.showErrorMessage(error.error.ErrorMessage);
        } else if (_.get(error, 'error.error_description')) {
            this.notificationService.showErrorMessage(error.error.error_description);
        } else if (_.get(error, 'statusText')) {
            this.notificationService.showErrorMessage(error.statusText);
        } else if (_.get(error, 'message')) {
            this.notificationService.showErrorMessage(error.message);
        } else {
            this.notificationService.showErrorMessage('Something went wrong');
        }
    }

}
