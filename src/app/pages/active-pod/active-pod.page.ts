import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ndef, NFC } from '@ionic-native/nfc/ngx';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-active-pod',
  templateUrl: './active-pod.page.html',
  styleUrls: ['./active-pod.page.scss'],
})
export class ActivePodPage implements OnInit {
  subscriptionNFC: Subscription;
  constructor(
    private route: Router,
    private nfc: NFC,
    private ndef: Ndef,
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {
  }

  async scanTag() {
    this.removeSubscription();
    const loader = await this.loadingController.create();
    await loader.present();
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
        let tagContent = this.nfc.bytesToString(payload);
        console.log('tagContent', tagContent)
        alert('Pod válido');
      } else {
        alert('Pod inválido');
        // si no tiene mensaje, le decimos que es inválido.
      }
      try {
        const write = await this.nfc.write([
          // Poner la ruta del usuario.
          // pod.domain/u/{username}
          this.ndef.uriRecord('https://pod-admin.gabfiocchi.dev/'),
        ]);
        console.log('write resp', write);
      } catch (error) {
        console.log('write error', error)
      }
      alert('Pod grabado');
      await loader.dismiss();
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

}
