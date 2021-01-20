import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWechatPageconfigDetailComponent } from './admin-wechat-pageconfig-detail.component';

describe('AdminWechatPageconfigDetailComponent', () => {
  let component: AdminWechatPageconfigDetailComponent;
  let fixture: ComponentFixture<AdminWechatPageconfigDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWechatPageconfigDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWechatPageconfigDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
