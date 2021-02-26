import { TestBed } from '@angular/core/testing';

import { AdminContractService } from './admin-contract.service';

describe('AdminContractService', () => {
  let service: AdminContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
