import { TestBed } from '@angular/core/testing';

import { StoreForgetPasswordService } from './store-forget-password.service';

describe('StoreForgetPasswordService', () => {
  let service: StoreForgetPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreForgetPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
