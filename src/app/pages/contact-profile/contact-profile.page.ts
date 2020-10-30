import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, LoadingController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-contact-profile',
  templateUrl: './contact-profile.page.html',
  styleUrls: ['./contact-profile.page.scss'],
})
export class ContactProfilePage implements OnInit {
  user: any;
  colors: any;
  links: any;
  // @ViewChild('map', { read: ElementRef }) ionContent: ElementRef;
  // @ViewChild(IonContent, { read: ElementRef }) content: IonContent;
  @ViewChild(IonContent, { read: ElementRef }) private content: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {
    this.getColors();
    const username = this.route.snapshot.paramMap.get('username');
    this.usersService.user$.subscribe(value => {
      if (value) {
        console.log('username', username)
        if (username === value.username) {
          this.links = value.links;
          this.user = value;
        } else {
          value.friends = value.friends || [];
          const user = value.friends.find(({ friend }) => friend && friend.username === username);
          if (user && user.friend) {
            this.mappingLinks(user)
            this.user = user.friend;
          } else {
            this.recoverUserProfile(username);
          }
        }
      }

      this.getColorBackground();
    });
  }
  private async recoverUserProfile(username) {
    const loader = await this.loadingController.create();
    await loader.present();
    try {
      const { data } = await this.usersService.getUserProfile(username);
      const currentUser = this.usersService.user;

      this.filterLinks(data);

      const links = this.links.map(link => ({
        users_links_id: {
          id: link.id
        }
      }))

      const friend = {
        friends: [{
          friend: data.id,
          links
        }]
      };

      const updatedProfile = await this.usersService.updateProfile(currentUser.id, friend);
      this.usersService.user = updatedProfile.data;
      this.user = data;
    } catch (error) {

    }
    await loader.dismiss();
  }

  private async getColors() {
    const { data } = await this.usersService.profileColors();
    this.colors = data;

    this.getColorBackground();
  }

  private async getColorBackground() {
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

  private setStyle(value: string): void {
    if (this.content && this.content.nativeElement) {
      this.content.nativeElement.style.setProperty('--background', value);
    }
  }

  private filterLinks(user) {
    this.links = user.links.filter(link => link && !link.hidden);
  }

  private mappingLinks(user) {
    this.links = user.links.map(link => (link.users_links_id));
  }
}
