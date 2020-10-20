import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ndef, NFC } from '@ionic-native/nfc/ngx';
@Component({
  selector: 'app-active-pod',
  templateUrl: './active-pod.page.html',
  styleUrls: ['./active-pod.page.scss'],
})
export class ActivePodPage implements OnInit {
  constructor(
    private route: Router,
    private nfc: NFC,
    private ndef: Ndef
  ) { }

  ngOnInit() {
  }

  scanTag() {
    console.log('scanTag');
  }

}
