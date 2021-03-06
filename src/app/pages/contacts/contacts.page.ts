import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
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
    private menu: MenuController,
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

  ionViewDidEnter() {
    this.menu.enable(true, 'main');
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
    }
  }
  private applyFilters(fromFilterList = false) {
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
      case 'last-scanned':
        if (!fromFilterList) {
          this.filterList(null, true);
        }
        break;
      default:
        console.log('this.filterActive', this.filterActive);
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

    this.friends = JSON.parse(JSON.stringify(this.user && this.user.friends || []));
    if (!searchText || searchText && searchText.length === 0) {
      return;
    } else {
      searchText = searchText.toLowerCase().trim();
    }

    this.friends = this.friends.filter(({ friend }) => {
      const searchParams = `${friend.username} ${friend.first_name} ${friend.location} ${friend.job_position} ${friend.company}`;
      return searchParams.replace(/null/g, '').toLowerCase().includes(searchText);
    });

    this.applyFilters(true);
  }
}
