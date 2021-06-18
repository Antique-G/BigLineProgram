import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMiniWithdrawalOperateComponent } from './admin-mini-withdrawal-operate.component';

describe('AdminMiniWithdrawalOperateComponent', () => {
  let component: AdminMiniWithdrawalOperateComponent;
  let fixture: ComponentFixture<AdminMiniWithdrawalOperateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMiniWithdrawalOperateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMiniWithdrawalOperateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
