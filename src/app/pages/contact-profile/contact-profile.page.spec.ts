import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactProfilePage } from './contact-profile.page';

describe('ContactProfilePage', () => {
  let component: ContactProfilePage;
  let fixture: ComponentFixture<ContactProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
