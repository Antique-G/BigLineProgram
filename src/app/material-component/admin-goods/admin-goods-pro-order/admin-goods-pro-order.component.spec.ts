import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGoodsProOrderComponent } from './admin-goods-pro-order.component';

describe('AdminGoodsProOrderComponent', () => {
  let component: AdminGoodsProOrderComponent;
  let fixture: ComponentFixture<AdminGoodsProOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGoodsProOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGoodsProOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
