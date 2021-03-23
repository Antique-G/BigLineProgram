import { TestBed } from '@angular/core/testing';

import { AdminUserMoneyLogService } from './admin-user-money-log.service';

describe('AdminUserMoneyLogService', () => {
  let service: AdminUserMoneyLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminUserMoneyLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
