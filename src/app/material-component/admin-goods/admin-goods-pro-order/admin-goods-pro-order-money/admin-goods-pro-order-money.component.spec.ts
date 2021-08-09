import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGoodsProOrderMoneyComponent } from './admin-goods-pro-order-money.component';

describe('AdminGoodsProOrderMoneyComponent', () => {
  let component: AdminGoodsProOrderMoneyComponent;
  let fixture: ComponentFixture<AdminGoodsProOrderMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGoodsProOrderMoneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGoodsProOrderMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
