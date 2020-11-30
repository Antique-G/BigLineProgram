import { TestBed } from '@angular/core/testing';

import { AdminRegionService } from './admin-region.service';

describe('AdminRegionService', () => {
  let service: AdminRegionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminRegionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
