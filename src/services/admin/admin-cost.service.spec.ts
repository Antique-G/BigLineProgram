import { TestBed } from '@angular/core/testing';

import { AdminCostService } from './admin-cost.service';

describe('AdminCostService', () => {
  let service: AdminCostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
