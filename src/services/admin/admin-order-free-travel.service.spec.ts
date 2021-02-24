import { TestBed } from '@angular/core/testing';

import { AdminOrderFreeTravelService } from './admin-order-free-travel.service';

describe('AdminOrderFreeTravelService', () => {
  let service: AdminOrderFreeTravelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminOrderFreeTravelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
