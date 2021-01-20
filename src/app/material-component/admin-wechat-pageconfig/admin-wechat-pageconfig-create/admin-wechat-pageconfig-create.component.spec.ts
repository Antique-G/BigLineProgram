import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWechatPageconfigCreateComponent } from './admin-wechat-pageconfig-create.component';

describe('AdminWechatPageconfigCreateComponent', () => {
  let component: AdminWechatPageconfigCreateComponent;
  let fixture: ComponentFixture<AdminWechatPageconfigCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWechatPageconfigCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWechatPageconfigCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
