import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGoodsProAddOrderComponent } from './admin-goods-pro-add-order.component';

describe('AdminGoodsProAddOrderComponent', () => {
  let component: AdminGoodsProAddOrderComponent;
  let fixture: ComponentFixture<AdminGoodsProAddOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGoodsProAddOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGoodsProAddOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
