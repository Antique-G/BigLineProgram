import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWechatPageblockUploadComponent } from './admin-wechat-pageblock-upload.component';

describe('AdminWechatPageblockUploadComponent', () => {
  let component: AdminWechatPageblockUploadComponent;
  let fixture: ComponentFixture<AdminWechatPageblockUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWechatPageblockUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWechatPageblockUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
