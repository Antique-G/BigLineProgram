import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSetNewPasswordComponent } from './admin-set-new-password.component';

describe('AdminSetNewPasswordComponent', () => {
  let component: AdminSetNewPasswordComponent;
  let fixture: ComponentFixture<AdminSetNewPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSetNewPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSetNewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
