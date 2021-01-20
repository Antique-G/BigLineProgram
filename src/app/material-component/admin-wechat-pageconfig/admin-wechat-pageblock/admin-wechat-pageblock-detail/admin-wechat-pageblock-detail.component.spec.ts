import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWechatPageblockDetailComponent } from './admin-wechat-pageblock-detail.component';

describe('AdminWechatPageblockDetailComponent', () => {
  let component: AdminWechatPageblockDetailComponent;
  let fixture: ComponentFixture<AdminWechatPageblockDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWechatPageblockDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWechatPageblockDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
