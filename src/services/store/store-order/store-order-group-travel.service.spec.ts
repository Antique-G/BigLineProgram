import { TestBed } from '@angular/core/testing';

import { StoreOrderGroupTravelService } from './store-order-group-travel.service';

describe('StoreOrderGroupTravelService', () => {
  let service: StoreOrderGroupTravelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreOrderGroupTravelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
