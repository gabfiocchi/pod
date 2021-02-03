import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-links',
  templateUrl: './modal-links.component.html',
  styleUrls: ['./modal-links.component.scss'],
})
export class ModalLinksComponent implements OnInit {

  @Input() parentUser: any;
  @Input() parentLinks: any;
  links;
  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    console.log('this.parentUser', this.parentUser.links);
    console.log('this.parentLinks', this.parentLinks);
    this.links = this.parentLinks.map(parentLink => {
      const exist = this.parentUser.links.find(({ link }) => link.name === parentLink.name && !parentLink.custom);
      return { ...parentLink, active: !!exist }
    });
  }

  addLink(item) {
    console.log('item', item);
    if (item.active) {
      return;
    }
    this.modalController.dismiss(item, 'add');
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
