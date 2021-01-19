import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWechatPageblockComponent } from './admin-wechat-pageblock.component';

describe('AdminWechatPageblockComponent', () => {
  let component: AdminWechatPageblockComponent;
  let fixture: ComponentFixture<AdminWechatPageblockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWechatPageblockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWechatPageblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
