import { TestBed } from '@angular/core/testing';

import { AdminInsuranceService } from './admin-insurance.service';

describe('AdminInsuranceService', () => {
  let service: AdminInsuranceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminInsuranceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
