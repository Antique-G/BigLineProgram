import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGoodsProOrderDetailModifyComponent } from './admin-goods-pro-order-detail-modify.component';

describe('AdminGoodsProOrderDetailModifyComponent', () => {
  let component: AdminGoodsProOrderDetailModifyComponent;
  let fixture: ComponentFixture<AdminGoodsProOrderDetailModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGoodsProOrderDetailModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGoodsProOrderDetailModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
