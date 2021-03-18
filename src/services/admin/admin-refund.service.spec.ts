import { TestBed } from '@angular/core/testing';

import { AdminRefundService } from './admin-refund.service';

describe('AdminRefundService', () => {
  let service: AdminRefundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminRefundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
