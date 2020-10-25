import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-contact-profile',
  templateUrl: './contact-profile.page.html',
  styleUrls: ['./contact-profile.page.scss'],
})
export class ContactProfilePage implements OnInit {
  user: any;
  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
  ) { }

  ngOnInit() {
    const username = this.route.snapshot.paramMap.get('username');
    this.usersService.user$.subscribe(value => {
      if (value) {
        console.log('username', username)
        if (username === value.username) {
          this.user = value;
        } else {
          value.friends = value.friends || [];
          const user = value.friends.find(({ friend }) => friend.username === username);
          console.log('user', user.friend);
          if (user && user.friend) {
            this.user = user.friend;
          }
        }
        console.log('value', value.friends);
        console.log('value', value.username);
      }
    });
  }
}
