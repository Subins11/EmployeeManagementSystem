import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveApplicationPageComponent } from './leave-application-page.component';

describe('LeaveApplicationPageComponent', () => {
  let component: LeaveApplicationPageComponent;
  let fixture: ComponentFixture<LeaveApplicationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveApplicationPageComponent]
    });
    fixture = TestBed.createComponent(LeaveApplicationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
