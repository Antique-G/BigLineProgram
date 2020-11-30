import { TestBed } from '@angular/core/testing';

import { AdminStoreBankAccountService } from './admin-store-bank-account.service';

describe('AdminStoreBankAccountService', () => {
  let service: AdminStoreBankAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminStoreBankAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
