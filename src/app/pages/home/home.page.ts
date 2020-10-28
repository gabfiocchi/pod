import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalEditLinkComponent } from 'src/app/components/modal-edit-link/modal-edit-link.component';
import { ModalLinksComponent } from 'src/app/components/modal-links/modal-links.component';
import { ModalQrComponent } from '../../components/modal-qr/modal-qr.component';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user: any;
  links: any;
  constructor(
    private usersService: UsersService,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.getData();
    this.usersService.user$.subscribe(value => {
      this.user = value;
    });
  }

  private async getData() {
    const { data } = await this.usersService.profileLinks();
    this.links = data;
    console.log('this.links', this.links);
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

  async openLinkEditor(link) {
    const modal = await this.modalController.create({
      id: 'modal-link',
      component: ModalEditLinkComponent,
      cssClass: ['bottom-sheet', 'auto-height'],
      componentProps: {
        action: 'add',
        parentUser: this.user,
        parentLink: link
      }
    });
    await modal.present();
  }

  async openLinksSelector() {
    const modal = await this.modalController.create({
      id: 'modal-links',
      component: ModalLinksComponent,
      cssClass: ['bottom-sheet'],
      componentProps: {
        parentUser: this.user,
        parentLinks: this.links
      }
    });
    await modal.present();

    modal.onDidDismiss().then((event) => {
      if (event && event.role === 'add') {
        this.openLinkEditor(event.data);
      }
    });
  }
}
