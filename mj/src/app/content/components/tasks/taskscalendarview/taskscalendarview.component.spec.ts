import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskscalendarviewComponent } from './taskscalendarview.component';

describe('TaskscalendarviewComponent', () => {
  let component: TaskscalendarviewComponent;
  let fixture: ComponentFixture<TaskscalendarviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskscalendarviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskscalendarviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
