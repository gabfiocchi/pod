import { Component, OnInit, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-select-colors',
  templateUrl: './select-colors.component.html',
  styleUrls: ['./select-colors.component.scss'],
})
export class SelectColorsComponent implements OnInit {

  @Input() colors;
  constructor(
    private popoverController: PopoverController
  ) { }

  ngOnInit() { }

  async doAction(color) {
    await this.popoverController.dismiss(color, 'selected');
  }

  getColorBackground(color) {
    const primary = color.primary;
    const secondary = color.secondary || primary;

    return { 'background': 'linear-gradient(315deg,' + primary + ' 0%,' + secondary + ' 100%)' }
  }
}
