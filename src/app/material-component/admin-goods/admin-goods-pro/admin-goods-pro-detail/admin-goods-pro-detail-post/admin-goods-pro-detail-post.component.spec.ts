import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGoodsProDetailPostComponent } from './admin-goods-pro-detail-post.component';

describe('AdminGoodsProDetailPostComponent', () => {
  let component: AdminGoodsProDetailPostComponent;
  let fixture: ComponentFixture<AdminGoodsProDetailPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGoodsProDetailPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGoodsProDetailPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
