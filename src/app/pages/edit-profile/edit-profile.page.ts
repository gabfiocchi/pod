import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ModalEditLinkComponent } from 'src/app/components/modal-edit-link/modal-edit-link.component';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  user: any;
  // TODO: Update to formgroup.
  constructor(
    private loadingController: LoadingController,
    private modalController: ModalController,
    private usersService: UsersService,
  ) { }

  ngOnInit() {
    this.usersService.user$.subscribe(value => {
      this.user = value;
      console.log('user', value);
    });
  }

  async openLinkEditor() {
    const modal = await this.modalController.create({
      component: ModalEditLinkComponent,
      cssClass: 'bottom-sheet',
    });
    await modal.present();
  }

  async updateProfile() {
    const loader = await this.loadingController.create();
    loader.present();

    try {
      const response = await this.usersService.updateProfile(this.user.id, this.user);
      console.log('response', response);
    } catch (error) {
      console.log('error', error);
    }
    loader.dismiss();
  }
  update() {}
}
