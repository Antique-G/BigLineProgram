import { TestBed } from '@angular/core/testing';

import { AdminStoreManageService } from './admin-store-manage.service';

describe('AdminStoreManageService', () => {
  let service: AdminStoreManageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminStoreManageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
