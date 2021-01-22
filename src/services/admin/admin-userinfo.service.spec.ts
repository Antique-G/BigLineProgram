import { TestBed } from '@angular/core/testing';

import { AdminUserinfoService } from './admin-userinfo.service';

describe('AdminUserinfoService', () => {
  let service: AdminUserinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminUserinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
