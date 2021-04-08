import { TestBed } from '@angular/core/testing';

import { StoreApplyService } from './store-apply.service';

describe('StoreApplyService', () => {
  let service: StoreApplyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreApplyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
