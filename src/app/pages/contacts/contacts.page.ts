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
  searchTerm;
  constructor(
    private modalController: ModalController,
    private usersService: UsersService,
  ) { }

  ngOnInit() {
    this.usersService.user$.subscribe(value => {
      if (value) {
        console.log('value', value.friends);
        this.user = value;
        this.friends = value.friends || [];
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
      console.log('dismissEvent', dismissEvent);
      this.filterActive = dismissEvent.data;
      if (dismissEvent.data) {
        this.applyFilters();
      } else {
        this.filterList(null, true);
      }

      // TODO: Do logic to apply filters with data.
    }
  }
  private applyFilters() {
    console.log('this.filterActive', this.filterActive);
    console.log('friends', this.friends);

    switch (this.filterActive) {
      case 'alphabetical-asc':
      case 'alphabetical-desc':
        this.sortByAlphabetic();
      case 'company-asc':
        this.sortByAlphabeticKey('company');
      case 'location':
        this.sortByAlphabeticKey('location');
        break;
      default:
        console.log('this.filterActive', this.filterActive);
        // this.filterList(null, true);
        break;
    }
  }

  private sortByAlphabetic() {
    if (this.filterActive === 'alphabetical-asc') {
      this.friends.sort(({ friend: a }, { friend: b }) => (a.first_name || a.username).localeCompare((b.first_name || b.username)))
    } else if (this.filterActive === 'alphabetical-desc') {
      this.friends.sort(({ friend: a }, { friend: b }) => (b.first_name || b.username).localeCompare((a.first_name || a.username)))
    }
  }

  private sortByAlphabeticKey(key: string) {
    if (this.filterActive === 'company-asc' || this.filterActive === 'location') {
      this.friends.sort(({ friend: a }, { friend: b }) => {
        if (a[key]) {
          return b[key] ? a[key].localeCompare(b[key]) : -1;
        } else if (b[key]) {
          return a[key] ? b[key].localeCompare(a[key]) : 1;
        }
      })
    }
  }

  async filterList(event, prevSearch = false) {
    let searchText = prevSearch ? this.searchTerm : event.srcElement.value;
    if (!prevSearch) {
      this.searchTerm = event.srcElement.value;
    }

    if (!searchText) {
      this.friends = this.user && this.user.friends || [];
      return;
    } else {
      searchText = searchText.toLowerCase().trim();
    }

    this.friends = this.user.friends.filter(({ friend }) => {
      const searchParams = `${friend.username} ${friend.first_name} ${friend.location} ${friend.job_position} ${friend.company}`;
      return searchParams.replace(/null/g, '').toLowerCase().includes(searchText);
    });

    this.applyFilters();
  }
}
