import { TestBed } from '@angular/core/testing';

import { StoreRefundService } from './store-refund.service';

describe('StoreRefundService', () => {
  let service: StoreRefundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreRefundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
