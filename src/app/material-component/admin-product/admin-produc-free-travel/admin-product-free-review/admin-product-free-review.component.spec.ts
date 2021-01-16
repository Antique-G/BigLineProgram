import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductFreeReviewComponent } from './admin-product-free-review.component';

describe('AdminProductFreeReviewComponent', () => {
  let component: AdminProductFreeReviewComponent;
  let fixture: ComponentFixture<AdminProductFreeReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProductFreeReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProductFreeReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
