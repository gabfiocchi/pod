import { Component, OnInit } from '@angular/core';
import { Ndef, NFC } from '@ionic-native/nfc/ngx';
import { MenuController, ModalController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ModalScanStatusComponent } from 'src/app/components/modal-scan-status/modal-scan-status.component';
import { ModalScanComponent } from 'src/app/components/modal-scan/modal-scan.component';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-active-pod',
  templateUrl: './active-pod.page.html',
  styleUrls: ['./active-pod.page.scss'],
})
export class ActivePodPage implements OnInit {
  subscriptionNFC: Subscription;
  user: any;
  constructor(
    private platform: Platform,
    private usersService: UsersService,
    private nfc: NFC,
    private ndef: Ndef,
    private modalController: ModalController,
    private menu: MenuController,
  ) { }

  ngOnInit() {
    this.usersService.user$.subscribe(value => {
      this.user = value;
    });
  }

  ionViewDidEnter() {
    this.menu.enable(true, 'main');
  }

  async scanTag() {
    this.removeSubscription();
    const modal = await this.modalController.create({
      component: ModalScanComponent,
      cssClass: 'bottom-sheet',
      componentProps: {
        isActivate: true
      }
    });
    await modal.present();

    try {
      if (this.platform.is('cordova')) {
        if (this.platform.is('android')) {
          this.subscriptionNFC = this.nfc.addNdefListener().subscribe(async (nfcEvent) => {
            console.log('nfcEvent to write', nfcEvent)
            console.log(nfcEvent.tag);
            const tag = nfcEvent.tag;
            if (tag.id) {
              console.log(this.nfc.bytesToHexString(tag.id));
            }

            if (tag.ndefMessage) {
              // si tiene mensaje, lo leemos y vemos que es.
              let payload = tag.ndefMessage[0].payload;
              // let tagContent = this.nfc.bytesToString(payload);
              let tagContent = this.ndef.uriHelper.decodePayload(payload);;
              // TODO: Add logic valid pod.
              console.log('tagContent', tagContent)
              this.showStatusModal('success');
            } else {
              this.showStatusModal('error');
              // si no tiene mensaje, le decimos que es inválido.
            }
            await this.writeNfc();
            // alert('Pod grabado');
            modal.dismiss();
            this.subscriptionNFC.unsubscribe();
          }, error => {
            console.log('nfcEvent error', error);
          });
        } else {
          await this.writeNfc();
        }
      }
    } catch (error) {
      console.log('error scanTag', error);
    }
  }

  private async writeNfc() {
    try {
      const write = await this.nfc.write([
        // Poner la ruta del usuario.
        // admin.pod.domain/u/{username}
        this.ndef.uriRecord('https://admin.pod.domain/u/' + this.user.username),
      ]);
      console.log('write resp', write);
    } catch (error) {
      console.log('write error', error)
    }
  }

  private removeSubscription() {
    if (this.subscriptionNFC) {
      this.subscriptionNFC.unsubscribe();
      this.subscriptionNFC = null;
    }
  }

  async showStatusModal(status) {

    const modal = await this.modalController.create({
      component: ModalScanStatusComponent,
      componentProps: {
        parentStatus: status
      }
    });
    await modal.present();
  }
}
