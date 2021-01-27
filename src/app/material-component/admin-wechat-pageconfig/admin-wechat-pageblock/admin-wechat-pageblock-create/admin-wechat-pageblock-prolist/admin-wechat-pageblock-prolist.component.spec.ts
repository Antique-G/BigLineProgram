import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWechatPageblockProlistComponent } from './admin-wechat-pageblock-prolist.component';

describe('AdminWechatPageblockProlistComponent', () => {
  let component: AdminWechatPageblockProlistComponent;
  let fixture: ComponentFixture<AdminWechatPageblockProlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWechatPageblockProlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWechatPageblockProlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
