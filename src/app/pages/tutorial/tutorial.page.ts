import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {

  constructor(
    private menu: MenuController,
  ) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.menu.enable(false, 'main');
  }

}
