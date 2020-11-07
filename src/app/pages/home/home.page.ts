import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, ModalController } from '@ionic/angular';
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
    private loadingController: LoadingController,
    private modalController: ModalController,
    private menu: MenuController,
  ) { }

  ngOnInit() {
    this.getData();
    this.usersService.user$.subscribe(value => {
      this.user = value;
    });
  }

  ionViewDidEnter() {
    this.menu.enable(true, 'main');
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

  updateAllVisibilities() {
    console.log('links', this.user.links);
    const links = this.user.links.map(link => ({
      id: link.id,
      hidden: false
    }));

    console.log('links', links);
    this.updateUser(links);
  }
  updateVisibility(item) {
    console.log(this.user);
    console.log(item);
    this.updateUser([{
      id: item.id,
      hidden: !item.hidden
    }]);
  }
  private async updateUser(links) {
    const loader = await this.loadingController.create();
    await loader.present();
    try {
      const { data } = await this.usersService.updateProfile(this.user.id, { links });
      this.usersService.user = data;
    } catch (error) {
      console.log('error', error);
    }
    await loader.dismiss();
  }
}
