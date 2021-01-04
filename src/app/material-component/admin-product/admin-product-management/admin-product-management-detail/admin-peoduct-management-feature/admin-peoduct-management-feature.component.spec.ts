import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPeoductManagementFeatureComponent } from './admin-peoduct-management-feature.component';

describe('AdminPeoductManagementFeatureComponent', () => {
  let component: AdminPeoductManagementFeatureComponent;
  let fixture: ComponentFixture<AdminPeoductManagementFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPeoductManagementFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPeoductManagementFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
