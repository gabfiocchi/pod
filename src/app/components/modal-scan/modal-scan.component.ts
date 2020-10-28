import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Ndef, NFC } from '@ionic-native/nfc/ngx';
import { Subscription } from 'rxjs';
import { ModalScanStatusComponent } from '../modal-scan-status/modal-scan-status.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modal-scan',
  templateUrl: './modal-scan.component.html',
  styleUrls: ['./modal-scan.component.scss'],
})
export class ModalScanComponent implements OnInit {
  subscriptionNFC: Subscription;
  @Input() isActivate: boolean;
  constructor(
    private platform: Platform,
    private modalController: ModalController,
    private nfc: NFC,
    private ndef: Ndef,
    private router: Router,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.platform.ready().then(() => {
      if (!this.isActivate) {
        this.scanTag();
      }
    });
  }

  private async scanTag() {
    this.removeSubscription();
    this.subscriptionNFC = this.nfc.addNdefListener().subscribe(async (nfcEvent) => {
      const tag = nfcEvent.tag;
      if (tag.id) {
        console.log(this.nfc.bytesToHexString(tag.id));
      }
      if (tag.ndefMessage) {
        // si tiene mensaje, lo leemos y vemos que es.
        let payload = tag.ndefMessage[0].payload;
        // let tagContent = this.nfc.bytesToString(payload);
        let tagContent = this.ndef.uriHelper.decodePayload(payload);;

        console.log('tagContent', tagContent);
        const username = tagContent.replace(/https:\/\/admin.pod.domain\/u\//gm, '').trim();
        console.log('tagContent', username);

        this.showStatusModal('success');

        setTimeout(() => {
          console.log('ruta', '/contact-profile/' + username)
          this.router.navigateByUrl('/contact-profile/' + username);
          this.closeModal();
        }, 2000);
      } else {
        this.showStatusModal('error');
      }
      this.subscriptionNFC.unsubscribe();
    });
  }

  private removeSubscription() {
    if (this.subscriptionNFC) {
      this.subscriptionNFC.unsubscribe();
      this.subscriptionNFC = null;
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async showStatusModal(status) {
    this.closeModal();

    const modal = await this.modalController.create({
      component: ModalScanStatusComponent,
      componentProps: {
        parentStatus: status
      }
    });
    await modal.present();
  }
}
