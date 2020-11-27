import { TestBed } from '@angular/core/testing';

import { AdminStoreService } from './admin-store.service';

describe('AdminStoreService', () => {
  let service: AdminStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
