import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss'],
})
export class FilterModalComponent implements OnInit {

  options = [{
    label: 'Últimos escaneados',
    value: 'last-scanned',
  }, {
    label: 'Ubicación',
    value: 'location',
  }, {
    label: 'Orden alfabético (A-Z)',
    value: 'alphabetical-asc',
  }, {
    label: 'Orden alfabético (Z-A)',
    value: 'alphabetical-desc',
  }, {
    label: 'Orden alfabético por empresa',
    value: 'company-asc',
  }, {
    label: 'Más buscados',
    value: 'most-searched',
  }];
  active;
  @Input() parentFilter: string;
  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.active = this.parentFilter;
  }

  updateValue(value = null) {
    this.active = value;
  }

  closeModal(role: string, value?: string) {
    this.modalController.dismiss(value, role);
  }
}
