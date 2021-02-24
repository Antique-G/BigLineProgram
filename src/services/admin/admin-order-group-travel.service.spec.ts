import { TestBed } from '@angular/core/testing';

import { AdminOrderGroupTravelService } from './admin-order-group-travel.service';

describe('AdminOrderGroupTravelService', () => {
  let service: AdminOrderGroupTravelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminOrderGroupTravelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
