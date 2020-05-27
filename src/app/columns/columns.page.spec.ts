import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ColumnsPage } from './columns.page';

describe('ColumnsPage', () => {
  let component: ColumnsPage;
  let fixture: ComponentFixture<ColumnsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ColumnsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
