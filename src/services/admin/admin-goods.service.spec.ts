import { TestBed } from '@angular/core/testing';

import { AdminGoodsService } from './admin-goods.service';

describe('AdminGoodsService', () => {
  let service: AdminGoodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminGoodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
