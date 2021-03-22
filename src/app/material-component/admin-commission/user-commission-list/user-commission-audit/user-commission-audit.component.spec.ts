import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCommissionAuditComponent } from './user-commission-audit.component';

describe('UserCommissionAuditComponent', () => {
  let component: UserCommissionAuditComponent;
  let fixture: ComponentFixture<UserCommissionAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCommissionAuditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCommissionAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
