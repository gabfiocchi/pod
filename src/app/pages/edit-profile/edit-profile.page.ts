import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  userForm: FormGroup;
  constructor(
    private loadingController: LoadingController,
    private modalController: ModalController,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({});
    this.usersService.user$.subscribe(value => {
      if (value) {
        this.user = value;
        this.buildForm(value);
      }
    });
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
      await this.usersService.updateProfile(this.user.id, this.getChanged(this.userForm));
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
}
