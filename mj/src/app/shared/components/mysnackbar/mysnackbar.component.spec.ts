import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MysnackbarComponent } from './mysnackbar.component';

describe('MysnackbarComponent', () => {
  let component: MysnackbarComponent;
  let fixture: ComponentFixture<MysnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MysnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MysnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
