import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

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
