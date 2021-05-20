import { TestBed } from '@angular/core/testing';

import { StoreCostService } from './store-cost.service';

describe('StoreCostService', () => {
  let service: StoreCostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreCostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
