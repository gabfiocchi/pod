import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { NFC } from '@ionic-native/nfc/ngx';
import { Subscription } from 'rxjs';
import { ModalScanStatusComponent } from '../modal-scan-status/modal-scan-status.component';
@Component({
  selector: 'app-modal-scan',
  templateUrl: './modal-scan.component.html',
  styleUrls: ['./modal-scan.component.scss'],
})
export class ModalScanComponent implements OnInit {
  subscriptionNFC: Subscription;
  constructor(
    private platform: Platform,
    private modalController: ModalController,
    private nfc: NFC,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.platform.ready().then(() => {
      // this.scanTag();
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
        let tagContent = this.nfc.bytesToString(payload);
        console.log('tagContent', tagContent)
        this.showStatusModal('success');
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
