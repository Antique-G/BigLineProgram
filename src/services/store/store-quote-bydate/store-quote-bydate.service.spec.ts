import { TestBed } from '@angular/core/testing';

import { StoreQuoteBydateService } from './store-quote-bydate.service';

describe('StoreQuoteBydateService', () => {
  let service: StoreQuoteBydateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreQuoteBydateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
