import { TestBed } from '@angular/core/testing';

import { AdminStoreAccountService } from './admin-store-account.service';

describe('AdminStoreAccountService', () => {
  let service: AdminStoreAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminStoreAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
