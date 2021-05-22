import { TestBed } from '@angular/core/testing';

import { AdminSaleService } from './admin-sale.service';

describe('AdminSaleService', () => {
  let service: AdminSaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminSaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
