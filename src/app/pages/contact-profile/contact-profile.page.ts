import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-contact-profile',
  templateUrl: './contact-profile.page.html',
  styleUrls: ['./contact-profile.page.scss'],
})
export class ContactProfilePage implements OnInit {
  user: any;
  colors: any;
  // @ViewChild('map', { read: ElementRef }) ionContent: ElementRef;
  // @ViewChild(IonContent, { read: ElementRef }) content: IonContent;
  @ViewChild(IonContent, { read: ElementRef }) private content: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
  ) { }

  ngOnInit() {
    this.getColors();
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

      this.getColorBackground();
    });
  }

  private async getColors() {
    const { data } = await this.usersService.profileColors();
    this.colors = data;

    this.getColorBackground();
  }

  async getColorBackground() {
    console.log('this.colors', this.colors)
    let primary: string, secondary: string;

    if (this.user && this.user.color) {
      primary = this.user.color.primary;
      secondary = this.user.color.secondary || primary;
      this.setStyle('linear-gradient(160.9deg, ' + primary + ' 1.34%, ' + secondary + ' 24.14%)');
      return;
    }

    if (this.colors && this.colors.length > 0) {
      primary = this.colors[0].primary;
      secondary = this.colors[0].secondary || primary;

      this.setStyle('linear-gradient(160.9deg, ' + primary + ' 1.34%, ' + secondary + ' 24.14%)');
      return;
    }
  }

  setStyle(value: string): void {
    if (this.content && this.content.nativeElement) {
      this.content.nativeElement.style.setProperty('--background', value);
    }
  }
}
