import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreTermManagementReviewComponent } from './store-term-management-review.component';

describe('StoreTermManagementReviewComponent', () => {
  let component: StoreTermManagementReviewComponent;
  let fixture: ComponentFixture<StoreTermManagementReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreTermManagementReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreTermManagementReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
