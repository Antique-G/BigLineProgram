import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFinancePreFreeOrderComponent } from './admin-finance-pre-free-order.component';

describe('AdminFinancePreFreeOrderComponent', () => {
  let component: AdminFinancePreFreeOrderComponent;
  let fixture: ComponentFixture<AdminFinancePreFreeOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFinancePreFreeOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFinancePreFreeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
