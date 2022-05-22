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
                // loader.present();
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
        this.notificationService.showErrorMessage(error.error.error);
    }

}
