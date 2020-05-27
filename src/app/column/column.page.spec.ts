import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ColumnPage } from './column.page';

describe('ColumnPage', () => {
  let component: ColumnPage;
  let fixture: ComponentFixture<ColumnPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ColumnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
