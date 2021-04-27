import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStoreManageEmployeeComponent } from './admin-store-manage-employee.component';

describe('AdminStoreManageEmployeeComponent', () => {
  let component: AdminStoreManageEmployeeComponent;
  let fixture: ComponentFixture<AdminStoreManageEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStoreManageEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStoreManageEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
