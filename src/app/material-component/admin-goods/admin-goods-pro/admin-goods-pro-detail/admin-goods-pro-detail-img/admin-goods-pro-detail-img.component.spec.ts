import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGoodsProDetailImgComponent } from './admin-goods-pro-detail-img.component';

describe('AdminGoodsProDetailImgComponent', () => {
  let component: AdminGoodsProDetailImgComponent;
  let fixture: ComponentFixture<AdminGoodsProDetailImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGoodsProDetailImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGoodsProDetailImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
