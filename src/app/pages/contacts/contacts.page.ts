import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FilterModalComponent } from 'src/app/components/filter-modal/filter-modal.component';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  user: any;
  filterActive;
  friends;
  constructor(
    private modalController: ModalController,
    private usersService: UsersService,
  ) { }

  ngOnInit() {
    this.usersService.user$.subscribe(value => {
      if (value) {
        console.log('value', value.friends);
        this.user = value;
        this.friends = value.friends;
      }
    });
  }
  async openFilters() {
    const modal = await this.modalController.create({
      component: FilterModalComponent,
      componentProps: {
        parentFilter: this.filterActive
      },
      backdropDismiss: false
    });
    await modal.present();

    const dismissEvent = await modal.onWillDismiss();

    if (dismissEvent && dismissEvent.role === 'apply') {
      this.filterActive = dismissEvent.data;
      // TODO: Do logic to apply filters with data.
    }
  }
}
