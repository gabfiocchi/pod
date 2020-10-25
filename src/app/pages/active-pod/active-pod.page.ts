import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ndef, NFC } from '@ionic-native/nfc/ngx';
import { LoadingController, ModalController } from '@ionic/angular';
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
    private usersService: UsersService,
    private route: Router,
    private nfc: NFC,
    private ndef: Ndef,
    private loadingController: LoadingController,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.usersService.user$.subscribe(value => {
      this.user = value;
    });
  }

  async scanTag() {
    this.removeSubscription();
    const modal = await this.modalController.create({
      component: ModalScanComponent,
      cssClass: 'bottom-sheet',
    });
    await modal.present();
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
        let tagContent = this.ndef.uriHelper.decodePayload(payload);        ;
        // TODO: Add logic valid pod.
        console.log('tagContent', tagContent)
        this.showStatusModal('success');
      } else {
        this.showStatusModal('error');
        // si no tiene mensaje, le decimos que es inválido.
      }
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
      // alert('Pod grabado');
      this.subscriptionNFC.unsubscribe();
    }, error => {
      console.log('nfcEvent error', error);
    });
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
