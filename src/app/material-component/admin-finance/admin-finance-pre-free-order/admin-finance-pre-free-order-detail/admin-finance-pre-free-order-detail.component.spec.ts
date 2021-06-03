import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFinancePreFreeOrderDetailComponent } from './admin-finance-pre-free-order-detail.component';

describe('AdminFinancePreFreeOrderDetailComponent', () => {
  let component: AdminFinancePreFreeOrderDetailComponent;
  let fixture: ComponentFixture<AdminFinancePreFreeOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFinancePreFreeOrderDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFinancePreFreeOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
