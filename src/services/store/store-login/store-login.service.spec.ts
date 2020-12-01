import { TestBed } from '@angular/core/testing';

import { StoreLoginService } from './store-login.service';

describe('StoreLoginService', () => {
  let service: StoreLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
