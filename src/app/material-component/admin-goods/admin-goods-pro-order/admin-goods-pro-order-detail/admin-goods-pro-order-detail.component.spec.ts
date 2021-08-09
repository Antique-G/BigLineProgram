import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGoodsProOrderDetailComponent } from './admin-goods-pro-order-detail.component';

describe('AdminGoodsProOrderDetailComponent', () => {
  let component: AdminGoodsProOrderDetailComponent;
  let fixture: ComponentFixture<AdminGoodsProOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGoodsProOrderDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGoodsProOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
