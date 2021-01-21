import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInsuranceDetailComponent } from './admin-insurance-detail.component';

describe('AdminInsuranceDetailComponent', () => {
  let component: AdminInsuranceDetailComponent;
  let fixture: ComponentFixture<AdminInsuranceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminInsuranceDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInsuranceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
