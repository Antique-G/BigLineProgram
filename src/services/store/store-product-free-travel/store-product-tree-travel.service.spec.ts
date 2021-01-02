import { TestBed } from '@angular/core/testing';

import { StoreProductTreeTravelService } from './store-product-tree-travel.service';

describe('StoreProductTreeTravelService', () => {
  let service: StoreProductTreeTravelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreProductTreeTravelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
