import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInsuranceCreateComponent } from './admin-insurance-create.component';

describe('AdminInsuranceCreateComponent', () => {
  let component: AdminInsuranceCreateComponent;
  let fixture: ComponentFixture<AdminInsuranceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminInsuranceCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInsuranceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
