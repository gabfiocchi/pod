import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActivePodPage } from './active-pod.page';

describe('ActivePodPage', () => {
  let component: ActivePodPage;
  let fixture: ComponentFixture<ActivePodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivePodPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivePodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
