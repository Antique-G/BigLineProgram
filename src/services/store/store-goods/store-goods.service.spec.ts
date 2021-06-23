import { TestBed } from '@angular/core/testing';

import { StoreGoodsService } from './store-goods.service';

describe('StoreGoodsService', () => {
  let service: StoreGoodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreGoodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
