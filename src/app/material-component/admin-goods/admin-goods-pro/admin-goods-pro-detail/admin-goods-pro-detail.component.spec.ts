import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGoodsProDetailComponent } from './admin-goods-pro-detail.component';

describe('AdminGoodsProDetailComponent', () => {
  let component: AdminGoodsProDetailComponent;
  let fixture: ComponentFixture<AdminGoodsProDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGoodsProDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGoodsProDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
