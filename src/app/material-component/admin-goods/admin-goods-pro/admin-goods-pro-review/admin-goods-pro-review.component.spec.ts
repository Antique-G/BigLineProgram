import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGoodsProReviewComponent } from './admin-goods-pro-review.component';

describe('AdminGoodsProReviewComponent', () => {
  let component: AdminGoodsProReviewComponent;
  let fixture: ComponentFixture<AdminGoodsProReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGoodsProReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGoodsProReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
