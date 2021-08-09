import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGoodsCateAddComponent } from './admin-goods-cate-add.component';

describe('AdminGoodsCateAddComponent', () => {
  let component: AdminGoodsCateAddComponent;
  let fixture: ComponentFixture<AdminGoodsCateAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGoodsCateAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGoodsCateAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
