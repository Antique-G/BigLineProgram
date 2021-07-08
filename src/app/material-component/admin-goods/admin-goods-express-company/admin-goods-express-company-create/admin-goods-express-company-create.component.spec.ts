import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGoodsExpressCompanyCreateComponent } from './admin-goods-express-company-create.component';

describe('AdminGoodsExpressCompanyCreateComponent', () => {
  let component: AdminGoodsExpressCompanyCreateComponent;
  let fixture: ComponentFixture<AdminGoodsExpressCompanyCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGoodsExpressCompanyCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGoodsExpressCompanyCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
