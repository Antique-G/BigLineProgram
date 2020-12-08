import { TestBed } from '@angular/core/testing';

import { AdminProductManagementService } from './admin-product-management.service';

describe('AdminProductManagementService', () => {
  let service: AdminProductManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminProductManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
