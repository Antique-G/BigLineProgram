import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWechatPageconfigComponent } from './admin-wechat-pageconfig.component';

describe('AdminWechatPageconfigComponent', () => {
  let component: AdminWechatPageconfigComponent;
  let fixture: ComponentFixture<AdminWechatPageconfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWechatPageconfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWechatPageconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
