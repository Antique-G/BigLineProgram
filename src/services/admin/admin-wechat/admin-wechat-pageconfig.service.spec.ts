import { TestBed } from '@angular/core/testing';

import { AdminWechatPageconfigService } from './admin-wechat-pageconfig.service';

describe('AdminWechatPageconfigService', () => {
  let service: AdminWechatPageconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminWechatPageconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
