import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-modal-edit-link',
  templateUrl: './modal-edit-link.component.html',
  styleUrls: ['./modal-edit-link.component.scss'],
})
export class ModalEditLinkComponent implements OnInit {
  title;
  input;
  image;
  @Input() action: string;
  @Input() value: string;
  @Input() id: string;
  @Input() parentUser: any;
  @Input() parentLink: any;
  @Input() parentValue: any;
  @ViewChild('inputPicture', { read: ElementRef }) inputPicture;
  constructor(
    private modalController: ModalController,
    private loadingController: LoadingController,
    private usersService: UsersService,
  ) { }

  ngOnInit() {
    console.log('parentLink', this.parentLink);
    if (this.value) {
      this.input = this.value;
    }
    const action = this.action === 'add' ? 'Agregar' : 'Editar';
    this.title = this.parentLink.action_title ? this.parentLink.action_title.replace(/{{action}}/g, action) : '';
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async save() {
    const loader = await this.loadingController.create();
    await loader.present();
    try {
      const user = this.usersService.user;
      if (this.action === 'add') {
        const { data } = await this.post(user);
        this.usersService.user = data;
      } else {
        const { data } = await this.update(user);
        this.usersService.user = data;
      }
      this.closeModal();
    } catch (error) {
      console.log('error', error);
    }
    loader.dismiss();
  }
  post(user) {
    return this.usersService.updateProfile(
      user.id,
      {
        links: [{
          link: this.parentLink.id,
          value: this.input,
          id: this.id,
          image: this.image || null
        }]
      }
    )
  }
  update(user) {
    return this.usersService.updateProfile(
      user.id,
      {
        links: [{
          value: this.input,
          id: this.id
        }]
      }
    )
  }
  async deleteLink() {
    const loader = await this.loadingController.create();
    await loader.present();

    try {
      const user = this.usersService.user;
      const { data } = await this.usersService.updateProfile(
        user.id,
        {
          links: [{
            $delete: true,
            id: this.id
          }]
        }
      )
      this.usersService.user = data;
      console.log('data', data);
      this.closeModal();
      console.log('input', this.input)
    } catch (error) {
      console.log('error', error);
    }
    loader.dismiss();
  }
  openGalleryMedia() {
    this.inputPicture.nativeElement.click();
  }


  async changePicture(event: Event) {
    const loader = await this.loadingController.create();
    loader.present();
    const files = (event.target as HTMLInputElement).files;

    try {
      if (files && files.length > 0) {
        const file = files[0];
        console.log('file', file);
        const uploadFile = await this.usersService.uploadFile({
          data: file
        });
        this.image = uploadFile.data;
      }
    } catch (error) {

    }
    loader.dismiss();
  }
}
