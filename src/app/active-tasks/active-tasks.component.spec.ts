import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveTasksComponent } from './active-tasks.component';

describe('ActiveTasksComponent', () => {
  let component: ActiveTasksComponent;
  let fixture: ComponentFixture<ActiveTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveTasksComponent],
    });
    fixture = TestBed.createComponent(ActiveTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
