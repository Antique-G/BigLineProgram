import { TestBed } from '@angular/core/testing';

import { StorePreSaleService } from './store-pre-sale.service';

describe('StorePreSaleService', () => {
  let service: StorePreSaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorePreSaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
