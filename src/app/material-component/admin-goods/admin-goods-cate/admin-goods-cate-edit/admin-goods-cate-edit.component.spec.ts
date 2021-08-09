import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGoodsCateEditComponent } from './admin-goods-cate-edit.component';

describe('AdminGoodsCateEditComponent', () => {
  let component: AdminGoodsCateEditComponent;
  let fixture: ComponentFixture<AdminGoodsCateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGoodsCateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGoodsCateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
