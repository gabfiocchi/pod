import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScanPodPage } from './scan-pod.page';

describe('ScanPodPage', () => {
  let component: ScanPodPage;
  let fixture: ComponentFixture<ScanPodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanPodPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScanPodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
