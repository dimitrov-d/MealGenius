import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable()
export class NotificationService {

    constructor(private toastCtrl: ToastController,
        private alertCtrl: AlertController) { }

    async showErrorMessage(message, header = 'Error') {
        const alert = await this.alertCtrl.create({
            header,
            message,
            buttons: ['OK'],
            cssClass: 'ion-alert-popup'
        });

        await alert.present();
    }

    async showToast(message) {
        const toast = await this.toastCtrl.create({
            message,
            duration: 2000,
            position: 'top',
            color: 'success'
        });

        await toast.present();
    }

    async presentConfirm(title = 'Please Confirm', message: string): Promise<boolean> {
        return new Promise(async (resolve) => {
            const alert = await this.alertCtrl.create({
                cssClass: 'alert-class',
                header: title,
                message,
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => resolve(false)
                    }, {
                        text: 'Ok',
                        handler: () => resolve(true)
                    }
                ]
            });

            await alert.present();
        });
    }
}
