import { TestBed } from '@angular/core/testing';

import { StoreTermsManagementService } from './store-terms-management.service';

describe('StoreTermsManagementService', () => {
  let service: StoreTermsManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreTermsManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
