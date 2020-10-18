import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-active-pod',
  templateUrl: './active-pod.page.html',
  styleUrls: ['./active-pod.page.scss'],
})
export class ActivePodPage implements OnInit {

  isScan: boolean;
  constructor(
    private route: Router
  ) { }

  ngOnInit() {
    this.isScan = this.route.url === '/scan-pod';
  }

}
