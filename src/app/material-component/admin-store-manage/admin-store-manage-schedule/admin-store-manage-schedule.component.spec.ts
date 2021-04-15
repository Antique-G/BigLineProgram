import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStoreManageScheduleComponent } from './admin-store-manage-schedule.component';

describe('AdminStoreManageScheduleComponent', () => {
  let component: AdminStoreManageScheduleComponent;
  let fixture: ComponentFixture<AdminStoreManageScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStoreManageScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStoreManageScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
