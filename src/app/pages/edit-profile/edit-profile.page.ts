import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalEditLinkComponent } from 'src/app/components/modal-edit-link/modal-edit-link.component';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  user: any;
  userFullName: string;
  constructor(
    private modalController: ModalController,
    private usersService: UsersService,
  ) { }

  ngOnInit() {
    this.usersService.user$.subscribe(value => {
      this.user = value;
      this.userFullName = ((value?.first_name || '') + ' ' + (value?.last_name || '')).trim();
    });
  }
  async openLinkEditor() {
    const modal = await this.modalController.create({
      component: ModalEditLinkComponent,
      cssClass: 'bottom-sheet',
    });
    await modal.present();
  }
}
