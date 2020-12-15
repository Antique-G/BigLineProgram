import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTermsManageReviewComponent } from './admin-terms-manage-review.component';

describe('AdminTermsManageReviewComponent', () => {
  let component: AdminTermsManageReviewComponent;
  let fixture: ComponentFixture<AdminTermsManageReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTermsManageReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTermsManageReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
