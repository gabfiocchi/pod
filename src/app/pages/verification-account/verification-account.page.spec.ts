import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerificationAccountPage } from './verification-account.page';

describe('VerificationAccountPage', () => {
  let component: VerificationAccountPage;
  let fixture: ComponentFixture<VerificationAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationAccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerificationAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
