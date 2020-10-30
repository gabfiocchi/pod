import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, PopoverController } from '@ionic/angular';
import { ModalLinksComponent } from 'src/app/components/modal-links/modal-links.component';
import { ModalEditLinkComponent } from '../../components/modal-edit-link/modal-edit-link.component';
import { SelectColorsComponent } from '../../components/select-colors/select-colors.component';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  colors;
  links: any;
  user: any;
  userForm: FormGroup;
  constructor(
    private loadingController: LoadingController,
    private modalController: ModalController,
    private popoverController: PopoverController,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({});
    this.getLinks();
    this.getColors();

    this.usersService.user$.subscribe(value => {
      if (value) {
        this.user = value;
        this.buildForm(value);
      }
    });
  }
  private async getLinks() {
    const { data } = await this.usersService.profileLinks();
    this.links = data;
  }

  private async getColors() {
    const { data } = await this.usersService.profileColors();
    this.colors = data;
  }

  private buildForm(user?): void {
    this.userForm = this.formBuilder.group({
      first_name: [user.first_name, [Validators.required]],
      company: [user.company, [Validators.required]],
      job_position: [user.job_position, [Validators.required]],
      location: [user.location, [Validators.required]],
      username: [user.username, [Validators.required]],
      bio: [user.bio, [Validators.required]],
      public_profile: [user.public_profile, [Validators.required]],
    }, {
      updateOn: 'blur'
    });

    this.userForm.valueChanges.subscribe(() => {
      this.updateProfile();
    })
  }


  async openLinkEditor(link, type, value?, id?) {
    console.log('link', this.user, link)
    const modal = await this.modalController.create({
      id: 'modal-link',
      component: ModalEditLinkComponent,
      cssClass: ['bottom-sheet', 'auto-height'],
      componentProps: {
        action: type,
        value,
        id,
        parentUser: this.user,
        parentLink: link
      }
    });
    await modal.present();
  }

  editLink(item) {
    console.log('item', item);
    this.openLinkEditor(item.link, 'edit', item.value, item.id);
  }
  // remove
  // {"links":[{"id":15,"user":null}]}

  async openLinksSelector() {
    const modal = await this.modalController.create({
      id: 'modal-links',
      component: ModalLinksComponent,
      cssClass: ['bottom-sheet'],
      componentProps: {
        parentUser: this.user,
        parentLinks: this.links,
      }
    });
    await modal.present();

    modal.onDidDismiss().then((event) => {
      if (event && event.role === 'add') {
        this.openLinkEditor(event.data, event.role);
      }
    });
  }


  async updateProfile() {
    const loader = await this.loadingController.create();
    loader.present();

    try {
      const { data } = await this.usersService.updateProfile(this.user.id, this.getChanged(this.userForm));
      this.usersService.user = data;
    } catch (error) {
      console.log('error', error);
    }
    loader.dismiss();
  }

  getChanged(form: any) {
    let dirtyValues = {};
    let currentControl;
    Object.keys(form.controls)
      .forEach(key => {
        currentControl = form.controls[key];
        if (currentControl.dirty) {
          if (currentControl.controls) {
            dirtyValues[key] = this.getChanged(currentControl);
          } else {
            dirtyValues[key] = currentControl.value;
          }
        }
      });

    return dirtyValues;
  }

  getColorBackground() {
    let primary: string, secondary: string;
    if (this.user && this.user.color?.primary) {
      primary = this.user.color.primary;
      secondary = this.user.color.secondary || primary;
      return { 'background': 'linear-gradient(315deg,' + primary + ' 0%,' + secondary + ' 100%)' }
    }

    if (this.colors && this.colors.length > 0) {
      primary = this.colors[0].primary;
      secondary = this.colors[0].secondary || primary;

      return { 'background': 'linear-gradient(315deg,' + primary + ' 0%,' + secondary + ' 100%)' }
    }
  }
  async presentColorSelect(ev) {
    const popover = await this.popoverController.create({
      component: SelectColorsComponent,
      event: ev,
      componentProps: { colors: this.colors }
    });

    await popover.present();
    popover.onWillDismiss().then(async (color) => {
      if (color.role === 'selected' && color.data.id !== this.user.color?.id) {
        console.log('color', color.data.id);
        const loader = await this.loadingController.create();
        loader.present();

        try {
          const { data } = await this.usersService.updateProfile(this.user.id, {
            color: color.data.id
          });
          this.user = data;
          this.usersService.user = data;
        } catch (error) {
          console.log('error', error);
        }
        loader.dismiss();
      }
    });
  }

  async deleteLink(id) {
    const loader = await this.loadingController.create();
    await loader.present();

    try {
      const user = this.usersService.user;
      const { data } = await this.usersService.updateProfile(
        user.id,
        {
          links: [{
            $delete: true,
            id
          }]
        }
      )
      this.usersService.user = data;
    } catch (error) {
      console.log('error', error);
    }
    loader.dismiss();
  }
}
