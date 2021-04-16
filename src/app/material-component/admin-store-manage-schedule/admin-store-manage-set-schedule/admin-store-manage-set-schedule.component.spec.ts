import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStoreManageSetScheduleComponent } from './admin-store-manage-set-schedule.component';

describe('AdminStoreManageSetScheduleComponent', () => {
  let component: AdminStoreManageSetScheduleComponent;
  let fixture: ComponentFixture<AdminStoreManageSetScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStoreManageSetScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStoreManageSetScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
