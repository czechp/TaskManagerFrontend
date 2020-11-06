import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailsDeleteUserDialogComponent } from './task-details-delete-user-dialog.component';

describe('TaskDetailsDeleteUserDialogComponent', () => {
  let component: TaskDetailsDeleteUserDialogComponent;
  let fixture: ComponentFixture<TaskDetailsDeleteUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskDetailsDeleteUserDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailsDeleteUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
