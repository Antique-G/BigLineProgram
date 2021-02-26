import { TestBed } from '@angular/core/testing';

import { StoreContractService } from './store-contract.service';

describe('StoreContractService', () => {
  let service: StoreContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
