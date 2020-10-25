import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ModalEditLinkComponent } from 'src/app/components/modal-edit-link/modal-edit-link.component';
import { ModalQrComponent } from '../../components/modal-qr/modal-qr.component';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user: any;
  constructor(
    private usersService: UsersService,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.usersService.user$.subscribe(value => {
      this.user = value;
    });
  }

  async openQR() {
    const modal = await this.modalController.create({
      component: ModalQrComponent,
      componentProps: {
        parentUser: this.user
      },
      cssClass: 'bottom-sheet',
    });
    await modal.present();
  }

  async openLinkEditor() {
    const modal = await this.modalController.create({
      component: ModalEditLinkComponent,
      cssClass: ['bottom-sheet', 'auto-height'],
    });
    await modal.present();
  }
}
