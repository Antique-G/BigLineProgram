import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGoodsProAddOrderDetailComponent } from './admin-goods-pro-add-order-detail.component';

describe('AdminGoodsProAddOrderDetailComponent', () => {
  let component: AdminGoodsProAddOrderDetailComponent;
  let fixture: ComponentFixture<AdminGoodsProAddOrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGoodsProAddOrderDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGoodsProAddOrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
