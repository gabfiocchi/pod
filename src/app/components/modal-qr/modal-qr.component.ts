import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-qr',
  templateUrl: './modal-qr.component.html',
  styleUrls: ['./modal-qr.component.scss'],
})
export class ModalQrComponent implements OnInit {

  @Input() parentUser: any;
  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    console.log('this.parentUser', this.parentUser);
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
