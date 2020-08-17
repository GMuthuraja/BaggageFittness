import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ArIntroPage } from './ar-intro.page';

describe('ArIntroPage', () => {
  let component: ArIntroPage;
  let fixture: ComponentFixture<ArIntroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArIntroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ArIntroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
