import { TestBed } from '@angular/core/testing';

import { StoreOrderFreeTravelService } from './store-order-free-travel.service';

describe('StoreOrderFreeTravelService', () => {
  let service: StoreOrderFreeTravelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreOrderFreeTravelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
