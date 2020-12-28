import { TestBed } from '@angular/core/testing';

import { AdminProductFreeTravelService } from './admin-product-free-travel.service';

describe('AdminProductFreeTravelService', () => {
  let service: AdminProductFreeTravelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminProductFreeTravelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
