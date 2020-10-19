import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user: any;
  userFullName: string;
  constructor(
    private usersService: UsersService,
  ) { }

  ngOnInit() {
    this.usersService.user$.subscribe(value => {
      this.user = value;
      this.userFullName = ((value?.first_name || '') + ' ' + (value?.last_name || '')).trim();
    });
  }

}
