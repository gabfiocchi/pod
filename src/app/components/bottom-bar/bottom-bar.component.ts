import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';
import { ModalScanComponent } from '../modal-scan/modal-scan.component';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss'],
})
export class BottomBarComponent implements OnInit {
  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
  }

  async scanPod() {
    const modal = await this.modalController.create({
      component: ModalScanComponent,
      cssClass: 'bottom-sheet',
    });
    await modal.present();
  }

}
