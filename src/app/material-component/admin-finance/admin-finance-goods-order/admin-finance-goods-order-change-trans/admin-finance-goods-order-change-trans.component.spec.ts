import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFinanceGoodsOrderChangeTransComponent } from './admin-finance-goods-order-change-trans.component';

describe('AdminFinanceGoodsOrderChangeTransComponent', () => {
  let component: AdminFinanceGoodsOrderChangeTransComponent;
  let fixture: ComponentFixture<AdminFinanceGoodsOrderChangeTransComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFinanceGoodsOrderChangeTransComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFinanceGoodsOrderChangeTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
