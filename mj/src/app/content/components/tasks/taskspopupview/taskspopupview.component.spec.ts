import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskspopupviewComponent } from './taskspopupview.component';

describe('TaskspopupviewComponent', () => {
  let component: TaskspopupviewComponent;
  let fixture: ComponentFixture<TaskspopupviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskspopupviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskspopupviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
