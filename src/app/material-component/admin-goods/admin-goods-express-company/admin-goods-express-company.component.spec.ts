import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGoodsExpressCompanyComponent } from './admin-goods-express-company.component';

describe('AdminGoodsExpressCompanyComponent', () => {
  let component: AdminGoodsExpressCompanyComponent;
  let fixture: ComponentFixture<AdminGoodsExpressCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGoodsExpressCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGoodsExpressCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
