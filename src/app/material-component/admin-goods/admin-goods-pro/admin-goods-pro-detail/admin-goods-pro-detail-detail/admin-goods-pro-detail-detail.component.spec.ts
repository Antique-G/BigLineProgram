import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGoodsProDetailDetailComponent } from './admin-goods-pro-detail-detail.component';

describe('AdminGoodsProDetailDetailComponent', () => {
  let component: AdminGoodsProDetailDetailComponent;
  let fixture: ComponentFixture<AdminGoodsProDetailDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGoodsProDetailDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGoodsProDetailDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
