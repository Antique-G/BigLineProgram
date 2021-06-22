import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMiniWithdrawalReviewComponent } from './admin-mini-withdrawal-review.component';

describe('AdminMiniWithdrawalReviewComponent', () => {
  let component: AdminMiniWithdrawalReviewComponent;
  let fixture: ComponentFixture<AdminMiniWithdrawalReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMiniWithdrawalReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMiniWithdrawalReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
