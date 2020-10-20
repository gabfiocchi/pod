import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { NFC } from '@ionic-native/nfc/ngx';
import { Subscription } from 'rxjs';
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
      console.log('hola!');
      this.scanTag();
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
        alert('Pod válido');
        this.closeModal();
      } else {
        alert('Pod inválido');
        // si no tiene mensaje, le decimos que es inválido.
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
}
