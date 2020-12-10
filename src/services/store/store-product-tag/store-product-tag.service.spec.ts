import { TestBed } from '@angular/core/testing';

import { StoreProductTagService } from './store-product-tag.service';

describe('StoreProductTagService', () => {
  let service: StoreProductTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreProductTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
