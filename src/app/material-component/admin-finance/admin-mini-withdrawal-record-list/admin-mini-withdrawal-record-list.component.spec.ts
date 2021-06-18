import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMiniWithdrawalRecordListComponent } from './admin-mini-withdrawal-record-list.component';

describe('AdminMiniWithdrawalRecordListComponent', () => {
  let component: AdminMiniWithdrawalRecordListComponent;
  let fixture: ComponentFixture<AdminMiniWithdrawalRecordListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMiniWithdrawalRecordListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMiniWithdrawalRecordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
