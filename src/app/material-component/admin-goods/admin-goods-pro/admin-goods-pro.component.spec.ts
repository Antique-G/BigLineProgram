import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGoodsProComponent } from './admin-goods-pro.component';

describe('AdminGoodsProComponent', () => {
  let component: AdminGoodsProComponent;
  let fixture: ComponentFixture<AdminGoodsProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGoodsProComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGoodsProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
