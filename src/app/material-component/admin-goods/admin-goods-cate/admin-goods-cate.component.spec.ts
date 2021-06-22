import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGoodsCateComponent } from './admin-goods-cate.component';

describe('AdminGoodsCateComponent', () => {
  let component: AdminGoodsCateComponent;
  let fixture: ComponentFixture<AdminGoodsCateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGoodsCateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGoodsCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
