import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGoodsProIshotComponent } from './admin-goods-pro-ishot.component';

describe('AdminGoodsProIshotComponent', () => {
  let component: AdminGoodsProIshotComponent;
  let fixture: ComponentFixture<AdminGoodsProIshotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGoodsProIshotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGoodsProIshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
