import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-scan',
  templateUrl: './modal-scan.component.html',
  styleUrls: ['./modal-scan.component.scss'],
})
export class ModalScanComponent implements OnInit {

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() { }

  closeModal() {
    this.modalController.dismiss();
  }
}
