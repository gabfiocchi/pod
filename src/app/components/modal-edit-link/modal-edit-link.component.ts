import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-edit-link',
  templateUrl: './modal-edit-link.component.html',
  styleUrls: ['./modal-edit-link.component.scss'],
})
export class ModalEditLinkComponent implements OnInit {
  @Input() parentLink: any;
  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() { }

  closeModal() {
    this.modalController.dismiss();
  }
}
