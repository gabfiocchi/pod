import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-scan-status',
  templateUrl: './modal-scan-status.component.html',
  styleUrls: ['./modal-scan-status.component.scss'],
})
export class ModalScanStatusComponent implements OnInit {

  @Input() parentStatus: string;
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() { }

  closeModal() {
    this.modalController.dismiss();
  }
}
