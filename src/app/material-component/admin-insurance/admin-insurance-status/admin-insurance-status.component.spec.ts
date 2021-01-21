import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInsuranceStatusComponent } from './admin-insurance-status.component';

describe('AdminInsuranceStatusComponent', () => {
  let component: AdminInsuranceStatusComponent;
  let fixture: ComponentFixture<AdminInsuranceStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminInsuranceStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInsuranceStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
