import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGoodsProDetailInfoComponent } from './admin-goods-pro-detail-info.component';

describe('AdminGoodsProDetailInfoComponent', () => {
  let component: AdminGoodsProDetailInfoComponent;
  let fixture: ComponentFixture<AdminGoodsProDetailInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGoodsProDetailInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGoodsProDetailInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
