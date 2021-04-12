import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInsuranceHistoryComponent } from './admin-insurance-history.component';

describe('AdminInsuranceHistoryComponent', () => {
  let component: AdminInsuranceHistoryComponent;
  let fixture: ComponentFixture<AdminInsuranceHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminInsuranceHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInsuranceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
