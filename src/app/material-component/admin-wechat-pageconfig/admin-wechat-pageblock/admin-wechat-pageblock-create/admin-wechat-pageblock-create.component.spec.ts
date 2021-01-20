import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWechatPageblockCreateComponent } from './admin-wechat-pageblock-create.component';

describe('AdminWechatPageblockCreateComponent', () => {
  let component: AdminWechatPageblockCreateComponent;
  let fixture: ComponentFixture<AdminWechatPageblockCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWechatPageblockCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWechatPageblockCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
